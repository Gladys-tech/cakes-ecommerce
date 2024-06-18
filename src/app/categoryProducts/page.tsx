
"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface Product {
    category: string | string[];
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
    image: string;
}

const CategoryProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string>("");
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const category = query.get('category');

        if (category) {
            fetch('http://localhost:8000/products')
                .then(response => response.json())
                .then(data => {
                    if (data.status === "OK" && Array.isArray(data.products)) {
                        const filteredProducts = data.products.filter((product: Product) => product.category === category);
                        setProducts(filteredProducts);
                        setCategoryTitle(category);
                    }
                })
                .catch(error => console.error('Error fetching products:', error));
        }
    }, []);

    const handleClickProduct = (productId: string) => {
        console.log(`Clicked product id: ${productId}`);
    };

    const handleAddToCart = (product: Product) => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            primaryImageUrl: product.primaryImageUrl,
            quantity: 1,
            image: product.image
        };
        addToCart(cartItem);
    };

    const handleAddToWishlist = (product: Product) => {
        const wishlistItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            primaryImageUrl: product.primaryImageUrl,
            image: product.image
        };
        addToWishlist(wishlistItem);
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
                {categoryTitle}
            </Typography>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Link href="/" passHref>
                    <Button variant="contained" className='global-button'>
                        Back to Categories
                    </Button>
                </Link>
            </Box>
            <Grid container spacing={2}>
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                        <Card sx={{ cursor: 'pointer', position: 'relative' }}>
                            <Link href={`/product-details/${product.id}`} passHref style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.primaryImageUrl}
                                    alt={product.name}
                                    onClick={() => handleClickProduct(product.id)}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        ${product.price}
                                    </Typography>
                                    <Typography variant="body2" noWrap>
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Link>
                            <IconButton
                                sx={{ position: 'absolute', top: 8, right: 8, color: "#8B4513", }}

                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart />
                            </IconButton>
                            <IconButton 
                                sx={{ position: 'absolute', top: 48, right: 8 }}
                                color="secondary"
                                onClick={() => handleAddToWishlist(product)}
                            >
                                <Favorite />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryProducts;


