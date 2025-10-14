'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'
import { ArrowRightIcon } from 'lucide-react'
import { Iproduct } from '@/app/types/product'

function NewArrivalsProducts() {
    const [allProducts, setAllProducts] = useState<Iproduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Iproduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
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
    return (
        <>
            <SectionHeader
                title="New Arrivals"
                description="Explore our wide range of products"
                button={true}
                buttonText='Explore All Products'
                icon={<ArrowRightIcon className="w-6 h-6" />}
                buttonClassName='bg-[var(--color-primary)] text-white'
                routes='/shop'
            />
            <div
                className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filteredProducts.slice(0, 6).map((item) => <ProductCard key={item._id} item={item} />)}
            </div>
        </>
    )
}

export default NewArrivalsProducts