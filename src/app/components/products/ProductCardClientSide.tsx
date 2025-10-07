'use client'
import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import SecondaryButton from '../buttons/SecondaryButton'
import { AddToCartIcon, ViewDetailIcons } from '@/app/constants/icon.index'

function ProductCardClientSide() {
    return (
        <div className='flex items-center mt-3 justify-between gap-2'>
            <PrimaryButton
                title="Add to Cart"
                onClick={() => { }}
                icon={<AddToCartIcon className="w-5 h-5" fill="white" />}
            />
            <SecondaryButton icon={<ViewDetailIcons className='w-5 h-5' fill='var(--color-primary-dark)' />} title="View Details" onClick={() => { }} />
        </div>
    )
}

export default ProductCardClientSide