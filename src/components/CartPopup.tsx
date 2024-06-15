"use client";
import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Close, Remove, Add, Delete } from '@mui/icons-material';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';

interface CartPopupProps {
    open: boolean;
    onClose: () => void;
}

const CartPopup: React.FC<CartPopupProps> = ({ open, onClose }) => {
    const { cartItems, removeFromCart, incrementQuantity, decrementQuantity, totalAmount } = useCart();
    const [isClient, setIsClient] = useState(false);
    const { user } = useUser();

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


    const handleCheckout = () => {
        if (totalAmount() > 0) {
            if (user) {
                window.location.href = '/checkout';
            } else {
                window.location.href = '/login';
            }
        }
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
                <Typography variant="h5" gutterBottom>Your Items</Typography>
                <List>
                    {cartItems.map(item => (
                        <ListItem key={item.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={item.primaryImageUrl} sx={{ width: 60, height: 60 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                            <IconButton onClick={() => decrementQuantity(item.id)}>
                                                <Remove />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ margin: '0 10px' }}>{item.quantity}</Typography>
                                            <IconButton onClick={() => incrementQuantity(item.id)}>
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>${item.price}</Typography>
                                        <Button variant="text" color="secondary" startIcon={<Delete />} onClick={() => removeFromCart(item.id)}>
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
                    <Button
                        variant="contained"
                        className='global-button'
                        onClick={handleCheckout}
                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                        disabled={totalAmount() === 0}
                    >
                        <span> ${totalAmount().toFixed(2)}</span>
                        {totalAmount() > 0 && <span>| Checkout</span>}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CartPopup;
