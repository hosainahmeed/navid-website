import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className="border-t border-[var(--border-color)] bg-[#EDEDED] min-h-[200px]">
            <div className="max-w-screen-2xl mx-auto py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4 border border-[var(--border-color)]">Links</h3>
                        <ul className="border border-[var(--border-color)] space-y-2 p-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Best Sellers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4 border border-[var(--border-color)]">Support</h3>
                        <ul className="border border-[var(--border-color)] space-y-2 p-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4 border border-[var(--border-color)]">Company</h3>
                        <ul className="border border-[var(--border-color)] space-y-2 p-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border border-[var(--border-color)] p-8 text-center text-sm text-muted-foreground">
                    © 2025 Store. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer