"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { NavbarRightSection } from "./NavbarRightSection"
import { NAV_ITEMS } from "@/constants"
import SiteLogo from "../siteLogo"

export function Navbar() {
    const pathname = usePathname()
    const isMovieDetailspage = pathname.startsWith("/movies/")

    return (
        <header className="w-full">
            <div className={cn(
                "flex items-center justify-between h-16 fixed top-0 w-full px-4 z-20",
                "backdrop-blur-lg bg-background/80 transition-all",
                isMovieDetailspage ? "bg-background/30" : "bg-muted/50"
            )}>
                <div className="flex items-center gap-4">
                    <MobileMenu activePath={pathname} />
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <SiteLogo />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 mx-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
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