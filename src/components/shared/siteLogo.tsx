"use client"

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const SiteLogo = ({ className }: { className?: string }) => {
    const router = useRouter()

    return (
        <div onClick={() => router.push("/")} className={cn("flex items-center font-oswald whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer", className)}>
            <Logo className='lg:h-10 lg:w-10 h-8 w-8' />
            <span className="ml-2 text-lg lg:text-xl font-bold inline-block">Movies MH24</span>
        </div>
    )
}

export default SiteLogo;

function Logo({ className }: { className?: string }) {
    return (
        <Image src={"/logo.png"} width={35} height={35} alt='logo' className={cn(className)} />
    )
}