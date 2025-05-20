import { Footer } from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/navbar/Navbar';
import NavbarSearchBox from '@/components/shared/navbar/NavbarSearchBox';
import { cn } from '@/lib/utils';
import React from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto'>
            <Navbar isHomePage={true} />
            <div className={cn(
                'hidden lg:flex flex-col text-center w-full bg-card',
                "bg-card px-4 py-16 relative"
            )}>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold mb-7 tracking-tighter'>Find Movies, TV shows and more</h1>
                <div className='max-w-3xl w-full mx-auto absolute inset-x-0 bottom-0 translate-y-8 z-20'>
                    <NavbarSearchBox className='w-full' isHomePage={true} />
                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default layout