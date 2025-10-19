'use client'
import { AddToCartIcon } from '@/app/constants/icon.index'
import { IMAGE } from '@/app/constants/Image.index'
import { useCart } from '@/app/context/CartContext'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { memo } from 'react'

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
        <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-white">
            <div
                className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between">
                <div onClick={() => router.push('/')}
                    className="flex cursor-pointer items-center justify-center gap-2">
                    <Image
                        src={IMAGE.brand.src}
                        width={200}
                        height={200}
                        alt="brand"
                        className='w-auto h-12 md:h-12'
                    />
                    <div className='hidden md:flex flex-col items-start'>
                        <h1
                            style={{ fontFamily: "sans-serif" }}
                            className='text-base text-[#a937e2] font-black md:text-2xl'>DIVAN DIONE</h1>
                        <h2
                            style={{ fontFamily: "sans-serif" }}
                            className='text-xs font-medium md:text-sm'>SMOKE WITH ATTITUDE</h2>
                    </div>
                </div>
                <nav className="flex items-center gap-6">
                    {NavLink.map((item) => (
                        <Link key={item.href} href={item.href}
                            className={cn("text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                                pathname === item.href ? "text-foreground border-b-2 border-[var(--border-color)]" : ""
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
            <small className="text-center text-xs w-full self-center flex items-center justify-center font-bold text-red-500">WARNING: Recommended for adults only.</small>
        </header>
    )
}

export default memo(Header)