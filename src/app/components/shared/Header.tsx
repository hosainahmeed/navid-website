'use client'
import { AddToCartIcon } from '@/app/constants/icon.index'
import { IMAGE } from '@/app/constants/Image.index'
import { useCart } from '@/app/context/CartContext'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

function Header() {
    const router = useRouter()
    const { totalQuantity } = useCart()
    const pathname = usePathname()
    console.log("pathname", pathname)
    const NavLink = [
        { href: '/shop', label: 'Shop' },
        { href: '/categories', label: 'Categories' },
    ]
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div
                className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div onClick={() => router.push('/')} 
                className="flex cursor-pointer items-center justify-center gap-2">
                    <Image
                        src={IMAGE.brand.src}
                        width={200}
                        height={200}
                        alt="brand"
                        className='w-auto h-12 md:h-12'
                        />
                        <div className='hidden md:flex flex-col items-center'>
                            <h1 className='text-xl text-[#FF00B0] font-bold md:text-2xl'>DIVAN DIONE</h1>
                            <h2 className='text-xs font-medium md:text-sm'>SMOKE WITH ATTITUDE</h2>
                        </div>
                </div>
                <nav className="flex items-center gap-6">
                    {NavLink.map((item) => (
                        <Link key={item.href} href={item.href}
                            className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                                pathname === item.href ? "text-foreground border-b-2 border-black" : ""
                            )}>
                            {item.label}
                        </Link>
                    ))}
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