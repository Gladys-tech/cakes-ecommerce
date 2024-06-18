"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Container, Paper, Grid, Card, CardMedia, CardContent } from '@mui/material';

interface Post {
    id: number;
    title: string;
    image: string;
    description: string;
    content: string;
}

const posts: Post[] = [
    { id: 1, title: 'Delicious Chocolate Cake', image: '/chocolate-cake.jpg', description: 'A rich and moist chocolate cake perfect for any occasion.', content: 'This chocolate cake is made with the finest ingredients and topped with a luscious chocolate ganache.' },
    { id: 2, title: 'Classic Vanilla Cupcakes', image: '/vanilla-cupcakes.jpg', description: 'Fluffy vanilla cupcakes topped with creamy frosting.', content: 'These vanilla cupcakes are light, fluffy, and topped with a rich, creamy vanilla frosting.' }
];

const relatedBlogs: Post[] = [
    { id: 3, title: 'Tasty Lemon Tart', image: '/lemon-tart.jpg', description: 'A tangy lemon tart with a buttery crust.', content: 'This lemon tart recipe combines the tartness of lemons with a buttery crust for a delicious dessert.' },
    { id: 4, title: 'Decadent Red Velvet Cake', image: '/red-velvet-cake.jpg', description: 'Rich and velvety red velvet cake with cream cheese frosting.', content: 'Indulge in this classic red velvet cake with its moist texture and creamy frosting.' }
];

const Post: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const post = posts.find((post) => post.id === parseInt(id as string));

    if (!post) {
        return <p>Post not found</p>;
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
                <Paper elevation={2} sx={{ padding: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {post.title}
                    </Typography>
                    <Box mb={2}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />
                    </Box>
                    <Typography variant="body1" component="p" sx={{ marginBottom: 2 }}>
                        {post.content}
                    </Typography>
                    {/* Likes and Comments */}
                    <Box mt={4}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Likes and Comments
                        </Typography>
                    </Box>
                </Paper>

            </Container>
            {/* Related Blogs */}
            <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Related Blogs
                </Typography>
                <Grid container spacing={2}>
                    {relatedBlogs.map((blog) => (
                        <Grid item xs={6} sm={3} key={blog.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    image={blog.image}
                                    alt={blog.title}
                                    style={{ height: 140 }}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" component="h3">
                                        {blog.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Post;
