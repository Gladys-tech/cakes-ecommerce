"use client";
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Grid, TextField, Button, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '@/context/UserContext';


interface State {
    email: string
    password: string
}

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState<State>({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useUser();



    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setLoginDetails({ ...loginDetails, [prop]: event.target.value })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', loginDetails); // Log the login details
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginDetails.email,
                    password: loginDetails.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const responseData = await response.json();
            const { user, token } = responseData; // Extract user object and token
            // Set user in context
            setUser({ ...user, token });

            console.log('logged in successfully:', responseData);
            setSuccessMessage('login successful! Redirecting to home page...');
            setTimeout(() => {
                window.location.href = '/';
            }, 8000);

            console.log('logged in :', user);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token); // Store token in local storage


        } catch (error) {
            console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
            alert('Login failed. Please try again.');
        }
    };



    return (
        <Container maxWidth="sm" sx={{ paddingTop: 8, marginBottom: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <Box sx={{ marginBottom: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={loginDetails.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                value={loginDetails.password}
                                onChange={handleChange('password')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        {successMessage && (
                            <Grid item xs={12}>
                                <Typography color="success" variant="body2">
                                    {successMessage}
                                </Typography>
                            </Grid>
                        )}
                        {errorMessage && (
                            <Grid item xs={12}>
                                <Typography color="error" variant="body2">
                                    {errorMessage}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" className='global-button'>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                Don't have an account?{' '}
                <Link href="/signup" style={{ textDecoration: 'none', color: "#8B4513", fontWeight: 600 }}>
                    Sign Up
                </Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;
