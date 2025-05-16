"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, Cast, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SiteLogo from "./siteLogo"
import { useState } from "react"
import { Input } from "../ui/input"

type NavItemProps = {
    id: string
    label: string
    href: string
}

const NAV_ITEMS: NavItemProps[] = [
    { id: "home", label: "Home", href: "/" },
    { id: "favorites", label: "Favorites", href: "/favorites" },
    { id: "movies", label: "Movies", href: "/movies" },
    { id: "tvshows", label: "TV Shows", href: "/tvshows" },
]

export function Navbar() {
    const pathname = usePathname()
    const isMovieDetailspage = pathname.startsWith("/movies/")

    return (
        <header className="w-full">
            {/* Main navbar */}
            <div className={cn(
                "flex items-center justify-between h-16 fixed top-0 w-full px-4 z-20",
                "backdrop-blur-lg bg-background/80 transition-all",
                isMovieDetailspage ? "bg-background/30" : "bg-muted/50"
            )}>
                {/* Left section - Mobile menu and logo */}
                <div className="flex items-center gap-4">
                    <MobileMenu activePath={pathname} />
                    <Link href="/" className="hover:opacity-80 transition-opacity">
                        <SiteLogo />
                    </Link>
                </div>

                {/* Desktop navigation */}
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

function MobileMenu({ activePath }: { activePath: string }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
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
                    {/* <nav className="flex flex-col space-y-1 mt-6">
                        {navItems.map((item: NavItemProps) => ( */}

                    <nav className="flex flex-col space-y-1 mt-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "px-4 sm:px-6 py-3 rounded-md font-medium",
                                    activePath === item.href
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



function NavbarRightSection() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsSearchOpen(false)
        }
    }

    return (
        <div className="flex items-center gap-2">

            <div className="flex items-center">
                {!isSearchOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="size-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                )}

                <form onSubmit={handleSearch} className={cn("transition-all duration-300", isSearchOpen ? 'w-48 opacity-100' : 'w-0 opacity-0')}>
                    <Input
                        type="search"
                        placeholder="Search movies..."
                        className="h-9 rounded-full bg-background focus-visible:ring-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchOpen(false)}
                        autoFocus={isSearchOpen}
                    />
                </form>
            </div>
            {/* other icons */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                    <Cast className="size-5" />
                    <span className="sr-only">Cast</span>
                </Button>

                <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                    <Users className="size-5" />
                    <span className="sr-only">Users</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="size-5" />
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
        </div>
    )
}