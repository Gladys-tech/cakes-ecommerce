"use client";
import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '@/context/CartContext';
import CartPopup from '@/components/CartPopup';
import Calendar from '@/components/Calendar';

const CheckoutPage: React.FC = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        paymentMethod: 'Cash on Delivery',
    });
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send details to the backend, process payment, etc.
        console.log('Order submitted:', customerDetails, cartItems, selectedDate);

        // Clear cart after successful order submission
        clearCart();
    };

    const handleEditCartClick = () => {
        setIsCartPopupOpen(true);
    };

    const handleCartPopupClose = () => {
        setIsCartPopupOpen(false);
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Shipping Information
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={customerDetails.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={customerDetails.address}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={customerDetails.email}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={customerDetails.phone}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Payment Method"
                            name="paymentMethod"
                            value={customerDetails.paymentMethod}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" className='global-button' sx={{ marginTop: 2 }}>
                            Place Order
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <List>
                        {cartItems.map(item => (
                            <ListItem key={item.id}>
                                <ListItemText
                                    primary={`${item.name} x ${item.quantity}`}
                                    secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">
                            Total: ${totalAmount().toFixed(2)}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="outlined" className='global-button' onClick={handleEditCartClick}>
                            Edit Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
                Choose a Delivery Date for Your Order
            </Typography>
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <CartPopup open={isCartPopupOpen} onClose={handleCartPopupClose} />
        </Container>
    );
};

export default CheckoutPage;