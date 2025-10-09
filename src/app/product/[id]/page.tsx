import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { mockProductData } from "@/app/lib/mockProductData"

export default function ProductPage() {
    const { data: product, related_product } = mockProductData

    return (
        <div className="min-h-screen bg-background">

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                {/* Product Details Section */}
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <ImageGallery images={product.banner} productName={product.name} />
                    </div>

                    {/* Product Information */}
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-16 lg:mt-24">
                    <RelatedProducts products={related_product} />
                </div>
            </main>
        </div>
    )
}
