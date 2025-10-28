'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Select, Spin } from 'antd'
import debounce from 'lodash.debounce'
import { SearchOutlined } from '@ant-design/icons';
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import Image from 'next/image'
import { IMAGE } from '@/app/constants/Image.index'

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

    const { data: categoryData, isLoading: categoryLoading, isFetching } = useGetAllCategoryQuery(undefined)
    const { data: productData, isLoading: productLoading } = useGetAllProductQuery({
        search: searchQuery,
        category: selectedCategory,
    })

    const products = productData?.data || []
    const categories =
        categoryData?.data?.map((item: any) => ({
            value: item?._id,
            label: item?.name,
        })) || []

    return (
        <div className='max-w-screen-2xl border-x mx-auto p-2'>
            <SectionHeader title='All Products' className='my-0 p-2' />
            <div className='flex justify-between items-center flex-row'>
                <div className='relative w-full flex-1'>
                    <Input
                        prefix={isFetching ? <Spin size='small' /> : <SearchOutlined />}
                        allowClear
                        placeholder='Search products'
                        onChange={handleSearchChange}
                        defaultValue={searchQuery}
                        className='border border-[var(--border-color)] p-4 py-6 font-bold text-[28px] rounded-none'
                        style={{ height: '64px' }}
                    />
                </div>

                <Select
                    loading={categoryLoading || isFetching}
                    options={categories}
                    onChange={(value) => setSelectedCategory(value)}
                    placeholder='Select category'
                    style={{
                        height: '64px',
                        minWidth: '150px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}
                    className=''
                    allowClear
                />
            </div>

            <div >
                {productLoading || isFetching ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div className='w-full p-2 border border-[var(--border-color)] min-h-64 bg-white' key={index} >
                                <Image
                                    src={IMAGE.placeholderImg}
                                    alt='placeholder'
                                    placeholder='blur'
                                    blurDataURL={IMAGE.placeholderImg.blurDataURL}
                                    width={IMAGE.placeholderImg.width}
                                    height={IMAGE.placeholderImg.height}
                                    className='w-auto h-28 border border-[var(--border-color)]'
                                />
                                <div className='flex flex-col items-start justify-center h-28'>
                                    <div className='w-[90%] animate-pulse border border-[var(--border-color)] h-4 bg-gray-200 mb-2' />
                                    <div className='w-[80%] animate-pulse border border-[var(--border-color)] h-4 bg-gray-200 mb-2' />
                                    <div className='w-[20%] animate-pulse border border-[var(--border-color)] h-6 mt-2 bg-gray-200 mb-2' />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        {products.map((item: Iproduct) => <ProductCard key={item?._id} item={item} />)}
                    </div>
                ) : (
                    <div className='flex p-12 items-center justify-center'>
                        <Image
                            src={IMAGE.nodata}
                            alt='nodata'
                            placeholder='blur'
                            blurDataURL={IMAGE.nodata.blurDataURL}
                            width={IMAGE.nodata.width}
                            height={IMAGE.nodata.height}
                            className='w-xl'
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
