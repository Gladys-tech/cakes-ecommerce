"use client";
import React, { useState, useEffect } from 'react';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <Fab
                    // color="primary"
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: '2rem', 
                        backgroundColor:'#8B4513',
                        right: '2rem',
                        zIndex: 1000
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            )}
        </div>
    );
};

export default ScrollToTop;
