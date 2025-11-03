'use client'
import Link from 'next/link'
import React, { memo } from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import { IoIosArrowDropup } from 'react-icons/io';
import { useRouter } from 'next/navigation';

function Footer() {
    const router = useRouter()

    const handleSocialClick = (type: string) => {
        switch (type) {
            case "instagram":
                router.push("https://www.instagram.com/divan_dione")
                break;
            case "facebook":
                router.push("https://www.facebook.com/divan.dione")
                break;
            case "twitter":
                router.push("https://twitter.com/divan_dione")
                break;
            case "tiktok":
                router.push("https://www.tiktok.com/@divan_dione")
                break;
            default:
                break;
        }
    }
    return (
        <footer className="border-t border-[var(--border-color)] bg-[#EDEDED] min-h-[200px]">
            <div className="max-w-screen-2xl border-x border-[var(--border-color)] mx-auto py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-[var(--border-color)]">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4">Links</h3>
                        <ul className="space-y-2 p-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="/shop" className="hover:text-foreground">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="hover:text-foreground">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4">Support</h3>
                        <ul className="space-y-2 p-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='sm:col-span-2 col-span-1 '>
                        <h3 className="text-sm font-semibold text-foreground bg-white p-4">Social</h3>
                        <div className='flex gap-3 my-3 ml-2'>
                            <FaInstagram onClick={() => handleSocialClick("instagram")} className="w-5 hover:text-pink-500 cursor-pointer h-5" />
                            <FaFacebookSquare onClick={() => handleSocialClick("facebook")} className="w-5 hover:text-blue-500 cursor-pointer h-5" />
                            <BsTwitterX onClick={() => handleSocialClick("twitter")} className="w-5 hover:text-gray-500 cursor-pointer h-5" />
                            <AiFillTikTok onClick={() => handleSocialClick("tiktok")} className="w-5 hover:text-gray-500 cursor-pointer h-5" />
                        </div>

                    </div>
                    <span className='md:block hidden'></span>
                </div>
                <div className="p-8 text-center text-sm text-muted-foreground">
                    ©{new Date().getFullYear()} All rights reserved by Divan Dione.
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
                    className="border cursor-pointer flex flex-col items-center justify-center border-[var(--border-color)] p-8 text-center text-sm text-muted-foreground">
                    <IoIosArrowDropup className="w-5 h-5" />
                    Back to Top
                </div>
            </div>
        </footer>
    )
}

export default memo(Footer)