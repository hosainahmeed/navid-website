'use client'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide'
import { Iproduct } from '@/app/types/product'
import { CardContent } from '@/components/ui/card'
import { imageUrl } from '@/app/utils/imagePreview'
import Link from 'next/link'
import { Tooltip } from 'antd'

function ProductCard({ item }: { item: Iproduct }) {
    const [isHovered, setIsHovered] = useState(false)
    console.log(item?.img)
    return (
        <div
            className="w-full last:border-r shadow transition-transform duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${item?._id}`}>
                <figure className="overflow-hidden h-fit md:h-64 aspect-square w-full relative">
                    {item?.img ? (
                        <Image
                            src={imageUrl({ image: item?.img })}
                            width={500}
                            height={500}
                            alt={item?.name}
                            className="object-contain w-full h-full object-center aspect-square bg-white transition-all duration-500 ease-in-out"
                        />
                    ) : (
                        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}


                    <span className="absolute top-2 left-2 px-3 py-1 line-clamp-1 bg-gray-950/70 backdrop-blur-sm text-xs rounded-full text-gray-50">
                        {item?.category?.name}
                    </span>
                </figure>
            </Link>
            <CardContent className="p-4 relative bg-[#EDEDED] border-t-[0.2px] border-[var(--border-color)]">
                <Link href={`/product/${item?._id}`}>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-foreground line-clamp-1">
                            {item?.name}
                        </h3>

                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-foreground">
                                ${item?.price.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </Link>
                <ProductCardClientSide className='md:block hidden' isHovered={isHovered} id={item?._id} />
            </CardContent>
        </div>
    )
}

export default ProductCard