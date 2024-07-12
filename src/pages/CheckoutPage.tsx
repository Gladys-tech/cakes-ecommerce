
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import CartPopup from '@/components/CartPopup';
import Calendar from '@/components/Calendar';
import { usePathname } from 'next/navigation';


const CheckoutPage: React.FC = () => {
    const pathname = usePathname();
    const { cartItems, totalAmount, clearCart } = useCart();
    const { user } = useUser();
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        paymentMethod: 'Cash on Delivery',
    });
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [customerId, setCustomerId] = useState<string | null>(null); // State to store customerId


    useEffect(() => {
        if (user) {
            console.log("User context:", user); // Add this line
            setCustomerDetails({
                name: `${user.firstName} ${user.lastName}`,
                address: user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}` : '',
                email: user.email || '',
                // email: '',
                phone: user.address ? user.address.telphone : '',
                paymentMethod: 'Cash on Delivery', // Default payment method
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const createCustomer = async () => {
        try {
            console.log("Creating customer with user ID:", user?.id);
            const response = await fetch('http://localhost:8000/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: user?.firstName || '',
                    lastName: user?.lastName || '',
                    email: user?.email || '',
                    // email: customerDetails.email,
                    location: user?.address ? `${user.address.city}, ${user.address.state}, ${user.address.country}` : '',
                    telphone: user?.address ? user.address.telphone : '',
                    isEmailVerified: true,
                    cart: cartItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity
                    })),
                    userId: user?.id // Add userId to the payload
                })
            });

            const data = await response.json();
            console.log("created customer", data);
            setCustomerId(data.customer.id); // Store the customerId in state
            return data.customer.id;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Ensure customerId is available

            let customerIdToUse = customerId;

            if (!customerId) {
                const createdCustomerId = await createCustomer();
                customerIdToUse = createdCustomerId;
            }

            if (!customerIdToUse) {
                throw new Error('Customer ID is not available');
            }

            // Proceed to place order
            const response = await fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: {
                        customerId: customerIdToUse,
                        products: cartItems.map(item => ({
                            productId: item.id,
                            quantity: item.quantity
                        }))
                    }
                })
            });

            const orderData = await response.json();
            console.log('Order placed successfully:', orderData);
            clearCart(); // Clear cart after successful order placement
            // Redirect to the Orders page
            window.location.href = '/order';
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle error scenario (e.g., display error message to user)
        }
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
            <Typography variant="body2" align="center" gutterBottom style={{ fontSize: '1.5rem' }}>
                Current path:<span style={{ color: '#8B4513', fontSize: '1.5rem' }}>Home {pathname}</span>
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
                            disabled // Disable payment method editing if desired
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
            {/* <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
                Choose a Delivery Date for Your Order
            </Typography>
            <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} /> */}
            <CartPopup open={isCartPopupOpen} onClose={handleCartPopupClose} />
        </Container>
    );
};

export default CheckoutPage;

