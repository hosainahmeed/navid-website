'use client'
import React from 'react'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'

function NewArrivalsProducts() {
    const { data: productData } = useGetAllProductQuery(undefined)
    return (
        <>
            <SectionHeader
                title="New Arrivals"
                button={true}
                buttonText='Explore All Products'
                routes='/shop'
                className='px-2 my-0'
            />
            <div className='max-w-screen-2xl mx-auto'>
                <div
                    className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 border border-[var(--border-color)] lg:grid-cols-3 xl:grid-cols-4'>
                    {productData?.data?.length > 0 ?
                        productData?.data?.slice(0, 6).map((item: Iproduct, i: number) => <ProductCard key={i} item={item} />) :
                        <div className='col-span-full min-h-[400px] h-full flex items-center justify-center text-center text-gray-600 py-10'>
                            No products available
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default NewArrivalsProducts