'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MdCancel } from 'react-icons/md'
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { Input, Select } from 'antd'

const Page: React.FC = () => {
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState<string>(
        searchParams.get('productName') || ''
    )
    const [filteredProducts, setFilteredProducts] = useState<Iproduct[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const [allProducts, setAllProducts] = useState<Iproduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/mockData.json', { cache: 'no-store' })
                if (!response.ok) throw new Error(`Failed to load mockData.json: ${response.status}`)
                const result = await response.json()
                const items: Iproduct[] = result?.data ?? []
                setAllProducts(items)
                setFilteredProducts(items)
            } catch (err: any) {
                setError(err?.message || 'Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            let updatedProducts = allProducts

            if (searchQuery.trim() !== '') {
                updatedProducts = updatedProducts.filter((item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            }

            if (selectedCategory) {
                updatedProducts = updatedProducts.filter(
                    (item) => item.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
                )
            }

            setFilteredProducts(updatedProducts)
        }, 300)

        return () => clearTimeout(timeout)
    }, [searchQuery, selectedCategory, allProducts])

    return (
        <div className='max-w-screen-2xl border-x mx-auto px-2'>
            {/* Section header */}
            <SectionHeader
                title='All Products'
                className='my-0 p-2'
            />

            {/* Search & Filter Controls */}
            <div className='flex justify-between items-center md:flex-row flex-col flex-wrap'>
                {/* Search input */}
                <div className='w-full sm:w-full flex-1 relative'>
                    <Input
                        type='text'
                        placeholder='Search products'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border border-[var(--border-color)] rounded-none p-4 py-6'
                        style={{
                            borderRadius: '0px',
                            width: '100%',
                            height: '64px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            border: '1px solid var(--border-color)',
                        }}
                    />
                    {searchQuery !== '' && (
                        <MdCancel
                            onClick={() => setSearchQuery('')}
                            className='absolute right-2 top-2 text-gray-500 hover:text-gray-700 cursor-pointer'
                            size={20}
                        />
                    )}
                </div>

                {/* Category select */}
                <Select
                    options={[
                        { value: 'hookah', label: 'Hookah' },
                        { value: 'accessories', label: 'Accessories' },
                    ]}
                    onChange={(value) => setSelectedCategory(value)}
                    placeholder='Select category'
                    style={{
                        height: '64px',
                        width: '200px',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        border: '1px solid var(--border-color)'
                    }}
                    className='!w-full md:!w-auto'
                />
            </div>

            {/* Product grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4'>
                {loading && (
                    <div className='col-span-full text-center text-gray-600 py-10'>Loading...</div>
                )}
                {error && !loading && (
                    <div className='col-span-full text-center text-red-600 py-10'>{error}</div>
                )}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCard key={item._id} item={item} />
                    ))
                ) : (
                    <div className='col-span-full text-center text-gray-600 py-10'>
                        No products found
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
