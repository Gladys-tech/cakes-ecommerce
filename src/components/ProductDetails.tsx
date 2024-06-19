"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Container, Typography, Grid, Button, Card, CardMedia, Box, IconButton } from '@mui/material';
import { Add, Remove, ExpandMore, Close } from '@mui/icons-material';
import CartPopup from '@/components/CartPopup';
import { useRouter } from 'next/router';
import ScrollToTop from './ScrollToTop';

interface Product {
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
    ingredients: string;
    category: string;
    images: string[];
    productstatus: string;
    inventoryQuantity: number;
}

const ProductDetailsPage: React.FC = () => {
    const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showIngredients, setShowIngredients] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // State for related products

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchProduct = async () => {
            if (id && typeof id === 'string') {
                try {
                    const response = await fetch(`http://localhost:8000/products/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product');
                    }
                    const data = await response.json();
                    console.log('product data got', data);
                    if (data.status === "OK" && data.product) {
                        setProduct(data.product);
                        // Fetch related products from the same category
                        const relatedResponse = await fetch(`http://localhost:8000/products?category=${data.product.category}&limit=4`);
                        if (!relatedResponse.ok) {
                            throw new Error('Failed to fetch related products');
                        }
                        const relatedData = await relatedResponse.json();
                        setRelatedProducts(relatedData.products.filter((p: Product) => p.id !== data.product.id && p.category === data.product.category));
                    } else {
                        throw new Error('Product not found');
                    }
                } catch (error) {
                    console.error('Error fetching product details:', error);
                    setProduct(null); // Handle error state
                }
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        // If product is already in cart, update quantity state
        const cartItem = cartItems.find(item => item.id === product?.id);
        if (cartItem) {
            setQuantity(cartItem.quantity);
        } else {
            setQuantity(1);
        }
    }, [cartItems, product]);

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    const isInCart = Boolean(cartItems.find(item => item.id === product.id));

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const handleIncrementQuantity = () => {
        if (isInCart) {
            incrementQuantity(product.id);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrementQuantity = () => {
        if (isInCart) {
            decrementQuantity(product.id);
        } else if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            image: ''
        });
        setCartOpen(true);
    };

    const handleClose = () => {
        router.push(`/categoryProducts?category=${product.category}`);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
                <Box sx={{ position: 'relative' }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 0, right: 0, color: '#8B4513' }}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="400"
                                image={product.primaryImageUrl}
                                alt={product.name}
                            />
                        </Card>

                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            {product.images.map((image, index) => (
                                <Grid item xs={3} key={index}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="100"
                                            image={image}
                                            alt={`${product.name} ${index + 1}`}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Price: ${product.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <IconButton onClick={handleDecrementQuantity}>
                                <Remove />
                            </IconButton>
                            <Typography variant="body1" sx={{ margin: '0 10px' }}>
                                {quantity}
                            </Typography>
                            <IconButton onClick={handleIncrementQuantity}>
                                <Add />
                            </IconButton>
                            <Button
                                variant="contained"
                                className='global-button'
                                onClick={handleAddToCart}
                                sx={{ marginLeft: 'auto' }}
                                disabled={isInCart}
                            >
                                {isInCart ? "Already in Cart" : "Add to Cart"}
                            </Button>
                        </Box>
                        <Typography variant="body1" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ cursor: 'pointer', marginTop: 2, display: 'flex', alignItems: 'center' }}
                            onClick={toggleIngredients}
                        >
                            Ingredients
                            <ExpandMore sx={{ marginLeft: 1 }} />
                        </Typography>
                        {showIngredients && (
                            <Typography variant="body1">
                                {product.ingredients}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Container>

            {/* Display related products */}
            {relatedProducts.length > 0 && (
                <>
                    <Typography variant="h5" sx={{ marginTop: 4 }}>Related Products</Typography>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {relatedProducts.map((relatedProduct: Product) => (
                            <Grid item xs={6} md={3} key={relatedProduct.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={relatedProduct.primaryImageUrl}
                                        alt={relatedProduct.name}
                                    />
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {relatedProduct.name}
                                        </Typography>
                                        <Typography variant="body1">
                                            ${relatedProduct.price}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            className='global-button'
                                            onClick={() => router.push(`/product-details/${relatedProduct.id}`)}
                                            sx={{ marginTop: 2 }}
                                        >
                                            View Details
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

             {/* ScrollToTop component */}
             <ScrollToTop />

            <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default ProductDetailsPage;

