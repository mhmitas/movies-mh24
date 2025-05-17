import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background mt-16">
            <div className="my-container mx-auto px-4 py-8">

                {/* Social Media Links */}
                <div className="pt-6 border-t border-border">
                    <div className="flex justify-center space-x-6 mb-6">
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Facebook className="h-6 w-6" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Instagram className="h-6 w-6" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-6 w-6" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Youtube className="h-6 w-6" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                    </div>

                    {/* App Download Links */}
                    <div className="flex justify-center space-x-4 mb-6">
                        <Link
                            href="#"
                            className="bg-secondary text-secondary-foreground text-xs px-4 py-2 rounded hover:bg-secondary/80 transition-colors"
                        >
                            Get the Movies MH24 App
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-xs text-muted-foreground">
                        <p>© {new Date().getFullYear()} Movies MH24, Inc. All rights reserved.</p>
                        <p className="mt-2">
                            Movies MH24, the Movies MH24 logo, and related marks are registered trademarks of Movies MH24, Inc.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
