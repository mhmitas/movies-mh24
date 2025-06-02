
import { cn } from '@/lib/utils';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { FaStar } from "react-icons/fa6";

const SiteLogoV2 = ({ className }: { className?: string }) => {

    return (
        <div className={cn("flex items-center relative font-oswald whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer select-none", className)}>
            <Logo className='sm:h-10 sm:w-10 h-8 w-8' />
            <Link href={"/"}>
                <span className="ml-2 text-lg sm:text-xl font-bold inline-block translate-x-9">Neon Shows</span>
            </Link>
        </div>
    )
}

export default SiteLogoV2;

const Logo = ({ className }: { className?: string }) => {
    const sparks = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        // Random positions near the contact point
        x: (Math.random() - 0.5) * 40,
        // Physics-based properties
        speed: 900 + Math.random() * 80,
        // Angles focused on the friction point (bottom)
        angle: Math.PI + (Math.random() - 0.2) * Math.PI / 3,
        size: 0.5 + Math.random() * 0.1,
        delay: i * 0,
        lifetime: 15 + Math.random() * 0.3,
        color: ['#ff9d00', '#ff5e00', '#ff2200'][Math.floor(Math.random() * 3)]
    }));

    return (
        <div className='absolute left-0 -translate-x-16'>
            <div className='relative w-40 h-40 flex justify-center items-center'>
                {/* Wheel with rapid spinning animation */}
                <div className='relative'>
                    {/* Friction glow effect */}
                    <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-orange-500/50 blur-lg rounded-full animate-pulse'></div>

                    {/* Main wheel */}
                    <Image
                        src="/logo.png"
                        width={35}
                        height={35}
                        alt="logo"
                        className={cn(
                            "logo-animate-wheel-spin duration-75 shadow-lg",
                            className
                        )}
                        blurDataURL='/logo-v2.png'
                        // Add priority if it's above the fold
                        priority={true}
                        placeholder='blur'
                        unoptimized
                    />
                </div>

                {/* Friction sparks container */}
                <div className='absolute inset-0 overflow-visible fade-in duration-1000'>
                    {sparks.map(spark => (
                        <Spark key={spark.id} {...spark} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Spark({ x, speed, angle, size, delay, lifetime, color }: {
    x: number,
    speed: number,
    angle: number,
    size: number,
    delay: number,
    lifetime: number,
    color: string
}) {
    // Calculate movement vector
    const moveX = Math.cos(angle) * speed;
    const moveY = Math.sin(angle) * speed;

    return (
        <div
            className='absolute bottom-12 left-1/2 origin-bottom'
            style={{
                transform: `translateX(${x}px)`,
                animation: `logo-spark-fly ${lifetime}s ease-out ${delay}s infinite`, // Updated animation name
                // Using the calculated values in CSS variables
                '--move-x': `${moveX}px`,
                '--move-y': `${moveY}px`,
            } as React.CSSProperties}
        >
            <FaStar
                className='logo-animate-spark-fade' // Updated classname
                style={{
                    fontSize: `${size * 0.7}rem`,
                    filter: 'drop-shadow(0 0 2px rgba(255, 100, 0, 0.8))',
                    color: color,
                }}
            />
        </div>
    );
}
