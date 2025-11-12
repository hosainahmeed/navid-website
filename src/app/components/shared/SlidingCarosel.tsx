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
                                            src={imageUrl({ image: item?.img })}
                                            width={200}
                                            height={200}
                                            alt={item?.name || ''}
                                            className="object-contain w-28 h-28 object-center aspect-square transition-all duration-500 ease-in-out"
                                        />
                                        <div className="flex flex-col">
                                        <div className='px-2 py-1 bg-black text-white text-sm'>Trending</div>
                                            <span className="text-sm line-clamp-1">{item?.name}</span>
                                            <h1 className="text-black font-bold text-sm whitespace-nowrap">
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
