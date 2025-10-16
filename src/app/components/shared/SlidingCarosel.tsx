'use client';
import { mockProductData } from '@/app/lib/mockProductData';
import { imageUrl } from '@/app/utils/imagePreview';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Marquee from 'react-fast-marquee';

function SlidingCarosel() {

    const item = mockProductData?.data

    const getDisplayImage = () => {
        if (!item?.variantImages || !item?.variantColors?.length) return ''

        const colorList = item.variantColors
        const colorKey = colorList[0]

        const variant = item.variantImages[colorKey]
        const imgList = variant?.img || []
        // console.log(variant)
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
                        .map((item, index) => (
                            <Link href={`/product/${item._id}`} key={index}>
                                <div
                                    className="flex gap-2 items-center justify-center mx-6"
                                >
                                    <Image
                                        src={imageUrl({ image: getDisplayImage() })}
                                        width={200}
                                        height={200}
                                        alt={item?.name}
                                        className="object-cover w-28 h-28 object-center aspect-square bg-gray-100 transition-all duration-500 ease-in-out"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-2xl">{item.name}</span>
                                        <h1 className="text-black font-bold text-xl whitespace-nowrap">
                                            $ {item.price} USD
                                        </h1>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </Marquee>
        </div>
    );
}

export default SlidingCarosel;
