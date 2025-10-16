import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { mockProductData } from "@/app/lib/mockProductData"

export default function ProductPage() {
    const { data: product, related_product } = mockProductData

    return (
        <div className="min-h-screen">
            <main className="max-w-screen-2xl border-x border-[var(--border-color)] px-3 space-y-6 mx-auto py-6">
                <div className="grid lg:grid-cols-2">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery images={product.banner} productName={product.name} />
                    </div>
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>
                <div className="mt-16 lg:mt-24">
                    <RelatedProducts products={related_product} />
                </div>
            </main>
        </div>
    )
}
