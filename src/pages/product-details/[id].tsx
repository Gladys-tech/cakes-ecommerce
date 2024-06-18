"use client";
import React from 'react';
import { CartProvider } from '@/context/CartContext';
import ProductDetailsPage from '@/components/ProductDetails';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';

const ProductDetails = () => (
    <UserProvider>
        <CartProvider>
            <WishlistProvider>
                <>
                    <NavBar />
                    <ProductDetailsPage />
                    <Footer />
                </>
            </WishlistProvider>
        </CartProvider>
    </UserProvider>
);

export default ProductDetails;
