import React from 'react'

const SiteLogo = () => {
    return (
        <div className="flex items-center font-oswald">
            <Logo />
            <span className="ml-2 text-xl font-bold hidden sm:inline-block">Movies MH24</span>
        </div>
    )
}

export default SiteLogo;

function Logo() {
    return (
        <div className="h-8 w-8 rounded bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        </div>
    )
}