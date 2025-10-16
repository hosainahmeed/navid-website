'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MdCancel } from 'react-icons/md'
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { Iproduct } from '@/app/types/product'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

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
        <div className='max-w-screen-2xl mx-auto px-2'>
            {/* Section header */}
            <SectionHeader
                title='All Products'
                description="Looking for a hookah? We've got you covered! We carry a wide variety of hookah products, from traditional to modern designs. Whether you're a beginner or a pro, you'll find the perfect hookah for you. We also stock accessories like coals, bowls, and mouthpieces—everything you need for the ultimate hookah experience."
            />

            {/* Search & Filter Controls */}
            <div className='flex justify-between mb-3 gap-4 items-center flex-wrap'>
                {/* Search input */}
                <div className='w-full sm:w-auto flex-1 relative'>
                    <Input
                        type='text'
                        placeholder='Search products'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='pr-8'
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
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className='w-[220px]'>
                        <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='hookah'>Hookah</SelectItem>
                        <SelectItem value='accessories'>Accessories</SelectItem>
                    </SelectContent>
                </Select>
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
