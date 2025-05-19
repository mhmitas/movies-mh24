"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { NavbarRightSection } from "./NavbarRightSection"
import { NAV_ITEMS } from "@/constants"
import SiteLogo from "../siteLogo"

export function Navbar({ isMovieDetailsPage }: { isMovieDetailsPage?: boolean }) {
    const pathname = usePathname()

    return (
        <header className="w-full transition-colors">
            <div className={cn(
                "flex items-center justify-between h-16 fixed top-0 w-full px-4 z-50",
                "transition-all",
                isMovieDetailsPage ? "bg-background/50" : "bg-card"
            )}>
                <div className="flex items-center gap-4">
                    <MobileMenu activePath={pathname} />
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <SiteLogo />
                    </Link>
                </div>

                <nav className="hidden lg:flex items-center gap-6 mx-6">
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
                <NavbarRightSection />
            </div>
        </header>
    )
}


/* 
onWheel={(e) => {
// Prevent vertical scrolling
e.preventDefault();
// Scroll horizontally with mouse wheel
e.currentTarget.scrollLeft += e.deltaY;
}}
*/