'use client'
import React, { memo } from 'react'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { Card } from 'antd'

function NewArrivalsProducts() {
    const { data: productData, isLoading } = useGetAllProductQuery({ limit: 12 })
    return (
        <>
            <SectionHeader
                title="New Arrivals"
                button={true}
                buttonText='Explore All Products'
                routes='/shop'
                className='px-2 my-3'
            />
            <div className='max-w-screen-2xl mx-auto'>
                {isLoading ?
                    <div className="grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i} loading />
                        ))}
                    </div>
                    :
                    <div className='w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-[var(--border-color)]'>
                        {productData?.data?.length > 0 ? (
                            productData?.data?.map((item: Iproduct, i: number) => (
                                <ProductCard key={i} item={item} />
                            ))
                        ) : (
                            <div className='col-span-full min-h-[400px] h-full flex items-center justify-center text-center text-gray-600 py-10'>
                                No products available
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default memo(NewArrivalsProducts)