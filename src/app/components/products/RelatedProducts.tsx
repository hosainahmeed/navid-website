'use client'
import SectionHeader from "../shared/SectionHeader"
import { Iproduct } from "@/app/types/product"
import ProductCard from "./ProductCard"

interface RelatedProductsProps {
    products: Iproduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (Array.isArray(products) && products.length === 0) return null

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Related Products"
                button={true}
                buttonText="See More"
                routes="/shop"
                className="px-2"
            />

            <div className="w-full mx-auto grid grid-cols-2 border border-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-300">
                {Array.isArray(products) && products.map((product: Iproduct) => {
                    return <ProductCard key={product._id} item={product} />
                })}
            </div>
        </section>
    )
}
