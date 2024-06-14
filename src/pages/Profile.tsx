
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useUser } from '@/context/UserContext';

const Profile: React.FC = () => {
    const { user, setUser } = useUser();
    const [profileDetails, setProfileDetails] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: '',
        telephone: '',
    });
    const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('User data:', user); 
            setProfileDetails({
                name: user.firstName,
                email: user.email,
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                country: user.address?.country || '',
                telephone: user.address?.telephone || '',
            });
        } else {
                window.location.href = '/login';
        }
}, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    


    const handleSave = async () => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileDetails),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update user context if needed
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
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ paddingTop: 4, marginBottom: 5 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box position="relative">
                    <Avatar
                        src={typeof avatar === 'string' ? avatar : undefined}
                        sx={{ width: 80, height: 80, marginBottom: 2 }}
                    >
                        {/* {!avatar && (profileDetails.name[0] || 'JD')} */}
                        jd
                    </Avatar>
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
                                label="Name"
                                name="name"
                                value={profileDetails.name}
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
                                label="city"
                                name="city"
                                value={profileDetails.city}
                                onChange={handleChange}
                                disabled={!editing}
                                variant={editing ? 'outlined' : 'filled'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Telephone"
                                name="telephone"
                                value={profileDetails.telephone}
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

