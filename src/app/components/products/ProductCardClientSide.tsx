'use client'
import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import { AddToCartIcon, ViewDetailIcons } from '@/app/constants/icon.index'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'

function ProductCardClientSide({ id }: { id: string }) {
    const router = useRouter()
    const { addToCart } = useCart();

    return (
        <div className='flex items-center mt-3 justify-between gap-2'>
            <PrimaryButton
                title="Add to Cart"
                onClick={() => addToCart(id)}
                icon={<AddToCartIcon className="w-5 h-5" fill="white" />}
                className='shadow'
            />
            <PrimaryButton
                title="View Details"
                onClick={() => router.push(`/product/${id}`)}
                icon={<ViewDetailIcons className='w-5 h-5' fill='white' />}
                className='shadow'
            />
        </div>
    )
}

export default ProductCardClientSide