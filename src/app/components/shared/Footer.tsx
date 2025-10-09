import React from 'react'

function Footer() {
    return (
        <footer className="mt-16 border-t min-h-[200px] border-border bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Best Sellers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Shipping Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Returns
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-foreground">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
                        <p className="text-sm text-muted-foreground">Subscribe to get special offers and updates.</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    © 2025 Store. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer