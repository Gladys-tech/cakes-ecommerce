
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Pagination } from '@mui/material';
import { useUser } from '@/context/UserContext';

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const ordersPerPage = 6;

    // Access user context
    const { user } = useUser();

    useEffect(() => {
        if (!user) return; // Ensure user is available

        const userId = user.id; // Get user's ID from context

        // Fetch orders from API
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}/orders`);
                const data = await response.json();
                setOrders(data); // Assuming the API response is a list of orders
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

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const displayedOrders = orders.slice((page - 1) * ordersPerPage, page * ordersPerPage);

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>
            {displayedOrders.map((order) => (
                <Paper key={order.id} sx={{ padding: 2, marginBottom: 2 }}>
                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
                        <Box pr={{ xs: 0, sm: 2 }} pb={{ xs: 2, sm: 0 }} style={{ width: 120, height: 120, flexShrink: 0 }}>
                            <img src={order.product?.primaryImageUrl} alt={order.product?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box flexGrow={1} pl={{ xs: 0, sm: 2 }} pr={{ xs: 0, sm: 2 }} pb={{ xs: 2, sm: 0 }}>
                            <Typography variant="subtitle1">{order.product?.name}</Typography>
                            <Typography variant="body2">{`${order.product?.description.slice(0, 50)}...`}</Typography>
                            <Typography variant="body2">Order ID: {order.id}</Typography>
                            <Typography variant="body2">Quantity: {order.quantity}</Typography>
                            <Typography variant="body2">Status: {order.status}</Typography>
                            <Typography variant="body2">Created At: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                            <Typography variant="body2">Expected Delivery: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</Typography>
                        </Box>
                        <Box>
                            <Button variant="outlined" className='global-button' onClick={() => handleSeeDetails(order)}>
                                See Details
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            ))}

            {/* Pagination controls */}
            <Box mt={2} display="flex" justifyContent="center">
                <Pagination
                    count={Math.ceil(orders.length / ordersPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {/* Order details dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <Box>
                            <Typography variant="subtitle1">Client: {selectedOrder.client}</Typography>
                            <Typography variant="body2">Order Value: ush {selectedOrder.orderValue}</Typography>
                            <Typography variant="body2">Ordered Quantity: {selectedOrder.quantity}</Typography>
                            <Typography variant="body2">Payment Method: {selectedOrder.paymentMethod}</Typography>
                            <Typography variant="body2">Product ID: {selectedOrder.product?.id}</Typography>
                            <Typography variant="body2">Product Name: {selectedOrder.product?.name}</Typography>
                            <Typography variant="body2">Product Description: {selectedOrder.product?.description}</Typography>
                            <Typography variant="body2">Product Price: ush {selectedOrder.product?.price}</Typography>
                            <Typography variant="body2">Product Status: {selectedOrder.product?.productStatus}</Typography>
                            <Typography variant="body2">Ingredients: {selectedOrder.product?.ingredients}</Typography>
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

