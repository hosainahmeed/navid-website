'use client'
import { AddToCartIcon } from '@/app/constants/icon.index'
import { useCart } from '@/app/context/CartContext'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Header() {
    const router = useRouter()
    const { totalQuantity } = useCart()
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div
                className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div onClick={() => router.push('/')} className="text-xl font-bold text-foreground">Store</div>
                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Shop
                    </Link>
                    <Link href="/categories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        Categories
                    </Link>
                    <Link href="/cart" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        <Badge>{totalQuantity}</Badge>
                        <AddToCartIcon className="w-5 h-5" fill="black" />
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header