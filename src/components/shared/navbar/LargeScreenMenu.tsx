"use client"

import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LargeScreenMenu = ({ className }: { className?: string }) => {
    const pathname = usePathname()

    return (
        <nav className={cn("hidden lg:flex items-center gap-6 mx-6", className)}>
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                        "text-sm font-medium uppercase transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export default LargeScreenMenu