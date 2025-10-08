import Image from "next/image"
import Link from "next/link"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RelatedProduct } from "@/app/types/product"
import { imageUrl } from "@/app/utils/imagePreview"
import ProductCardClientSide from "./ProductCardClientSide"

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) return null
    console.log(products)
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Related Products</h2>
                <p className="text-muted-foreground">You might also be interested in these products</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                    const hasDiscount = product.previous_price > product.price
                    const discountPercentage = hasDiscount
                        ? Math.round(((product.previous_price - product.price) / product.previous_price) * 100)
                        : 0

                    return (
                        <div
                            className="w-full shadow inset-0 z-0 border bg-[#FFFFFF] border-gray-300 rounded transition-transform duration-300 group p-3"
                        >
                            <figure className="overflow-hidden shadow rounded-lg relative mb-1">
                                <Image
                                    width={400}
                                    height={600}
                                    src={imageUrl({ image: product.banner[0] })}
                                    alt={product.name}
                                    className="object-cover w-full h-full object-center aspect-square bg-gray-400" />
                                <span className="absolute top-2 left-2 px-3 py-1 bg-gray-950/20 backdrop-blur-sm text-xs rounded-full text-gray-50">{product?.category?.name}</span>
                            </figure>
                            {hasDiscount && (
                                <Badge variant="destructive" className="absolute right-2 top-2">
                                    {discountPercentage}% OFF
                                </Badge>
                            )}
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-foreground line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                                        {hasDiscount && (
                                            <span className="text-sm text-muted-foreground line-through">
                                                ${product.previous_price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <ProductCardClientSide id={product._id} />
                            </CardContent>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
