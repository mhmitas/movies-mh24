'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter()

    return (
        <main className="my-container flex h-full flex-col items-center justify-center min-h-[50vh] overflow-x-auto">
            <h2 className="text-center text-2xl lg:text-3xl font-bold">{error?.message || 'Oops, something went wrong. Please try again later.'}</h2>
            <div className='flex gap-4 flex-wrap justify-center mt-4 items-center'>
                <Button size="lg" onClick={() => router.back()}>
                    <ArrowLeft size={20} />
                    <span>GO BACK</span>
                </Button>
            </div>
        </main>
    );
}