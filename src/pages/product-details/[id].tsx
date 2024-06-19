"use client";
import React from 'react';
import { CartProvider } from '@/context/CartContext';
import ProductDetailsPage from '@/components/ProductDetails';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SearchProvider } from '@/context/SearchContext';

const ProductDetails = () => (
    <UserProvider>
        <CartProvider>
            <WishlistProvider>
                <SearchProvider>
                    <>
                        <NavBar />
                        <ProductDetailsPage />
                        <Footer />
                    </>
                </SearchProvider>
            </WishlistProvider>
        </CartProvider>
    </UserProvider>
);

export default ProductDetails;
