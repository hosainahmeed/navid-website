'use client'
import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo, Variant } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { useGetSingleProductQuery } from "@/app/redux/services/productApis"
import { usePathname } from "next/navigation"
import { useState, useMemo } from "react"

export default function ProductPage() {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
    const [selectedVariantImage, setSelectedVariantImage] = useState<string>('')
    const pathname = usePathname()
    const id = pathname.split('/').pop()
    const [isVideo, setIsVideo] = useState<boolean>(false)
    const { data: productData, isLoading } = useGetSingleProductQuery(id as string, { skip: !id })

    const product = useMemo(() => {
        if (!productData?.data) return null

        const product = productData.data

        if (product.variants?.length > 0) {
            const firstVariant = product.variants[0]
            if (!selectedVariant) {
                setSelectedVariant(firstVariant)
                setSelectedVariantImage(firstVariant.img?.[0] || '')
                setIsVideo(firstVariant.img?.[0]?.includes('.mp4') || false)
            }
        } else {
            setSelectedVariant(null)
            setSelectedVariantImage('')
            setIsVideo(false)
        }

        const variantImages: Record<string, any> = {}
        const variantColors: string[] = []

        product.variants?.forEach((variant: Variant) => {
            const color = variant.color
            if (color && !variantColors.includes(color)) {
                variantColors.push(color)
                variantImages[color] = {
                    img: variant.img || [],
                    size: [variant.size],
                    quantity: variant.quantity,
                    price: variant.price,
                    discount: variant.discount,
                    price_after_discount: variant.price_after_discount
                }
            }
        })

        return {
            ...product,
            variantImages,
            variantColors,
            variants: product.variants?.map((variant: Variant) => ({
                ...variant,
                color: variant.color,
                size: variant.size,
                price: variant.price,
                discount: variant.discount || 0,
                price_after_discount: variant.price_after_discount || variant.price,
                quantity: variant.quantity || 0
            }))
        }
    }, [productData?.data])

    const images = useMemo(() => {
        if (isLoading) return ['']
        return product?.banners || []
    }, [isLoading, product])
    return (
        <div className="min-h-screen">
            <main className="max-w-screen-2xl border-x-[0.2px] border-[var(--border-color)] px-3 space-y-6 mx-auto py-6">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery
                            isLoading={isLoading}
                            setIsVideo={setIsVideo}
                            isVideo={isVideo}
                            setSelectedVariantImage={setSelectedVariantImage}
                            selectedVariantImage={selectedVariantImage}
                            images={images}
                            productName={product?.name || ''}
                        />
                    </div>
                    <div>
                        {selectedVariant && (
                            <ProductInfo
                                isVideo={isVideo}
                                setIsVideo={setIsVideo}
                                selectedVariantImage={selectedVariantImage}
                                product={product}
                                selectedVariant={selectedVariant}
                                onVariantChange={(variant: Variant) => {
                                    setSelectedVariant(variant)
                                    setSelectedVariantImage(variant.img?.[0] || '')
                                    setIsVideo(variant.img?.[0]?.includes('.mp4') || false)
                                }}
                                setSelectedVariantImage={setSelectedVariantImage}
                            />
                        )}
                    </div>
                </div>
                <div className="mt-16 lg:mt-24">
                    <RelatedProducts products={productData?.related_product || []} />
                </div>
            </main>
        </div>
    )
}
