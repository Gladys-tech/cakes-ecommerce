"use client";
import React from 'react';
import Link from 'next/link';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Box, Container } from '@mui/material';
import { usePathname } from 'next/navigation';

interface Post {
    id: number;
    title: string;
    image: string;
    description: string;
}

const posts: Post[] = [
    { id: 1, title: 'Delicious Chocolate Cake', image: 'images/cake24.png', description: 'A rich and moist chocolate cake perfect for any occasion.' },
    { id: 2, title: 'Classic Vanilla Cupcakes', image: 'images/cake22.png', description: 'Fluffy vanilla cupcakes topped with creamy frosting.' }
];

const Blog: React.FC = () => {
    const pathname = usePathname();
    return (
        <>
            <Box
                bgcolor="#f0f0f0"
            >
                <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Typography variant="h4" gutterBottom align="center">
                        Our Blogs
                    </Typography>
                    <Typography variant="body2" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
                        Current path:<span style={{ color: '#8B4513', fontSize: '1.5rem' }}>Home {pathname}</span>
                    </Typography>
                    <Grid container spacing={3}>
                        {posts.map((post) => (
                            <Grid item key={post.id} xs={12} sm={6} md={4} >
                                <Link href={`/posts/${post.id}`} passHref style={{ textDecoration: 'none' }}>
                                    <Card sx={{ textDecoration: 'none', height: '100%' }}>
                                        <CardActionArea style={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                image={post.image}
                                                alt={post.title}
                                                style={{ height: '200px' }}
                                            />
                                            <CardContent>
                                                <Typography component="h2" variant="h5" sx={{ marginBottom: 1, minHeight: '60px', overflow: 'hidden' }}>
                                                    {post.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ minHeight: '80px', overflow: 'hidden' }}>
                                                    {post.description.length > 50 ? `${post.description.slice(0, 50)}...` : post.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Blog;
