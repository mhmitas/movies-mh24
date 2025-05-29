import { Navbar } from '@/components/shared/navbar/Navbar';
import ScrollHandler from '@/components/shared/scroll-handler';
import React from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto'>
            <ScrollHandler />
            <Navbar className="bg-background/70" />
            {children}
        </div>
    )
}

export default layout