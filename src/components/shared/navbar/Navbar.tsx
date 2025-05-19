import Link from "next/link"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { NavbarRightSection } from "./NavbarRightSection"
import SiteLogo from "../siteLogo"
import LargeScreenMenu from "./LargeScreenMenu"
import NavbarSearchBox from "./NavbarSearchBox"

export function Navbar({ isHomePage, isMovieDetailsPage }: { isHomePage?: boolean, isMovieDetailsPage?: boolean }) {

    return (
        <header className="w-full lg:mb-16">
            <div className={cn(
                "lg:fixed top-0 w-full px-4 sm:px-6 md:px-8 lg:px-4 z-50",
                "transition-all bg-card",
                "transition-all pb-4 lg:pb-0",
                isMovieDetailsPage ? "bg-background/50" : "bg-card"

            )}>
                <div className="flex gap-2 lg:gap-6 items-center justify-between h-16">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        <MobileMenu />
                        <SiteLogo className="hidden lg:flex" />
                    </div>

                    {/* MIDDLE */}
                    <LargeScreenMenu />
                    <SiteLogo className="lg:hidden flex" />

                    {/* RIGHT */}
                </div>
                <NavbarSearchBox className="flex lg:hidden" />
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