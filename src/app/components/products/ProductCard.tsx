import React from 'react'
import { IMAGE } from '@/app/constants/Image.index'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide';
import { Iproduct } from '@/app/types/product';



function ProductCard({ item }: { item: Iproduct }) {
    return (
        <a href="#" className="w-96 border bg-[#FFFFFF] border-gray-300 rounded transition-transform duration-300 group p-5">
            <figure className="overflow-hidden rounded-lg relative mb-1">
                <Image src={IMAGE.placeholderProductImage} alt="" className="object-cover object-center aspect-square bg-gray-400" />
                <span className="absolute top-2 left-2 px-3 py-1 bg-gray-950/20 backdrop-blur-sm text-xs rounded-full text-gray-50">Nature</span>
            </figure>
            <p className="text-xl font-semibold mt-2">
                {item?.name}
            </p>
            <p className="line-clamp-2 text-sm opacity-50 mt-1 group-hover:opacity-90 transition-opacity duration-300">
                {item?.description}
            </p>
            <ProductCardClientSide />
        </a>
    )
}

export default ProductCard