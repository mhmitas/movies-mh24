import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { NavbarRightSection } from "./NavbarRightSection"
import SiteLogo from "../siteLogo"
import LargeScreenMenu from "./LargeScreenMenu"
import NavbarSearchBox from "./NavbarSearchBox"
import SiteLogoV2 from "../siteLogo-v2"

export function Navbar({ className, isHomePage }: { className?: string, isHomePage?: boolean }) {

    const containerClasses = cn(
        "lg:fixed top-0 z-50",
        "bg-card pb-4 lg:pb-0 pt-2 px-4 sm:px-6 md:px-8 lg:px-4 lg:pt-0",
        "w-full lg:h-16",
        "transition-all",
        className,
        "flex flex-col lg:flex-row gap-2 lg:gap-4 justify-between items-center"
    )

    return (
        <header className={cn("lg:mb-16")}>
            <div className={containerClasses}>
                {/* Left Section */}
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <MobileMenu />
                    {/* <SiteLogo /> */}
                    <SiteLogoV2 />
                    <NavbarRightSection className="lg:hidden" />
                </div>

                {/* Middle Section */}
                <LargeScreenMenu className="hidden lg:flex flex-1 justify-center" />

                {/* Right Section */}
                <div className="flex flex-1 lg:flex-none items-center gap-2 lg:gap-4 w-full lg:w-auto">
                    <NavbarSearchBox className={cn("flex-1 lg:max-w-[400px] xl:w-xs", isHomePage && "lg:hidden")} />
                    <NavbarRightSection className={cn("hidden lg:flex", isHomePage && "min-w-40")} />
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