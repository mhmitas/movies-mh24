"use client"

import { NAV_ITEMS } from '@/constants'
import { cn } from '@/lib/utils'
import { NavItemProps } from '@/types'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const LargeScreenMenu = ({ className }: { className?: string }) => {
    const pathname = usePathname()

    return (
        <nav className={cn("hidden lg:flex items-center justify-center gap-6 mx-6 h-full", className)}>
            <ul className="flex items-center h-full space-x-4">
                {NAV_ITEMS.map((item, idx) => (
                    <NavItemComponent key={idx} item={item} pathname={pathname} />
                ))}
            </ul>
        </nav>
    )
}

export default LargeScreenMenu

const NavItemComponent = ({ item, pathname }: { item: NavItemProps, pathname?: string }) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0

    return (
        <li className="relative h-full group">
            <div className="h-full">
                {item.href ? (
                    <Link href={item.href} className={cn(
                        "flex items-center h-full px-3 text-sm font-medium uppercase transition-colors",
                        "hover:text-primary hover:bg-accent/10",
                        pathname === item.href ? "text-primary" : "text-foreground"
                    )}>
                        {item.label}
                        {hasChildren && <ChevronDown className='ml-1 group-hover:rotate-180 duration-200' size={16} />}
                    </Link>
                ) : (
                    <div className={cn(
                        "flex items-center h-full px-3 text-sm font-medium uppercase cursor-default",
                        "hover:text-primary hover:bg-accent/10 cursor-pointer",
                        pathname === item.href ? "text-primary" : "text-foreground"
                    )}>
                        {item.label}
                        {hasChildren && <ChevronDown className='ml-1 group-hover:rotate-180 duration-200' size={16} />}
                    </div>
                )}
            </div>

            {hasChildren && (
                <ul className="hidden absolute pt-1 -translate-x-1/2 left-1/2 group-hover:block">
                    <div className="bg-muted shadow-lg rounded-lg border pt-2 w-max">
                        <div className="grid grid-cols-4 p-2">
                            {item.children!.map((child, idx) => (
                                <div key={idx} className="relative">
                                    <NavItemChildComponent item={child} />
                                </div>
                            ))}
                        </div>
                    </div>
                </ul>
            )}
        </li>
    )
}

const NavItemChildComponent = ({ item }: { item: NavItemProps }) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0

    return (
        <div className="relative group w-36">
            {item.href ? (
                <Link
                    href={item.href}
                    className={cn(
                        "flex items-center w-full px-4 py-2 text-sm transition-colors",
                        "hover:bg-accent hover:text-primary",
                        "whitespace-nowrap"
                    )}
                >
                    {item.label}
                    {hasChildren && <span className="ml-2">▸</span>}
                </Link>
            ) : (
                <div className="flex items-center w-full px-4 py-2 text-sm cursor-default">
                    {item.label}
                </div>
            )}

            {hasChildren && (
                <ul className="absolute hidden pt-1 -translate-y-1/2 group-hover:block left-full top-0">
                    <div className="ml-1 bg-background border rounded-lg shadow-lg">
                        {item.children!.map((child, idx) => (
                            <NavItemChildComponent key={idx} item={child} />
                        ))}
                    </div>
                </ul>
            )}
        </div>
    )
}