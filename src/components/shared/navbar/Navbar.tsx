import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { NavbarRightSection } from "./NavbarRightSection"
import SiteLogo from "../siteLogo"
import LargeScreenMenu from "./LargeScreenMenu"
import NavbarSearchBox from "./NavbarSearchBox"

export function Navbar({
    isHomePage,
    isMovieDetailsPage
}: {
    isHomePage?: boolean
    isMovieDetailsPage?: boolean
}) {
    const navbarClasses = cn(
        "w-full lg:mb-16",
        isHomePage ? "lg:mb-0" : ""
    )

    const containerClasses = cn(
        "lg:fixed top-0 z-50",
        "bg-card pb-4 lg:pb-2 pt-2 px-4 sm:px-6 md:px-8 lg:px-4",
        "w-full lg:h-16",
        "transition-all",
        isMovieDetailsPage ? "bg-background/50" : "bg-card",
        "flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between items-center"
    )

    return (
        <header className={navbarClasses}>
            <div className={containerClasses}>
                {/* Left Section */}
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <MobileMenu />
                    <SiteLogo />
                    <NavbarRightSection className="lg:hidden" />
                </div>

                {/* Middle Section */}
                <LargeScreenMenu className="hidden lg:flex flex-1 justify-center" />

                {/* Right Section */}
                <div className="flex flex-1 lg:flex-none items-center gap-2 lg:gap-4 w-full lg:w-auto">
                    <NavbarSearchBox className="flex-1 lg:max-w-[400px] xl:w-xs" />
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