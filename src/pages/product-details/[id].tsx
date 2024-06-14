"use client";
import React from 'react';
import { CartProvider } from '@/context/CartContext';
import ProductDetailsPage from '@/components/ProductDetails';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';

const ProductDetails = () => (
    <UserProvider>
        <CartProvider>
            <>
            <NavBar />
            <ProductDetailsPage />
            <Footer />
            </>
        </CartProvider>
    </UserProvider>
);

export default ProductDetails;
