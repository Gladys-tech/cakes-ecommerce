"use client";
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const teamMembers = [
    {
        name: 'John Doe',
        role: 'Founder & CEO',
        image: '/images/team1.jpg',
        description: 'John is the visionary behind our bakery. With years of experience in the culinary arts, he leads our team with passion and dedication.'
    },
    {
        name: 'Jane Smith',
        role: 'Head Baker',
        image: '/images/team2.jpg',
        description: 'Jane is our head baker, known for her creativity and precision. She ensures that every product meets our high standards.'
    },
    {
        name: 'Bob Johnson',
        role: 'Customer Relations',
        image: '/images/team3.jpg',
        description: 'Bob is the friendly face you see at our counter. He handles customer relations and ensures everyone has a delightful experience.'
    },
];

const AboutUsPage: React.FC = () => {
    const pathname = usePathname();
    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                About Us
            </Typography>
            <Typography variant="body2" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
                Current path:<span style={{ color: '#8B4513', fontSize: '1.5rem' }}>Home {pathname}</span>
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Welcome to gCakes! We are passionate about baking the most delicious and beautiful cakes for every occasion.
                Our mission is to bring joy and sweetness to your celebrations with our handcrafted cakes and pastries.
            </Typography>

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Our Story
                </Typography>
                <Typography variant="body1" paragraph>
                    gCakes was founded in 2010 with a simple vision: to create cakes that not only taste great but also look stunning.
                    Over the years, we have grown into a beloved bakery known for our attention to detail and dedication to quality.
                </Typography>
                <Typography variant="body1" paragraph>
                    Our team of skilled bakers and decorators work tirelessly to bring your cake dreams to life. Whether it's a wedding, birthday, or any special event,
                    we are here to make it unforgettable.
                </Typography>
            </Box>

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Meet Our Team
                </Typography>
                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={member.image}
                                    alt={member.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {member.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Have any questions or want to place an order? Get in touch with us!
                </Typography>
                <Link href="/contact" passHref>
                    <Button
                        variant="contained"
                        className='global-button'
                    >
                        Contact Us
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default AboutUsPage;
