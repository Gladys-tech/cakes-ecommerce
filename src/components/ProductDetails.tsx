"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useCart } from '@/context/CartContext';
import { Container, Typography, Grid, Button, Card, CardMedia, Box, IconButton } from '@mui/material';
import { Add, Remove, ExpandMore } from '@mui/icons-material';
import CartPopup from '@/components/CartPopup';
import { useRouter } from 'next/router';

interface Product {
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
    ingredients: string;
}

const ProductDetailsPage: React.FC = () => {
    const { cartItems, addToCart, incrementQuantity, decrementQuantity } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showIngredients, setShowIngredients] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
   
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

    return (
        <>
            <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
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
            <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
};

export default ProductDetailsPage;
