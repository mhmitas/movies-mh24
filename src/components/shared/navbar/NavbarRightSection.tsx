"use client"

import { Button } from "@/components/ui/button"
import { Cast, Users, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SearchDialog from "./SearchBox"

export function NavbarRightSection() {

    return (
        <div className="flex items-center gap-2">
            <SearchDialog />
            <Button variant="primary" size="icon" className="hidden sm:inline-flex rounded-full">
                <Cast className="size-5" />
                <span className="sr-only">Cast</span>
            </Button>

            <Button variant="primary" size="icon" className="hidden sm:inline-flex rounded-full">
                <Users className="size-5" />
                <span className="sr-only">Users</span>
            </Button>

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