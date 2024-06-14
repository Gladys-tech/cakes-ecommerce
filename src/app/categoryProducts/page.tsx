"use client"; 
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent, Box } from '@mui/material';
import Link from 'next/link';

interface Product {
    category: string | string[];
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
}

const CategoryProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string>("");

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

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            {/* Category title */}
            <Typography variant="h4" gutterBottom>
                {categoryTitle}
            </Typography>
            {/* Back to Categories button */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Link href="/" passHref>
                    <Button variant="contained" className='global-button'>
                        Back to Categories
                    </Button>
                </Link>
            </Box>
            {/* Grid container */}
            <Grid container spacing={2}>
                {/* Map over the products array */}
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                        {/* Product card wrapped with Link to the product details page */}
                        <Link href={`/product-details/${product.id}`} passHref style={{ textDecoration: 'none' }}>
                            <Card sx={{ cursor: 'pointer' }}
                             onClick={() => handleClickProduct(product.id)} >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.primaryImageUrl}
                                    alt={product.name}
                                />
                                <CardContent>
                                    {/* Product name */}
                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    {/* Product price */}
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        ${product.price}
                                    </Typography>
                                    {/* Truncated product description */}
                                    <Typography variant="body2" noWrap>
                                        {product.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CategoryProducts;

