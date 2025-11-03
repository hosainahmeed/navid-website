'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input, Radio, Select, Spin } from 'antd'
import debounce from 'lodash.debounce'
import { SearchOutlined } from '@ant-design/icons';
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { useGetAllProductQuery } from '@/app/redux/services/productApis'
import { useGetAllCategoryQuery } from '@/app/redux/services/catrgoryApis'
import Image from 'next/image'
import { IMAGE } from '@/app/constants/Image.index'
import { useProfileQuery } from '@/app/redux/services/profileApis'

const Page: React.FC = () => {
    const searchParams = useSearchParams()
    const initialSearch = searchParams.get('productName') || ''
    const initialWholeSale = searchParams.get('whole_sale') || ''
    const initialSubCategory = searchParams.get('subCategory') || ''

    const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [wholeSale, setWholeSale] = useState<boolean>(initialWholeSale === 'true')
    const [subCategory] = useState<string>(initialSubCategory)

    const { data: profileData } = useProfileQuery(undefined)
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
    useEffect(() => {
        if (profileData?.data?.tax_id === null || profileData?.data?.tax_id === '') {
            setWholeSale(false)
        } else {
            setWholeSale(true)
        }
    }, [profileData])

    const { data: categoryData, isLoading: categoryLoading, isFetching } = useGetAllCategoryQuery(undefined)
    const { data: productData, isLoading: productLoading } = useGetAllProductQuery({
        search: searchQuery,
        ...(selectedCategory !== '' && { category: selectedCategory }),
        limit: 9999,
        ...(wholeSale && { whole_sale: wholeSale }),
        ...(subCategory !== '' && { sub_category: subCategory })
    })

    const products = productData?.data || []
    const categories =
        categoryData?.data?.map((item: any) => ({
            value: item?._id,
            label: item?.name,
        })) || []

    return (
        <Spin spinning={productLoading || categoryLoading || isFetching}>
            <div className='max-w-screen-2xl border-x-[0.2px] mx-auto p-2'>
                <SectionHeader title='All Products' className='my-0 p-2' />
                <div className='grid grid-cols-2 lg:grid-cols-3'>
                    <div className='flex items-center border justify-center'>
                        <Radio.Group onChange={(e) => setWholeSale(e.target.value)} value={wholeSale}>
                            <Radio value={false}>All</Radio>
                            <Radio disabled={profileData?.data?.tax_id === null || profileData?.data?.tax_id === ''} value={true}>Whole Sale</Radio>
                        </Radio.Group>
                    </div>
                    <div className='relative w-full lg:order-2 order-3 lg:col-span-1 col-span-2 flex-1'>
                        <Input
                            prefix={isFetching ? <Spin size='small' /> : <SearchOutlined />}
                            allowClear
                            placeholder='Search products'
                            onChange={handleSearchChange}
                            defaultValue={searchQuery}
                            className='border-[0.2px] border-[var(--border-color)] p-4 py-6 font-bold text-[28px] rounded-none'
                            style={{ height: '64px' }}
                        />
                    </div>
                    <div className='lg:order-1 w-full order-2  flex-1'>
                        <Select
                            loading={categoryLoading || isFetching}
                            options={categories}
                            onChange={(value) => setSelectedCategory(value)}
                            placeholder='Select category'
                            style={{
                                height: '64px',
                                fontSize: '20px',
                                width: '100%',
                                fontWeight: 'bold',
                            }}
                            className=''
                            allowClear
                        />
                    </div>
                </div>

                <div >
                    {productLoading || isFetching ? (
                        <div className='w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-300'>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div className='w-full p-2 border-[0.2px] border-[var(--border-color)] min-h-64 bg-white' key={index} >
                                    <Image
                                        src={IMAGE.placeholderImg}
                                        alt='placeholder'
                                        placeholder='blur'
                                        blurDataURL={IMAGE.placeholderImg.blurDataURL}
                                        width={IMAGE.placeholderImg.width}
                                        height={IMAGE.placeholderImg.height}
                                        className='w-auto h-28 border-[0.2px] border-[var(--border-color)]'
                                    />
                                    <div className='flex flex-col items-start justify-center h-28'>
                                        <div className='w-[90%] animate-pulse border-[0.2px] border-[var(--border-color)] h-4 bg-gray-200 mb-2' />
                                        <div className='w-[80%] animate-pulse border-[0.2px] border-[var(--border-color)] h-4 bg-gray-200 mb-2' />
                                        <div className='w-[20%] animate-pulse border-[0.2px] border-[var(--border-color)] h-6 mt-2 bg-gray-200 mb-2' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className='w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-300'>
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
        </Spin>
    )
}

export default Page
