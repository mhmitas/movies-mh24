import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { IoSparkles } from 'react-icons/io5';

const LoadingSpinner2 = ({ className }: { className?: string }) => {
    const sparks = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        // Random positions near the contact point
        x: (Math.random() - 0.5) * 40,
        // Physics-based properties
        speed: 40 + Math.random() * 80,
        // Angles focused on the friction point (bottom)
        angle: Math.PI + (Math.random() - 0.2) * Math.PI / 3,
        size: 0.5 + Math.random() * 1,
        delay: i * 0,
        lifetime: 0.4 + Math.random() * 0.3,
        color: ['#ff9d00', '#ff5e00', '#ff2200'][Math.floor(Math.random() * 3)]
    }));

    return (
        <div className='flex min-h-[70vh justify-center py-24 md:py-44 lg:py-56'>
            <div className='relative w-40 h-40 flex justify-center items-center'>
                {/* Wheel with rapid spinning animation */}
                <div className='relative'>
                    {/* Friction glow effect */}
                    <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-orange-500/50 blur-lg rounded-full animate-pulse'></div>

                    {/* Main wheel */}
                    <Image
                        src="/logo.png"
                        width={80}
                        height={80}
                        alt="logo"
                        className={cn(
                            "animate-wheel-spin duration-75 shadow-lg",
                            className
                        )}
                        blurDataURL='/logo.png'
                        // Add priority if it's above the fold
                        priority={true}
                        placeholder='blur'
                        unoptimized
                    />
                </div>

                {/* Friction sparks container */}
                <div className='absolute inset-0 overflow-visible'>
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
            className='absolute bottom-8 left-1/2 origin-bottom'
            style={{
                transform: `translateX(${x}px)`,
                animation: `spark-fly ${lifetime}s ease-out ${delay}s infinite`,
                // Using the calculated values in CSS variables
                '--move-x': `${moveX}px`,
                '--move-y': `${moveY}px`,
            } as React.CSSProperties}
        >
            <IoSparkles
                className='animate-spark-fade'
                style={{
                    fontSize: `${size * 0.7}rem`,
                    filter: 'drop-shadow(0 0 2px rgba(255, 100, 0, 0.8))',
                    color: color,
                }}
            />
        </div>
    );
}

export default LoadingSpinner2;