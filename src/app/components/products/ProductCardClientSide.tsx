'use client'
import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import { AnimatePresence, motion } from 'framer-motion'
import { IoMdEye } from 'react-icons/io'
import { cn } from '@/lib/utils'


function ProductCardClientSide({ id, isHovered, className }: { id: string, isHovered?: boolean, className?: string }) {
    const router = useRouter()
    const { addToCart } = useCart();

    return (
        <AnimatePresence>
            {isHovered &&
                <motion.div className={cn('flex absolute -top-16 left-1/2 -translate-x-1/2 w-3/4 items-center mt-3 justify-center gap-2', className)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <PrimaryButton
                        onClick={() => router.push(`/product/${id}`)}
                        title='View Details'
                        icon={<IoMdEye />}
                        iconClassName='md:block hidden'
                        className='!bg-white !border !border-[var(--border-color)] !shadow-sm !text-black hover:!bg-[var(--purple-light)] hover:text-white rounded-none'
                    />
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default ProductCardClientSide