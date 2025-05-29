import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { FaStar } from 'react-icons/fa6';

const LoadingSpinner2 = ({ className }: { className?: string }) => {
    const sparks = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        // Random positions near the contact point
        x: (Math.random() - 0.5) * 40,
        // Physics-based properties
        speed: 40 + Math.random() * 80,
        // Angles focused on the friction point (bottom)
        angle: Math.PI + (Math.random() - 0.5) * Math.PI / 2, // Focus on upward direction
        size: 0.5 + Math.random() * 1.5,
        delay: i * 0.05,
        lifetime: 0.4 + Math.random() * 0.3
    }));


    return (
        <div className='min-h-screen flex justify-center items-center my-20'>
            <div className='relative w-40 h-40 flex justify-center items-center'>
                {/* Wheel with rapid spinning animation */}
                <div className='relative'>
                    {/* Friction glow effect */}
                    <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-orange-500/40 blur-lg rounded-full animate-pulse'></div>

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

function Spark({ x, speed, angle, size, delay, lifetime }: {
    x: number,
    speed: number,
    angle: number,
    size: number,
    delay: number,
    lifetime: number
}) {
    // Calculate movement vector (THIS IS NOW USED!)
    const moveX = Math.cos(angle) * speed;
    const moveY = Math.sin(angle) * speed;

    return (
        <div
            className='absolute bottom-0 left-1/2 origin-bottom'
            style={{
                transform: `translateX(${x}px)`,
                animation: `spark-fly ${lifetime}s ease-out ${delay}s infinite`,
                // Using the calculated values in CSS variables
                '--move-x': `${moveX}px`,
                '--move-y': `${moveY}px`,
            } as React.CSSProperties}
        >
            <FaStar
                className='text-amber-500 animate-spark-fade'
                style={{
                    fontSize: `${size * 0.7}rem`,
                    filter: 'drop-shadow(0 0 2px #ff9e00)',
                    color: ['#ff9d00', '#ff5e00', '#ff2200'][Math.floor(Math.random() * 3)],
                }}
            />
        </div>
    );
}

export default LoadingSpinner2;