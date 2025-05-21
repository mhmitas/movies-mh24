"use client"

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FaChevronUp } from 'react-icons/fa6';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            variant={"default"}
            size={"icon"}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            aria-label="Back to Top"
        >
            <FaChevronUp className='text-xl' />
        </Button>
    );
};

export default BackToTopButton;
