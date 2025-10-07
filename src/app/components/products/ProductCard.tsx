import React from 'react'
import { IMAGE } from '@/app/constants/Image.index'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide';
import { Iproduct } from '@/app/types/product';

function ProductCard({ item }: { item: Iproduct }) {
    return (
        <div
            style={{
                backgroundImage: `
    radial-gradient(125% 125% at 0% 4%, #D78FEE 10%, #ffffff 100%)
      `,
                backgroundSize: "100% 100%",
            }}

            className="w-full shadow inset-0 z-0 border bg-[#FFFFFF] border-gray-300 rounded transition-transform duration-300 group p-3">
            <figure className="overflow-hidden shadow rounded-lg relative mb-1">
                <Image src={IMAGE.placeholderProductImage} alt="" className="object-cover object-center aspect-square bg-gray-400" />
                <span className="absolute top-2 left-2 px-3 py-1 bg-gray-950/20 backdrop-blur-sm text-xs rounded-full text-gray-50">{item?.category?.name}</span>
            </figure>
            <div className='flex gap-2 mt-2'>
                {
                    Object.entries(item.variantImages).map(([color,]) => (
                        <div key={color} style={{ backgroundColor: color }} className={`w-4 h-4 opacity-50 rounded shadow `} />
                    ))
                }
            </div>
            <p className="text-xl font-semibold mt-2">
                {item?.name}
            </p>
            <p className="line-clamp-2 text-sm opacity-50 mt-1 group-hover:opacity-90 transition-opacity duration-300">
                {item?.description}
            </p>
            <p className="text-xl font-semibold mt-2">
                $ {item?.price}
            </p>
            <ProductCardClientSide />
        </div>
    )
}

export default ProductCard