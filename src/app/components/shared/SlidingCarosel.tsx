'use client';
import { useGetAllProductQuery } from '@/app/redux/services/productApis';
import { Iproduct } from '@/app/types/product';
import { imageUrl } from '@/app/utils/imagePreview';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { memo } from 'react';
import Marquee from 'react-fast-marquee';

function SlidingCarosel() {
    const { data: productData, isLoading } = useGetAllProductQuery(undefined)
    const item = productData?.data

    const getDisplayImage = (item: Iproduct) => {
        if (!item?.variantImages || !item?.variantColors?.length) return ''

        const colorList = item.variantColors
        const colorKey = colorList[0]

        const variant = item.variantImages[colorKey]
        const imgList = variant?.img || []
        return imgList[0] || ''
    }

    return (
        <div className='border border-[var(--border-color)]'>
            <Marquee
                gradient={false}
                speed={150}
                direction='left'
                pauseOnHover={true}
            >
                <div className="flex items-center">
                    {Array(12)
                        .fill(item)
                        .flat()
                        .map((item: Iproduct, index: number) => (
                            <Link href={`/product/${item?._id}`} key={index}>
                                {isLoading ?
                                    <div className="flex gap-2 items-center justify-center mx-6">
                                        <Skeleton.Image />
                                        <Skeleton.Input />
                                    </div>
                                    : <div
                                        className="flex gap-2 p-2 border-x border-[var(--border-color)] items-center justify-center px-12"
                                    >
                                        <Image
                                            src={imageUrl({ image: getDisplayImage(item) })}
                                            width={200}
                                            height={200}
                                            alt={item?.name || ''}
                                            className="object-contain w-28 h-28 object-center aspect-square transition-all duration-500 ease-in-out"
                                        />
                                        <div className="flex flex-col">
                                            <span className="text-2xl">{item?.name}</span>
                                            <h1 className="text-black font-bold text-xl whitespace-nowrap">
                                                $ {item?.price} USD
                                            </h1>
                                        </div>
                                    </div>}
                            </Link>
                        ))}
                </div>
            </Marquee>
        </div>
    );
}

export default memo(SlidingCarosel);
