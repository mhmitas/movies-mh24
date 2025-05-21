"use client"

import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function NavbarRightSection({ className }: { className?: string }) {

    return (
        <div className={cn("flex items-center gap-2 justify-end", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="primary" size="icon" className="rounded-full">
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
    )
}