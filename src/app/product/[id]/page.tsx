import { ImageGallery } from "@/app/components/products/ImageGallery"
import { ProductInfo } from "@/app/components/products/ProductInfo"
import { RelatedProducts } from "@/app/components/products/RelatedProducts"
import { mockProductData } from "@/app/lib/mockProductData"

export default function ProductPage() {
    const { data: product, related_product } = mockProductData

    return (
        <div className="min-h-screen bg-background">

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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

            {/* Footer */}
            <footer className="mt-16 border-t border-border bg-muted/30">
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground">Shop</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        All Products
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        New Arrivals
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Best Sellers
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground">Support</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Shipping Info
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Returns
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground">Company</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-foreground">
                                        Privacy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
                            <p className="text-sm text-muted-foreground">Subscribe to get special offers and updates.</p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                        © 2025 Store. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
