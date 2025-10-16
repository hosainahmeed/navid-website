'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip } from "antd"
import SectionHeader from "../shared/SectionHeader"
import { imageUrl } from "@/app/utils/imagePreview"
import ProductCardClientSide from "./ProductCardClientSide"
import { RelatedProduct } from "@/app/types/product"

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Related Products"
                button={true}
                buttonText="See More"
                routes="/shop"
                className="px-2"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => {
                    const [isHovered, setIsHovered] = useState(false)
                    const hasDiscount = product.previous_price > product.price
                    const discountPercentage = hasDiscount
                        ? Math.round(
                            ((product.previous_price - product.price) /
                                product.previous_price) * 100
                        )
                        : 0

                    return (
                        <div
                            key={product._id}
                            className="w-full shadow border bg-white border-[var(--border-color)] transition-transform duration-300 group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Product Image */}
                            <Link href={`/product/${product._id}`}>
                                <figure className="overflow-hidden h-72 aspect-square w-full border-y border-[var(--border-color)] shadow relative mb-1">
                                    {product?.banner?.length ? (
                                        <Image
                                            src={imageUrl({ image: product.banner[0] })}
                                            width={500}
                                            height={500}
                                            alt={product.name}
                                            className="object-cover w-full h-full object-center aspect-square bg-gray-100 transition-all duration-500 ease-in-out"
                                        />
                                    ) : (
                                        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    {product?.category?.name && (
                                        <span className="absolute top-2 left-2 px-3 py-1 line-clamp-1 bg-gray-950/70 backdrop-blur-sm text-xs rounded-full text-gray-50">
                                            {product.category.name}
                                        </span>
                                    )}

                                    {/* Discount Badge */}
                                    {hasDiscount && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute right-2 top-2"
                                        >
                                            {discountPercentage}% OFF
                                        </Badge>
                                    )}
                                </figure>
                            </Link>

                            {/* Card Content */}
                            <CardContent className="p-4 relative">
                                {/* If variants exist */}
                                {product.variantColors?.length > 0 && (
                                    <div className="w-fit flex gap-1 mb-2">
                                        {product.variantColors.map((color, index) => (
                                            <Tooltip key={index} title={color}>
                                                <div
                                                    style={{
                                                        backgroundColor: color,
                                                        border: '1px solid gray',
                                                    }}
                                                    className="w-4 h-4 rounded-full"
                                                />
                                            </Tooltip>
                                        ))}
                                    </div>
                                )}

                                <Link href={`/product/${product._id}`}>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-foreground line-clamp-2">
                                            {product.name}
                                        </h3>

                                        {/* Price Section */}
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-foreground">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-sm text-red-500 line-through">
                                                    ${product.previous_price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>

                                {/* Hover Action Buttons */}
                                <ProductCardClientSide
                                    isHovered={isHovered}
                                    id={product._id}
                                />
                            </CardContent>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
