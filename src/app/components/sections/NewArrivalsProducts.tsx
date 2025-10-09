import { productData } from '@/app/constants/exmpleData'
import React from 'react'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'
import { ArrowRightIcon } from 'lucide-react'

function NewArrivalsProducts() {
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
                {productData.slice(0, 6).map((item) => <ProductCard key={item._id} item={item} />)}
            </div>
        </>
    )
}

export default NewArrivalsProducts