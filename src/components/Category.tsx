"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent, Box } from '@mui/material';
import Link from 'next/link';

interface Product {
    category: string;
    primaryImageUrl: string;
    createdAt: string;
}

interface Category {
    category: string;
    image: string;
    link: string;
}

const Category: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/products')
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK" && Array.isArray(data.products)) {
                    const categoryMap = new Map<string, Product>();

                    data.products.forEach((product: Product) => {
                        const { category, primaryImageUrl, createdAt } = product;
                        if (category && primaryImageUrl) {
                            if (!categoryMap.has(category) || new Date(createdAt) > new Date(categoryMap.get(category)!.createdAt)) {
                                categoryMap.set(category, product);
                            }
                        }
                    });

                    const categoryArray = Array.from(categoryMap.values()).map(product => ({
                        category: product.category,
                        image: product.primaryImageUrl,
                        link: `/categoryProducts?category=${encodeURIComponent(product.category)}`
                    }));

                    setCategories(categoryArray);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Our Products
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Explore our wide range of products crafted with love and care. Whether you're looking for a special cake for an occasion or some delightful snacks, we have something for everyone.
            </Typography>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Link href="/product" passHref>
                    <Button variant="contained" className='global-button'>
                        View More
                    </Button>
                </Link>
            </Box>
            <Grid container spacing={4}>
                {categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                        <Link href={category.link} passHref style={{ textDecoration: 'none' }}>
                            <Card sx={{ cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={category.image}
                                    alt={category.category}
                                />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6">
                                        {category.category}
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

export default Category;

