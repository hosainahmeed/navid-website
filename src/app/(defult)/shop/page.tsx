'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MdCancel } from 'react-icons/md'
import { Input, Select } from 'antd'
import debounce from 'lodash.debounce'

import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'

const Page: React.FC = () => {
    const searchParams = useSearchParams()
    const initialSearch = searchParams.get('productName') || ''
    
    const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchQuery(value.trim())
            }, 500),
        []
    )

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            debouncedSearch(value)
        },
        [debouncedSearch]
    )

    const { data: categoryData, isLoading: categoryLoading } = useGetAllCategoryQuery(undefined)
    const { data: productData, isLoading: productLoading } = useGetAllProductQuery({
        search: searchQuery,
        category: selectedCategory,
    })

    const products = productData?.data || []
    const categories =
        categoryData?.data?.map((item: any) => ({
            value: item._id,
            label: item.name,
        })) || []

    return (
        <div className='max-w-screen-2xl border-x mx-auto p-2'>
            {/* Section header */}
            <SectionHeader title='All Products' className='my-0 p-2' />

            {/* Search & Filter Controls */}
            <div className='flex justify-between items-center md:flex-row flex-col'>
                {/* Search input */}
                <div className='relative w-full flex-1'>
                    <Input
                        placeholder='Search products'
                        onChange={handleSearchChange}
                        defaultValue={searchQuery}
                        className='border border-[var(--border-color)] p-4 py-6 font-bold text-[28px] rounded-none'
                        style={{ height: '64px' }}
                    />
                    {searchQuery && (
                        <MdCancel
                            onClick={() => {
                                setSearchQuery('')
                                debouncedSearch('')
                            }}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer'
                            size={24}
                        />
                    )}
                </div>

                {/* Category select */}
                <Select
                    loading={categoryLoading}
                    options={categories}
                    onChange={(value) => setSelectedCategory(value)}
                    placeholder='Select category'
                    style={{
                        height: '64px',
                        minWidth: '200px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                    className='!w-full md:!w-auto'
                    allowClear
                />
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {productLoading ? (
                    <div className='col-span-full text-center text-gray-600 py-10'>
                        Loading products...
                    </div>
                ) : products.length > 0 ? (
                    products.map((item: Iproduct) => <ProductCard key={item._id} item={item} />)
                ) : (
                    <div className='col-span-full min-h-[400px] h-full flex items-center justify-center text-center text-gray-600 py-10'>
                        No products found
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
