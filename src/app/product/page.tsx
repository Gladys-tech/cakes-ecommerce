"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent, Box } from '@mui/material';
import Link from 'next/link';

interface Product {
    category: string;
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
}

const Product: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            if (data.status === 'OK' && Array.isArray(data.products)) {
                setProducts(data.products);
                const uniqueCategories = Array.from(new Set(data.products.map((product: Product) => product.category))) as string[];
                setCategories(uniqueCategories);
                // Set default selected category (first category in the list)
                setSelectedCategory(uniqueCategories[0]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Organize products by category
    const productsByCategory: { [key: string]: Product[] } = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            {/* Back to Categories button */}
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Link href="/" passHref>
                    <Button variant="contained" className='global-button'>
                        Back to Categories
                    </Button>
                </Link>
            </Box>

            {/* Render categories and their products */}
            {categories.map((category, index) => (
                <div key={index} style={{ marginBottom: '2rem' }}>
                    {/* Category title */}
                    <Typography variant="h4" gutterBottom>
                        {category}
                    </Typography>
                    {/* Grid container for products */}
                    <Grid container spacing={2}>
                        {/* Map over products in the current category */}
                        {productsByCategory[category]?.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                {/* Product card wrapped with Link to the product details page */}
                                <Link href={`/product-details/${product.id}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card sx={{ cursor: 'pointer' }}>
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
                </div>
            ))}
        </Container>
    );
};

export default Product;
