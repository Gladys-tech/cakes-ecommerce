"use client";
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { WishlistItem } from '@/context/WishlistContext';

interface WishlistPopupProps {
    open: boolean;
    onClose: () => void;
}

const WishlistPopup: React.FC<WishlistPopupProps> = ({ open, onClose }) => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const handleContinueShopping = () => {
        onClose();
        window.location.href = '/';
    };

    const handleMoveToCart = (item: WishlistItem) => {
        const cartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            primaryImageUrl: item.primaryImageUrl,
            quantity: 1, // Assuming default quantity when moving to cart
            image: item.image
        };
        addToCart(cartItem);
        removeFromWishlist(item.id);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: '33vw', padding: 2, position: 'relative' }}>
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
                <Typography variant="h5" gutterBottom>Your Wishlist</Typography>
                <List>
                    {wishlistItems.map(item => (
                        <ListItem key={item.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={item.primaryImageUrl} sx={{ width: 60, height: 60 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={
                                    <>
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>${item.price}</Typography>
                                        <Button variant="text" color="primary" onClick={() => handleMoveToCart(item)}>
                                            Move to Cart
                                        </Button>
                                        <Button variant="text" color="secondary" startIcon={<Delete />} onClick={() => removeFromWishlist(item.id)}>
                                            Remove
                                        </Button>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                    <Button variant="contained" className='global-button' onClick={handleContinueShopping} sx={{ marginBottom: 2 }}>
                        Continue Shopping
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default WishlistPopup;
