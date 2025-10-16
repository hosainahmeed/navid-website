'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'
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
                button={true}
                buttonText='Explore All Products'
                routes='/shop'
                className='px-2'
            />
            <div className='max-w-screen-2xl mx-auto px-1'>
                <div
                    className='w-full mx-auto grid grid-cols-1 sm:grid-cols-2 border border-[var(--border-color)] lg:grid-cols-2 xl:grid-cols-4'>
                    {filteredProducts.slice(0, 6).map((item) => <ProductCard key={item._id} item={item} />)}
                </div>
            </div>
        </>
    )
}

export default NewArrivalsProducts