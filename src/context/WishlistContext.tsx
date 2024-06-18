
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
    primaryImageUrl: string;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: string) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem('wishlistItems');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems((prevItems) => {
            const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id);
            if (existingItem) {
                return prevItems;
            } else {
                return [...prevItems, item];
            }
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
