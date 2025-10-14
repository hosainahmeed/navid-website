'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide'
import { Iproduct } from '@/app/types/product'
import { CardContent } from '@/components/ui/card'
import { imageUrl } from '@/app/utils/imagePreview'
import Link from 'next/link'
import { Tooltip } from 'antd'

function ProductCard({ item }: { item: Iproduct }) {
    const [isHovered, setIsHovered] = useState(false)
    const hasDiscount = item?.previous_price > item?.price


    const getDisplayImage = () => {
        if (!item?.variantImages || !item?.variantColors?.length) return ''

        const colorList = item.variantColors
        const colorKey = isHovered
            ? colorList[1] || colorList[0]
            : colorList[0]

        const variant = item.variantImages[colorKey]
        const imgList = variant?.img || []
        // console.log(variant)
        return imgList[0] || ''
    }

    const getDisplaySize = () => {
        if (!item?.variantColors?.length) return []
        const sizeList = item?.variantColors || []
        return sizeList || []
    }

    const productImage = getDisplayImage()
    const productSize = getDisplaySize()
    return (

        <div
            className="w-full shadow border bg-white border-gray-300 rounded transition-transform duration-300 group p-3 hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${item?._id}`}>
                <figure className="overflow-hidden shadow rounded-lg relative mb-1">
                    {productImage ? (
                        <Image
                            src={imageUrl({ image: productImage })}
                            width={400}
                            height={400}
                            alt={item?.name}
                            className="object-cover w-full h-full object-center aspect-square bg-gray-100 transition-all duration-500 ease-in-out"
                        />
                    ) : (
                        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}

                    {/* category badge */}
                    <span className="absolute top-2 left-2 px-3 py-1 line-clamp-1 bg-gray-950/70 backdrop-blur-sm text-xs rounded-full text-gray-50">
                        {item?.category?.name}
                    </span>
                </figure>
            </Link>
            <CardContent className="p-4">
                <div className='w-fit flex gap-1'>
                    {productSize.map((size, index) =>
                        <Tooltip
                            key={index}
                            title={size}
                        >
                            <div
                                style={{
                                    backgroundColor: size,
                                    border: '1px solid gray',
                                }}
                                className='w-4 h-4 rounded-full'
                            />
                        </Tooltip>
                    )}
                </div>
                <Link href={`/product/${item?._id}`}>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-foreground line-clamp-2">
                            {item?.name}
                        </h3>
                        {/* price section */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-foreground">
                                ${item?.price.toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-red-500 line-through">
                                    ${item?.previous_price.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
                <ProductCardClientSide id={item?._id} />
            </CardContent>
        </div>
    )
}

export default ProductCard
