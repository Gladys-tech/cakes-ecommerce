"use client";
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import './NavBar.css';
import { useCart } from '@/context/CartContext';
import CartPopup from './CartPopup';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const NavBar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState<null | HTMLElement>(null);
    const { cartItems } = useCart();
    const [cartOpen, setCartOpen] = useState(false); // State for cart visibility
    const { user, setUser } = useUser();


    const pathname = usePathname(); // Get current pathname

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchorEl(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchorEl(null);
    };

    const handleCartOpen = () => {
        setCartOpen(true);
    };

    const handleCartClose = () => {
        setCartOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        handleAccountMenuClose();
        window.location.href = '/login'; // Redirect to login or home page after logout
    };

    const drawer = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['About', 'Product', 'Contact', 'Signup', 'Blog'].map((text, index) => (
                    <ListItem button onClick={toggleDrawer(false)} key={index}>
                        <Link href={`/${text.toLowerCase()}`} passHref>
                            <ListItemText primary={text} />
                        </Link>
                    </ListItem>
                ))}
                <ListItem button>
                    <SearchIcon />
                    <ListItemText primary="Search" />
                </ListItem>
                {/* <ListItem button onClick={handleAccountMenuOpen}>
                    <AccountCircleIcon />
                    <ListItemText primary="Account" />
                </ListItem> */}
                <ListItem button onClick={handleAccountMenuOpen}>
                    {user ? (
                        <>
                            <AccountCircleIcon />
                            <ListItemText primary={user.firstName} />
                        </>
                    ) : (
                        <ListItemText primary="Guest" />
                    )}
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
                        {/* Use Link for navigation */}
                        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} passHref>
                            <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                About
                            </Typography>
                        </Link>
                        <Link href="/product" className={`nav-link ${pathname === '/product' ? 'active' : ''}`} passHref>
                            <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                Products
                            </Typography>
                        </Link>
                        <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} passHref>
                            <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                Contact
                            </Typography>
                        </Link>


                        {user ? (
                            <Link href="/profile" className={`nav-link ${pathname === '/profile' ? 'active' : ''}`} passHref>
                                <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                    {user.firstName}
                                </Typography>
                            </Link>
                        ) : (
                            <Link href="/signup" className={`nav-link ${pathname === '/signup' ? 'active' : ''}`} passHref>
                                <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                    Sign-up
                                </Typography>
                            </Link>
                        )}
                        <Link href="/blog" className={`nav-link ${pathname === '/blog' ? 'active' : ''}`} passHref>
                            <Typography variant="button" color="inherit" sx={{ marginLeft: 2 }}>
                                Blogs
                            </Typography>
                        </Link>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ textAlign: 'center', flexGrow: 2 }}>
                        <Link href="/" className="nav-link">
                            g<span style={{ color: '#ffcc00' }}>Cakes</span>
                        </Link>
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            sx={{ display: { xs: 'none', md: 'block' } }}
                        >
                            <SearchIcon />
                        </IconButton>

                        {user && (
                            <IconButton
                                color="inherit"
                                onClick={handleAccountMenuOpen}
                                sx={{ display: { xs: 'none', md: 'block' } }}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        )}
                        <IconButton
                            color="inherit"
                            onClick={handleCartOpen}
                        >
                            <ShoppingCartIcon />
                            {cartItems.length > 0 && (
                                <Box
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bgcolor: '#8B4513',
                                        borderRadius: '50%',
                                        padding: '2px 5px',
                                        color: 'white',
                                        fontSize: 10,
                                    }}
                                >
                                    {cartItems.length}
                                </Box>
                            )}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawer}
            </Drawer>
            <Menu
                anchorEl={accountMenuAnchorEl}
                open={Boolean(accountMenuAnchorEl)}
                onClose={handleAccountMenuClose}
            >
                <MenuItem onClick={handleAccountMenuClose}>
                    <Link href="/profile" className="nav-link">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <CartPopup open={cartOpen} onClose={handleCartClose} />
        </>
    );
};

export default NavBar;


