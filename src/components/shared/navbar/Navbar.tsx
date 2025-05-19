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
                "lg:fixed top-0 z-50",
                "transition-all bg-card pb-4 lg:pb-0 px-4 sm:px-6 md:px-8 lg:px-4 w-full h-16",
                isMovieDetailsPage ? "bg-background/50" : "bg-card",
                "flex flex-col lg:flex-row justify-between items-center"

            )}>
                {/* LEFT */}
                <div className="flex justify-between lg:justify-start items-center gap-4 border border-blue-500 w-full lg:w-max">
                    <MobileMenu />
                    <SiteLogo className="" />
                    <NavbarRightSection className="lg:hidden flex" />
                </div>

                {/* MIDDLE */}
                <LargeScreenMenu className="border border-amber-500" />

                {/* RIGHT */}
                <div className="flex gap-2 border border-fuchsia-700 flex-1 lg:max-w-sm w-full lg:w-max">
                    <NavbarSearchBox className="border border-green-500 lg:max-w-[400px] flex-1" />
                    <NavbarRightSection className="hidden lg:flex" />
                </div>
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