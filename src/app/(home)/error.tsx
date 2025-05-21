'use client';

import { Button } from '@/components/ui/button';
import { IoReload } from "react-icons/io5";
import { useRouter } from 'next/navigation';

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
                <Button size="lg" onClick={() => window.location.reload()}>
                    <IoReload />
                    <span>TRY AGAIN</span>
                </Button>
            </div>
        </main>
    );
}