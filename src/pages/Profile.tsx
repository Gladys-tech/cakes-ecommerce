"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useUser } from '@/context/UserContext';

const Profile: React.FC = () => {
    const { user, setUser } = useUser();
    const [profileDetails, setProfileDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        image: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            telphone: '',
        },
    });
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('User data:', user);
            setProfileDetails({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                image: user.image || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    country: user.address?.country || '',
                    telphone: user.address?.telphone || '',
                },
            });
            setAvatar(user.image || '');
        } else {
            window.location.href = '/login'; // Redirect to login if user is not logged in
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (['street', 'city', 'state', 'country', 'telphone'].includes(name)) {
            setProfileDetails(prevDetails => ({
                ...prevDetails,
                address: {
                    ...prevDetails.address,
                    [name]: value,
                },
            }));
        } else {
            setProfileDetails(prevDetails => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    };

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            let updatedProfileDetails = { ...profileDetails };
            if (typeof avatar === 'string') {
                updatedProfileDetails.image = avatar;
            }

            const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfileDetails),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                setEditing(false);
                console.log('Profile updated successfully:', updatedUser);
            } else {
                console.error('Failed to update profile:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setAvatar(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: 4, marginBottom: 5 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box position="relative">
                    <Avatar
                        src={typeof avatar === 'string' ? avatar : profileDetails.image || undefined}
                        sx={{ width: 80, height: 80, marginBottom: 2 }}
                    />
                    {editing && (
                        <Box position="absolute" bottom={0} right={0}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="icon-button-file"
                                type="file"
                                onChange={handleAvatarChange}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Box>
                    )}
                </Box>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Button variant="contained" className='global-button' onClick={handleEditToggle}>
                        {editing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                </Box>
                <Box sx={{ width: '100%', marginTop: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={profileDetails.firstName}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={profileDetails.lastName}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={profileDetails.email}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={profileDetails.address.city}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Telephone"
                                name="telphone"
                                value={profileDetails.address.telphone}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="street"
                                value={profileDetails.address.street}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="State"
                                name="state"
                                value={profileDetails.address.state}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={profileDetails.address.country}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                    </Grid>
                    {editing && (
                        <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                            <Button variant="contained" className='global-button' onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Profile;


