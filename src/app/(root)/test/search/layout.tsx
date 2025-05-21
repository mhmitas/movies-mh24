import React from 'react'
import SearchBox from './components/SearchBoxTest';

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto'>
            <div className='my-container'>
                <SearchBox />
            </div>
            {children}
        </div>
    )
}

export default layout