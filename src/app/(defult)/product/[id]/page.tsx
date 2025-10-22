'use client'
import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { useGetSingleProductQuery } from "@/app/redux/services/productApis"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function ProductPage() {
    const [selectedVariantImage, setSelectedVariantImage] = useState<any>(null)
    const pathname = usePathname()
    const id = pathname.split('/').pop()
    const { data: productData, isLoading } = useGetSingleProductQuery(id as string, { skip: !id })
    if (isLoading) return <h1>Loading...</h1>

    const images = productData?.data?.banner
    return (
        <div className="min-h-screen">
            <main className="max-w-screen-2xl border-x border-[var(--border-color)] px-3 space-y-6 mx-auto py-6">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery setSelectedVariantImage={setSelectedVariantImage} selectedVariantImage={selectedVariantImage} images={images} productName={productData?.data?.name} />
                    </div>
                    <div>
                        <ProductInfo selectedVariantImage={selectedVariantImage} product={productData?.data} setSelectedVariantImage={setSelectedVariantImage} />
                    </div>
                </div>
                <div className="mt-16 lg:mt-24">
                    <RelatedProducts products={productData?.related_product} />
                </div>
            </main>
        </div>
    )
}
