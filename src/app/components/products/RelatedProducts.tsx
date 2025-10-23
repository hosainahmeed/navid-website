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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.isArray(products) && products.map((product: Iproduct) => {
                    return <ProductCard key={product._id} item={product} />
                })}
            </div>
        </section>
    )
}
