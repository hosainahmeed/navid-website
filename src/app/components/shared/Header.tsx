'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function Header() {
    const router = useRouter()
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div
                onClick={() => router.push('/')}
                className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="text-xl font-bold text-foreground">Store</div>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Shop
                    </Link>
                    <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Categories
                    </Link>
                    <Link href="/cart" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Cart
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header