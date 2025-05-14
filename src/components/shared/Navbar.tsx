"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, Cast, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SiteLogo from "./siteLogo"

type NavItemProps = {
    id: string
    label: string
    href: string
}

export function Navbar() {
    const [activeItem, setActiveItem] = useState("home")

    const navItems = [
        { id: "home", label: "Home", href: "/" },
        { id: "favorites", label: "Favorites", href: "/favorites" },
        { id: "movies", label: "Movies", href: "/movies" },
        { id: "tvshows", label: "TV Shows", href: "/tvshows" },
    ]

    return (
        <header className="w-full bg-muted/80 border-b border-border/40">
            {/* Main navbar */}
            <div className="flex flex-col items-center px-4">
                <div className="flex items-center justify-between w-full py-4 pb-0">
                    {/* Left section - Mobile menu and logo */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu trigger */}
                        <Sidebar navItems={navItems} activeItem={activeItem} setActiveItem={setActiveItem} />
                        {/* Logo */}
                        <SiteLogo />
                    </div>

                    {/* Right section - Icons */}
                    <NavbarRightSection />
                </div>
                <div className="flex gap-6">
                    <button className="navbar-tab">Home</button>
                    <button className="navbar-tab">Favorite</button>
                </div>
            </div>
        </header>
    )
}


function Sidebar({ navItems, activeItem, setActiveItem }: { navItems: NavItemProps[]; activeItem: string; setActiveItem: (id: string) => void }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="primary" className="rounded-full size-11">
                    <Menu className="size-6" />
                    <span className="sr-only">Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-[240px] sm:max-w-[300px]">
                <div className="p-4 sm:p-6">
                    <Link href={"/"}>
                        <SiteLogo />
                    </Link>
                    <nav className="flex flex-col space-y-1 mt-6">
                        {navItems.map((item: NavItemProps) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "px-3 py-2 rounded-md font-medium",
                                    activeItem === item.id
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                )}
                                onClick={() => setActiveItem(item.id)}
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

function NavbarRightSection() {
    return (
        <div className="flex items-center gap-2">
            <Button variant="primary" size="icon" className="hidden sm:flex rounded-full">
                <Cast className="h-5 w-5" />
                <span className="sr-only">Cast</span>
            </Button>

            <Button variant="primary" size="icon">
                <Search className="h-5 rounded-full w-5" />
                <span className="sr-only">Search</span>
            </Button>

            <Button variant="primary" size="icon" className="hidden sm:flex rounded-full">
                <Users className="h-5 w-5" />
                <span className="sr-only">Users</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="primary" size="icon" className="rounded-full">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
