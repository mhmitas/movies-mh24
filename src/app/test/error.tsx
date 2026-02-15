'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    useEffect(() => {
        // Optionally log the error to an error reporting service
        // console.error("Error from /app/error.jsx:", error);
    }, [error]);

    return (
        <main className="my-container flex h-full flex-col items-center justify-center min-h-screen">
            <h2 className="text-center text-3xl font-bold overflow-x-auto">{error?.message || 'Oops, something went wrong. Please try again later.'}</h2>
            <div className='flex gap-4 flex-wrap justify-center mt-4 items-center'>
                <Button
                    size="lg"
                    onClick={
                        // Attempt to recover by trying to re-render the invoices route
                        () => reset()
                    }
                >
                    Try again
                </Button>
                <Button size="lg" asChild><Link href="/"><Home /></Link></Button>
            </div>
        </main>
    );
}