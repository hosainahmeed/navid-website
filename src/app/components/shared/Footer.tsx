'use client'
import Link from 'next/link'
import React, { memo } from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import { IoIosArrowDropup } from 'react-icons/io';

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
                    <div className='border-r border-[var(--border-color)]'>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4 border border-[var(--border-color)]">Social</h3>
                        {/* <ul className="border border-[var(--border-color)] space-y-2 p-4 text-sm text-muted-foreground">
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
                        </ul> */}
                        <div className='flex gap-3 my-3 ml-2'>
                            <FaInstagram className="w-5 h-5" />
                            <FaFacebookSquare className="w-5 h-5" />
                            <BsTwitterX className="w-5 h-5" />
                            <AiFillTikTok className="w-5 h-5" />
                        </div>

                    </div>
                </div>
                <div className="border border-[var(--border-color)] p-8 text-center text-sm text-muted-foreground">
                    © 2025 Store. All rights reserved.
                </div>
                <div
                    onClick={() => {
                        if (window !== undefined) {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }
                    }}
                    className="border flex flex-col items-center justify-center border-[var(--border-color)] p-8 text-center text-sm text-muted-foreground">
                    <IoIosArrowDropup className="w-5 h-5" />
                    Back to Top
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)