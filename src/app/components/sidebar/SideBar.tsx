'use client'
import React, { useState } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { AnimatePresence, motion } from "framer-motion"
import { FaBook, FaLock, FaUser } from 'react-icons/fa'
import { IoChatbubble, IoSettings } from 'react-icons/io5'
import Link from 'next/link'

function SideBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const menuItems = [
        { label: 'My Profile', route: '/my-profile', icon: <FaUser /> },
        { label: 'Settings', route: '/setting', icon: <IoSettings /> },
        { label: 'Feedback', route: '/feedback', icon: <IoChatbubble /> },
        {
            label: 'Privacy Policy', route: '/privacy-policy', icon: <FaLock />
        },
        { label: 'Terms of use', route: '/terms-of-use', icon: <FaBook /> }
    ]

    return (
        <div className='fixed w-full z-[999] max-w-7xl mx-auto'>
            <PrimaryButton
                className='rounded-full absolute top-8 left-4 animate-pulse w-12 h-12'
                icon={<IoMdMenu />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='fixed inset-0 bg-black/50 backdrop-blur-sm'
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Sidebar with curved effect */}
                        <motion.div
                            initial={{
                                x: '-100%',
                                clipPath: 'circle(0% at 0% 50%)'
                            }}
                            animate={{
                                x: 0,
                                clipPath: 'circle(150% at 0% 50%)'
                            }}
                            exit={{
                                x: '-100%',
                                clipPath: 'circle(0% at 0% 50%)'
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 20,
                                mass: 0.8
                            }}
                            className='fixed left-0 h-[calc(100vh-4rem)]  rounded-tr-full overflow-hidden flex items-start justify-center flex-col rounded-br-full top-1/2 -translate-y-1/2 w-80 bg-white shadow-2xl'
                        >
                            {/* Close Button */}
                            <div className='p-6'>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className='w-10 h-10 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/70 cursor-pointer flex items-center justify-center transition-colors'
                                >
                                    <IoMdClose className='text-xl text-white' />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <nav className='p-6'>
                                <ul className='space-y-2'>
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.1 + 0.2,
                                                duration: 0.3
                                            }}
                                        >
                                            <Link
                                                href={item?.route}
                                                className='flex items-center gruop gap-4 p-4 rounded-lg hover:bg-gray-100 transition-colors group'
                                            >
                                                <span className='text-2xl group-hover:scale-110 text-black transition-transform'>
                                                    {item.icon}
                                                </span>
                                                <span className='text-gray-700 group-hover:text-black font-medium'>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SideBar