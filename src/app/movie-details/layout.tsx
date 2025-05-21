import { Navbar } from '@/components/shared/navbar/Navbar';
import React from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto'>
            <Navbar className="bg-background/60" />
            {children}
        </div>
    )
}

export default layout