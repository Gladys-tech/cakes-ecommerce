"use client";
import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Grid, TextField, Button, Box, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    telephone: number;
}

interface State {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    agreeToTerms: boolean;
    address: Address;
}

const SignupPage = () => {
    const [signupDetails, setSignupDetails] = useState<State>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
        isEmailVerified: false,
        agreeToTerms: false,
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            telephone: 0,
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        if (prop === 'agreeToTerms') {
            setSignupDetails({ ...signupDetails, [prop]: event.target.checked });
        } else {
            setSignupDetails({ ...signupDetails, [prop]: event.target.value });
        }
    };

    const handleAddressChange = (prop: keyof Address) => (event: ChangeEvent<HTMLInputElement>) => {
        setSignupDetails({
            ...signupDetails,
            address: { ...signupDetails.address, [prop]: event.target.value },
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            console.log('signing up with:', signupDetails);
            const response = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupDetails),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Response error text:', errorText);
                throw new Error('Registration failed');
            }

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('registered successfully:', data);
                console.log('Address details:', data.user.address); // Log address details
                setSuccessMessage('Registration successful! Redirecting to login page...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 8000);
            } else {
                const errorText = await response.text();
                console.error('Unexpected content type:', contentType, 'Response text:', errorText);
                throw new Error('Unexpected response format');
            }

        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Registration failed:', error instanceof Error ? error.message : 'Unknown error');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: 8, marginBottom: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Sign Up
            </Typography>
            <Box>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={signupDetails.firstName}
                                onChange={handleChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={signupDetails.lastName}
                                onChange={handleChange('lastName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={signupDetails.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                name="password"
                                value={signupDetails.password}
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                value={signupDetails.address.street}
                                onChange={handleAddressChange('street')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={signupDetails.address.city}
                                onChange={handleAddressChange('city')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={signupDetails.address.state}
                                onChange={handleAddressChange('state')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={signupDetails.address.country}
                                onChange={handleAddressChange('country')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Telephone"
                                name="telephone"
                                value={signupDetails.address.telephone}
                                onChange={handleAddressChange('telephone')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={signupDetails.agreeToTerms}
                                        onChange={handleChange('agreeToTerms')}
                                        name="agreeToTerms"
                                    />
                                }
                                label="Agree to Terms"
                            />
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography color="error" variant="body2">
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        {successMessage && (
                            <Grid item xs={12}>
                                <Typography color="success" variant="body2">
                                    {successMessage}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button fullWidth type="submit" variant="contained" className='global-button'>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
                Already have an account?{' '}
                <Link href="/login" style={{ textDecoration: 'none', color: "#8B4513", fontWeight: 600 }}>
                    Login
                </Link>
            </Typography>
        </Container>
    );
};

export default SignupPage;
