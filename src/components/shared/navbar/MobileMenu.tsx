"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import SiteLogo from "../siteLogo"
import { NAV_ITEMS } from "@/constants"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function MobileMenu() {
    const [open, setOpen] = useState(false)

    const pathname = usePathname()

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="primary" className="rounded-full size-11">
                    <Menu className="size-6" />
                    <span className="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-[240px] sm:max-w-[300px]">
                <div className="">
                    <div className="p-4 sm:p-6">
                        <Link href={"/"}>
                            <SiteLogo />
                        </Link>
                    </div>
                    <nav className="flex flex-col space-y-1 mt-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "px-4 sm:px-6 uppercase py-3 rounded-md font-medium",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}