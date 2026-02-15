import React from 'react'

const layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='font-noto h-screen overflow-y-auto flex flex-col thin-scrollbar'>
            {/* <Navbar className='' /> */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default layout