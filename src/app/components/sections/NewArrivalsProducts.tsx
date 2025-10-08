import { productData } from '@/app/constants/exmpleData'
import React from 'react'
import ProductCard from '../products/ProductCard'

function NewArrivalsProducts() {
    return (
        <div
            className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
            {productData.slice(0, 4).map((item) => <ProductCard key={item._id} item={item} />)}
        </div>
    )
}

export default NewArrivalsProducts