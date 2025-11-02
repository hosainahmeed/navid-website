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
    const [isVideo, setIsVideo] = useState<boolean>(false)
    const { data: productData, isLoading } = useGetSingleProductQuery(id as string, { skip: !id })
    // if (isLoading)
    //     return (
    //         <div className="w-full h-full flex items-center justify-center">
    //             <ContentLoader viewBox="0 0 800 400" height={800} width={800}>
    //                 <circle cx="472" cy="159" r="7" />
    //                 <rect x="487" y="154" rx="5" ry="5" width="220" height="10" />
    //                 <circle cx="472" cy="190" r="7" />
    //                 <rect x="487" y="184" rx="5" ry="5" width="220" height="10" />
    //                 <circle cx="472" cy="219" r="7" />
    //                 <rect x="487" y="214" rx="5" ry="5" width="220" height="10" />
    //                 <circle cx="472" cy="249" r="7" />
    //                 <rect x="487" y="244" rx="5" ry="5" width="220" height="10" />
    //                 <rect x="64" y="18" rx="0" ry="0" width="346" height="300" />
    //                 <rect x="229" y="300" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="111" y="340" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="121" y="342" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="10" y="20" rx="0" ry="0" width="40" height="44" />
    //                 <rect x="10" y="80" rx="0" ry="0" width="40" height="44" />
    //                 <rect x="10" y="140" rx="0" ry="0" width="40" height="44" />
    //                 <rect x="194" y="329" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="192" y="323" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="185" y="323" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="10" y="200" rx="0" ry="0" width="40" height="44" />
    //                 <rect x="470" y="18" rx="0" ry="0" width="300" height="25" />
    //                 <rect x="470" y="58" rx="0" ry="0" width="300" height="6" />
    //                 <rect x="470" y="68" rx="0" ry="0" width="300" height="6" />
    //                 <rect x="470" y="78" rx="0" ry="0" width="300" height="6" />
    //                 <rect x="798" y="135" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="731" y="132" rx="0" ry="0" width="0" height="0" />
    //                 <rect x="470" y="99" rx="0" ry="0" width="70" height="30" />
    //                 <rect x="560" y="99" rx="0" ry="0" width="70" height="30" />
    //             </ContentLoader>
    //         </div>

    //     )

    const images = isLoading ? [''] : productData?.data?.banner
    return (
        <div className="min-h-screen">
            <main className="max-w-screen-2xl border-x-[0.2px] border-[var(--border-color)] px-3 space-y-6 mx-auto py-6">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery isLoading={isLoading} setIsVideo={setIsVideo} isVideo={isVideo} setSelectedVariantImage={setSelectedVariantImage} selectedVariantImage={selectedVariantImage} images={images} productName={productData?.data?.name} />
                    </div>
                    <div>
                        <ProductInfo isVideo={isVideo} setIsVideo={setIsVideo} selectedVariantImage={selectedVariantImage} product={productData?.data} setSelectedVariantImage={setSelectedVariantImage} />
                    </div>
                </div>
                <div className="mt-16 lg:mt-24">
                    <RelatedProducts products={productData?.related_product} />
                </div>
            </main>
        </div>
    )
}
