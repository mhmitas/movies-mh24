import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const SiteLogo = ({ className }: { className?: string }) => {
    return (
        // <div className="flex items-center font-oswald">
        <div className={cn("flex items-center gap-2 font-oswald", className)}>
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