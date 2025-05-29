import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from "next/link";
import React from 'react'

const SiteLogo = ({ className }: { className?: string }) => {

    return (
        <Link href={"/"}>
            <div className={cn("flex items-center font-oswald whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer select-none", className)}>
                <Logo className='sm:h-10 sm:w-10 h-8 w-8' />
                <span className="ml-2 text-lg sm:text-xl font-bold inline-block">Movies MH24</span>
            </div>
        </Link>
    )
}

export default SiteLogo;

function Logo({ className }: { className?: string }) {
    return (
        <img src={"/logo.png"} width={35} height={35} alt='logo' className={cn(className)} />
    )
}