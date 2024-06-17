"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useUser } from '@/context/UserContext';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Access user context
    const { user, setUser } = useUser();
    useEffect(() => {
        if (!user) return; // Ensure user is available
        const userEmail = user.email; // Get user's email from context

        // Fetch orders from API
        const fetchOrders = async () => {
            try {
                // const response = await fetch(`http://localhost:8000/orders?email=${encodeURIComponent(userEmail)}`);
                const response = await fetch(`http://localhost:8000/orders`);
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]); // Trigger effect when user changes

    const handleSeeDetails = (order: any) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        Ongoing Orders ({orders.filter(order => order.status === 'order made').length})
                    </Typography>
                    {orders.filter(order => order.status === 'order made').map((order) => (
                        <Paper key={order.id} sx={{ padding: 2, marginBottom: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <img src={order.product.primaryImageUrl} alt={order.product.name} style={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle1">{order.product.name}</Typography>
                                    <Typography variant="body2">{`${order.product.description.slice(0, 50)}...`}</Typography>
                                    <Typography variant="body2">Order ID: {order.id}</Typography>
                                    <Typography variant="body2">Quantity: {order.quantity}</Typography>
                                    <Typography variant="body2">Status: {order.status}</Typography>
                                    <Typography variant="body2">Created At: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                    <Typography variant="body2">Expected Delivery: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</Typography>
                                    <Button variant="outlined" onClick={() => handleSeeDetails(order)} sx={{ marginTop: 1 }}>
                                        See Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                        Delivered Orders ({orders.filter(order => order.status === 'delivered').length})
                    </Typography>
                    {orders.filter(order => order.status === 'delivered').map((order) => (
                        <Paper key={order.id} sx={{ padding: 2, marginBottom: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <img src={order.product.primaryImageUrl} alt={order.product.name} style={{ width: '100%' }} />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle1">{order.product.name}</Typography>
                                    <Typography variant="body2">{`${order.product.description.slice(0, 50)}...`}</Typography>
                                    <Typography variant="body2">Order ID: {order.id}</Typography>
                                    <Typography variant="body2">Quantity: {order.quantity}</Typography>
                                    <Typography variant="body2">Status: {order.status}</Typography>
                                    <Typography variant="body2">Created At: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                                    <Typography variant="body2">Expected Delivery: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</Typography>
                                    <Button variant="outlined" onClick={() => handleSeeDetails(order)} sx={{ marginTop: 1 }}>
                                        See Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid>
            </Grid>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Box>
                            <Typography variant="subtitle1">Client: {selectedOrder.client}</Typography>
                            <Typography variant="body2">Order Value: ${selectedOrder.orderValue}</Typography>
                            <Typography variant="body2">Actual Money: ${selectedOrder.actualMoney}</Typography>
                            <Typography variant="body2">Payment Method: {selectedOrder.paymentMethod}</Typography>
                            <Typography variant="body2">Total Commission: ${selectedOrder.totalCommission}</Typography>
                            <Typography variant="body2">Product ID: {selectedOrder.product.id}</Typography>
                            <Typography variant="body2">Product Name: {selectedOrder.product.name}</Typography>
                            <Typography variant="body2">Product Description: {selectedOrder.product.description}</Typography>
                            <Typography variant="body2">Product Price: ${selectedOrder.product.price}</Typography>
                            <Typography variant="body2">Inventory Quantity: {selectedOrder.product.inventoryQuantity}</Typography>
                            <Typography variant="body2">Shops: {selectedOrder.shops.map((shop: any) => shop.name).join(', ')}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Orders;

