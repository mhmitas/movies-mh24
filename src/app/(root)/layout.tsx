import { Footer } from '@/components/shared/Footer';
import { Navbar } from '@/components/shared/navbar/Navbar';
import React from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto'>
            <Navbar className='' />
            {children}
            <Footer />
        </div>
    )
}

export default layout