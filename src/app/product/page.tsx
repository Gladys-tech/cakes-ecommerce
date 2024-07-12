"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { Favorite, ShoppingCart } from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useSearch } from '@/context/SearchContext';
import { usePathname } from 'next/navigation';

interface Product {
    image: any;
    category: string;
    id: string;
    name: string;
    primaryImageUrl: string;
    price: number;
    description: string;
}

const ProductsPage: React.FC = () => {
    const pathname = usePathname();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();
    const { searchQuery } = useSearch(); // Use search context

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("Filtered products:", filteredProducts);
    }, [searchQuery, products]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            if (data.status === 'OK' && Array.isArray(data.products)) {
                // Filter out products without a category
                const validProducts = data.products.filter((product: Product) => product.category);
                setProducts(validProducts);

                // Get unique categories with at least one product
                const uniqueCategories = Array.from(new Set(validProducts.map((product: Product) => product.category))) as string[];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
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

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="body2" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
                Current path:<span style={{ color: '#8B4513', fontSize: '1.5rem' }}>Home {pathname}</span>
            </Typography>
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
                        {/* {products */}
                        {filteredProducts.length === 0 && (
                            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
                                No products match your search.
                            </Typography>
                        )}
                        {filteredProducts
                            .filter(product => product.category === category) // Filter products by category
                            .map((product, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                    {/* Product card wrapped with Link to the product details page */}
                                    <Card sx={{ cursor: 'pointer', position: 'relative', height: '100%' }}>
                                        <Link href={`/product-details/${product.id}`} passHref style={{ textDecoration: 'none' }}>

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
                                            {/* Favorite and Shopping Cart buttons */}
                                            <IconButton
                                                sx={{ position: 'absolute', top: 8, right: 8, color: "#8B4513" }}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                <ShoppingCart />
                                            </IconButton>
                                            <IconButton
                                                sx={{ position: 'absolute', top: 40, right: 8, color: "#f50057" }}
                                                onClick={() => handleAddToWishlist(product)}
                                            >
                                                <Favorite />
                                            </IconButton>

                                        </Link>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            ))}
        </Container>
    );
};

export default ProductsPage;
