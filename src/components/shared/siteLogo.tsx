import Image from 'next/image';
import React from 'react'

const SiteLogo = () => {
    return (
        <div className="flex items-center font-oswald">
            <Logo />
            <span className="ml-2 text-xl font-bold hidden sm:inline-block">Movies MH24</span>
        </div>
    )
}

export default SiteLogo;

function Logo() {
    return (
        <Image src={"/logo.png"} width={35} height={35} alt='logo' />
    )
}