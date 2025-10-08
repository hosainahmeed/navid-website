"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/app/types/product"
import { VariantSelector } from "./VariantSelector"

interface ProductInfoProps {
    product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState(product.variantColors[0])
    const [selectedSize, setSelectedSize] = useState(product.variantImages[product.variantColors[0]].size[0])

    const hasDiscount = product.previous_price > product.price
    const discountPercentage = hasDiscount
        ? Math.round(((product.previous_price - product.price) / product.previous_price) * 100)
        : 0

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.quantity)))
    }

    const handleVariantChange = (color: string, size: string) => {
        setSelectedColor(color)
        setSelectedSize(size)
    }

    const currentVariant = product.variantImages[selectedColor]
    const availableSizes = currentVariant?.size || []

    return (
        <div className="flex flex-col gap-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Home</span>
                <span>/</span>
                <span>{product.category.name}</span>
                <span>/</span>
                <span className="text-foreground">{product.name}</span>
            </div>

            {/* Product Title */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">{product.category.name}</Badge>
                    {product.quantity > 0 ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                            In Stock
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-red-600 border-red-600">
                            Out of Stock
                        </Badge>
                    )}
                </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                {hasDiscount && (
                    <>
                        <span className="text-xl text-muted-foreground line-through">${product.previous_price.toFixed(2)}</span>
                        <Badge variant="destructive" className="text-sm">
                            {discountPercentage}% OFF
                        </Badge>
                    </>
                )}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Variant Selector */}
            <VariantSelector colors={product.variantColors} sizes={availableSizes} onVariantChange={handleVariantChange} />

            {/* Quantity Selector */}
            <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Quantity</h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-border">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="h-10 w-10"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= product.quantity}
                            className="h-10 w-10"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">{product.quantity} available</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 gap-2" disabled={product.quantity === 0}>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Heart className="h-5 w-5" />
                    Wishlist
                </Button>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 border-t border-border pt-6 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium text-foreground">{product._id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium text-foreground">{product.category.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium text-foreground">{product.quantity} in stock</span>
                </div>
            </div>
        </div>
    )
}
