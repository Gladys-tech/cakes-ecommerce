
"use client";
import React from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: 'rgba(139, 69, 19, 0.8)', color: 'white', padding: '20px 0' }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h4" component="div">
                        g<span style={{ color: '#ffcc00' }}>Cakes</span>
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Connect
                            </Typography>
                            <Box display="flex" alignItems="center" mb={1}>
                                <LocationOnIcon />
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    Kibuli Dipo
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <PhoneIcon />
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    +256-757763516
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <EmailIcon />
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    gladyskyambadde0@gmail.com
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <WhatsAppIcon />
                                <Typography variant="body1" sx={{ ml: 1 }}>
                                    +256-757763516
                                </Typography>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                About
                            </Typography>
                            <Typography variant="body1">
                                We make wedding cakes, birthday cakes, introduction cakes, holiday cakes like Easter, Eid,
                                Christmas and snacks like cookies, daddies. Contact for your delivery.
                            </Typography>
                            <Link href="/privacy-policies" sx={{ textDecoration: 'none' }}>
                                <Typography variant="h6" gutterBottom sx={{ margin: '4px', color: '#ffffff' }}>
                                    PRIVACY POLICIES.
                                </Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Newsletter
                            </Typography>
                            <Box component="form" noValidate autoComplete="off">
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Enter your email"
                                    InputProps={{ sx: { bgcolor: 'white', borderRadius: '4px' } }}
                                    sx={{ mb: 2 }}
                                />
                                <Button variant="contained" className='global-button' fullWidth>
                                    Subscribe
                                </Button>
                            </Box>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Link href="https://www.facebook.com/gladys.kyambadde" color="inherit" sx={{ mx: 1 }}>
                                    <FacebookIcon />
                                </Link>
                                <Link href="https://www.twitter.com/Gladys33137258" color="inherit" sx={{ mx: 1 }}>
                                    <TwitterIcon />
                                </Link>
                                <Link href="https://www.linkedin.com/in/gladys-kyambadde-037070231" color="inherit" sx={{ mx: 1 }}>
                                    <LinkedInIcon />
                                </Link>
                                <Link href="https://github.com/Gladys-tech" color="inherit" sx={{ mx: 1 }}>
                                    <GitHubIcon />
                                </Link>
                                <Link href="https://www.instagram.com" color="inherit" sx={{ mx: 1 }}>
                                    <InstagramIcon />
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ bgcolor: 'rgba(139, 69, 19, 1)', py: 2, mt: 4 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center">
                        &copy; {new Date().getFullYear()} All Rights Reserved By
                        <Link href="https://html.design/" color="inherit" sx={{ ml: 1 }}>
                            Gladys k
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
