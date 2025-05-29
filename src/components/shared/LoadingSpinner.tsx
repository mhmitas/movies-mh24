import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { FaStar } from 'react-icons/fa6';

const LoadingSpinner = ({ className }: { className?: string }) => {
    // Generate random sparks with unique properties
    const sparks = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            // Random positions near the bottom
            x: (Math.random() - 0.5) * 30,
            // Random movement speeds
            speed: 50 + Math.random() * 100,
            // Random movement angles
            angle: -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 2,
            // Random sizes
            size: 0.5 + Math.random() * 1,
            // Staggered delays
            delay: i * 0.1
        }));
    }, []);

    return (
        <div className='min-h-screen flex justify-center items-center my-20'>
            <div className='relative w-40 h-40'>
                {/* Spinning wheel with friction effect */}
                <div className='absolute inset-0 flex justify-center items-center'>
                    <div className='relative'>
                        {/* Wheel shadow (creates friction illusion) */}
                        <div className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-red-500 blur-md opacity-70 rounded-full'></div>

                        {/* Main wheel */}
                        <Image
                            src="/logo.png"
                            width={70}
                            height={70}
                            alt="logo"
                            className={cn(
                                "animate-wheel-spin duration-100",
                                className
                            )}
                        />
                    </div>
                </div>

                {/* Friction sparks */}
                <div className='absolute inset-0'>
                    {sparks.map(spark => (
                        <Spark key={spark.id} {...spark} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Spark({ x, speed, angle, size, delay }: {
    x: number,
    speed: number,
    angle: number,
    size: number,
    delay: number
}) {
    // Calculate movement vector
    const moveX = Math.cos(angle) * speed;
    const moveY = Math.sin(angle) * speed;

    return (
        <div
            className='absolute bottom-10 -rotate-90 left-1/2'
            style={{
                transform: `translateX(${x}px)`,
                animation: `spark-fly ${0.5 + Math.random() * 0.5}s ease-out ${delay}s infinite`,
            }}
        >
            <FaStar
                className='text-amber-500 animate-spark-pulse'
                style={{
                    fontSize: `${size * 0.75}rem`,
                    opacity: 0.8,
                    // Random spark colors
                    color: Math.random() > 0.7 ? '#f59e0b' : '#f97316',
                }}
            />
        </div>
    );
}

export default LoadingSpinner;