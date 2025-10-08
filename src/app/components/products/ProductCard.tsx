import React from 'react'
import { IMAGE } from '@/app/constants/Image.index'
import Image from 'next/image'
import ProductCardClientSide from './ProductCardClientSide';
import { Iproduct } from '@/app/types/product';
import { CardContent } from '@/components/ui/card';

function ProductCard({ item }: { item: Iproduct }) {
    const hasDiscount = item?.previous_price > item?.price

    return (
        <div
            className="w-full shadow inset-0 z-0 border bg-[#FFFFFF] border-gray-300 rounded transition-transform duration-300 group p-3">
            <figure className="overflow-hidden shadow rounded-lg relative mb-1">
                <Image
                    src='https://images.unsplash.com/photo-1505740106531-4243f3831c78?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    width={400}
                    height={400}
                    alt=""
                    className="object-cover w-full h-full object-center aspect-square bg-gray-400" />
                <span className="absolute top-2 left-2 px-3 py-1 line-clamp-1 bg-gray-950/20 backdrop-blur-sm text-xs rounded-full text-gray-50">{item?.category?.name}</span>
            </figure>
            <CardContent className="p-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                        {item?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground h-12 line-clamp-2">{item?.description}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">${item?.price.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${item?.previous_price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
                <ProductCardClientSide id={item?._id} />
            </CardContent>
        </div>
    )
}

export default ProductCard