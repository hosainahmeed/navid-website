'use client'
import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo, Variant } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { useGetSingleProductQuery } from "@/app/redux/services/productApis"
import { usePathname } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { getProductImages, getMainImage } from "@/app/utils/productUtils"

export default function ProductPage() {
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
    const [selectedImage, setSelectedImage] = useState<string>('')
    const pathname = usePathname()
    const id = pathname.split('/').pop()
    const [isVideo, setIsVideo] = useState<boolean>(false)
    const { data: productData, isLoading } = useGetSingleProductQuery(id as string, { skip: !id })

    // Update selected image when variant changes
    useEffect(() => {
        if (selectedVariant?.img?.length) {
            const mainImg = getMainImage(selectedVariant.img);
            setSelectedImage(mainImg);
            setIsVideo(mainImg?.includes('.mp4') || false);
        } else if (productData?.data?.banners?.length) {
            const mainBanner = getMainImage(productData.data.banners);
            setSelectedImage(mainBanner);
            setIsVideo(mainBanner?.includes('.mp4') || false);
        } else {
            setSelectedImage('');
            setIsVideo(false);
        }
    }, [selectedVariant, productData?.data?.banners]);

    const product = useMemo(() => {
        if (!productData?.data) return null

        const product = productData.data

        // Set first variant as default if none selected
        if (product.variants?.length > 0 && !selectedVariant) {
            setSelectedVariant(product.variants[0])
        } else if (product.variants?.length === 0) {
            setSelectedVariant(null)
        }

        const variantImages: Record<string, any> = {}
        const variantColors: string[] = []

        product.variants?.forEach((variant: Variant) => {
            const color = variant.color
            if (color && !variantColors.includes(color)) {
                variantColors.push(color)
                variantImages[color] = {
                    img: variant.img || [],
                    size: variant.size ? [variant.size] : [],
                    quantity: variant.quantity,
                    price: variant.price,
                    discount: variant.discount,
                    price_after_discount: variant.price_after_discount || variant.price
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
        if (!product) return []
        
        // Get images from selected variant first, then fall back to product banners
        return getProductImages(product, selectedVariant) || product.banners || []
    }, [isLoading, product, selectedVariant])
    return (
        <div className="min-h-screen">
            <main className="max-w-screen-2xl border-x-[0.2px] border-[var(--border-color)] px-3 space-y-6 mx-auto py-6">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery
                            isLoading={isLoading}
                            setIsVideo={setIsVideo}
                            isVideo={isVideo}
                            selectedVariantImage={selectedImage}
                            setSelectedVariantImage={setSelectedImage}
                            images={images}
                            productName={product?.name || ''}
                        />
                    </div>
                    <div>
                        {selectedVariant && (
                            <ProductInfo
                                isVideo={isVideo}
                                setIsVideo={setIsVideo}
                                selectedVariantImage={selectedImage}
                                product={product}
                                selectedVariant={selectedVariant}
                                onVariantChange={(variant: Variant) => {
                                    setSelectedVariant(variant)
                                }}
                                setSelectedVariantImage={setSelectedImage}
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
