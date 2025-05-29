import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-muted to-background text-foreground">
            <div className="space-y-4 text-center">
                <Image
                    src="/images/confused.gif"
                    width={400}
                    height={200}
                    alt="404 Not Found"
                    className="mx-auto rounded-lg"
                    unoptimized
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter lg:text-5xl">404 - Page Not Found</h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="flex justify-center">
                    <Button asChild>
                        <Link href="/">
                            Go back home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}