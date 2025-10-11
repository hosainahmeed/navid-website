'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MdCancel } from 'react-icons/md'
import SectionHeader from '@/app/components/shared/SectionHeader'
import ProductCard from '@/app/components/products/ProductCard'
import { productData } from '@/app/constants/exmpleData'
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
    const [filteredProducts, setFilteredProducts] = useState<Iproduct[]>(productData)
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            let updatedProducts = productData

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
    }, [searchQuery, selectedCategory])

    return (
        <div className='max-w-7xl mx-auto px-2'>
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
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 6).map((item) => (
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
