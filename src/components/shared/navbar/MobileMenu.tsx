"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, PlusSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import SiteLogo from "../siteLogo"
import { NAV_ITEMS } from "@/constants"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { NavItemProps } from "@/types"
import { AnimatePresence, motion } from "framer-motion"

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
            <SheetContent side="left" className="max-w-[240px] sm:max-w-[300px] overflow-y-auto thin-scrollbar">
                <div className="">
                    <div className="p-4 sm:p-6">
                        <Link href={"/"}>
                            <SiteLogo />
                        </Link>
                    </div>
                    <nav className="flex flex-col space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <MenuItemComponent key={item.id} item={item} />
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function MenuItemComponent({ item }: { item: NavItemProps }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const hasChildren = Array.isArray(item.children) && item.children.length > 0
    return (
        <>
            {hasChildren ? (
                <div>
                    <button onClick={() => setOpen(!open)} className={cn(
                        "px-4 sm:px-6 py-3 font-medium rounded-none cursor-pointer flex justify-between w-full",
                        pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}>
                        <span>{item.label}</span>
                        <PlusSquare size={16} />

                    </button>
                    {open && <MenuItemChildren item={item} isOpen={open} setOpen={setOpen} />}
                </div>
            ) : (
                <Link href={hasChildren ? "#" : item.href || ""}>
                    <div
                        className={cn(
                            "px-4 sm:px-6 py-3 font-medium rounded-none",
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                    >
                        {item.label}
                    </div>
                </Link>
            )}
        </>
    )
}

function MenuItemChildren({ isOpen, item, children, setOpen }: any) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden shadow-lg"
                >
                    <ul className="flex flex-col ml-4 border-l">
                        {item.children.map((child: any) => (
                            <li key={child.id} className="w-full">
                                <Link href={child.href || ""}>
                                    <div
                                        className={cn(
                                            "px-4 sm:px-6 py-2 rounded-none",
                                            pathname === child.href
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        )}
                                    >
                                        {child.label}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    )
}