"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/app/types/product"
import { VariantSelector } from "./VariantSelector"
import { useRouter } from "next/navigation"
import { useCreateCartMutation } from "@/app/redux/services/cartApis"
import toast from "react-hot-toast"

interface ProductInfoProps {
    product: Product
    selectedVariantImage: string
    isVideo: boolean
    setIsVideo: (value: boolean) => void
    setSelectedVariantImage: (image: string) => void
}

export function ProductInfo({ product, selectedVariantImage, isVideo, setIsVideo, setSelectedVariantImage }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState(product?.variantColors[0])
    const [selectedSize, setSelectedSize] = useState(product?.variantImages[product?.variantColors[0]]?.size[0])
    const [createCartMutation] = useCreateCartMutation()
    const router = useRouter()

    // Set default variant and size when product changes
    useEffect(() => {
        if (product?.variantColors?.length > 0) {
            const defaultColor = product.variantColors[0]
            setSelectedColor(defaultColor)
            
            if (product?.variantImages?.[defaultColor]?.size?.length > 0) {
                setSelectedSize(product.variantImages[defaultColor].size[0])
            }
            
            // Set default variant image (first image of first color)
            if (product?.variantImages?.[defaultColor]?.img?.length > 0) {
                const firstImage = product.variantImages[defaultColor].img[0]
                setSelectedVariantImage(firstImage)
                
                // Check if it's a video
                const videoExtensions = ["mp4", "mov", "wmv", "avi", "mkv", "webm", "flv"]
                const fileExtension = firstImage.split(".").pop()?.toLowerCase()
                setIsVideo(videoExtensions.includes(fileExtension || ""))
            }
        }
    }, [product, setSelectedVariantImage, setIsVideo])


    const hasDiscount = product?.previous_price > product?.price
    const discountPercentage = hasDiscount
        ? Math.round(((product?.previous_price - product?.price) / product?.previous_price) * 100)
        : 0

    const handleQuantityChange = async (delta: number) => {
        // Calculate new quantity
        const newQuantity = Math.max(1, Math.min(quantity + delta, product?.quantity))
        
        // If quantity doesn't change, do nothing
        if (newQuantity === quantity) return
        
        // Store previous quantity for rollback
        const previousQuantity = quantity
        
        // Optimistic update - update UI immediately
        setQuantity(newQuantity)
        
        try {
            // Validate required fields
            if (!product) {
                throw new Error("Product not found")
            }
            if (!selectedVariantImage) {
                throw new Error("Please select a variant image")
            }
            if (!selectedSize) {
                throw new Error("Please select a size")
            }
            if (!selectedColor) {
                throw new Error("Please select a color")
            }

            const data = {
                items: [
                    {
                        product_id: product?._id,
                        quantity: newQuantity,
                        price: product?.price,
                        variant: selectedVariantImage as string,
                        size: selectedSize
                    }
                ]
            }

            const res = await createCartMutation(data).unwrap()
           
            if (!res?.success) {
                throw new Error(res?.message)
            }
            // Optionally show a subtle success message
            // toast.success("Cart updated")
        } catch (error: any) {
            // Revert quantity on error
            setQuantity(previousQuantity)
            
            if (error?.status === 403) {
                toast.error("Session expired. Please login again.")
                localStorage.removeItem("token")
                router.push("/login")
            } else {
                toast.error(error?.message || error?.data?.message || "Failed to update cart")
            }
            console.log(error)
        }
    }

    const handleVariantChange = (color: string, size: string) => {
        setSelectedColor(color)
        setSelectedSize(size)
    }

    // Update size when color changes to default to first size of new color
    useEffect(() => {
        if (selectedColor && product?.variantImages?.[selectedColor]?.size?.length > 0) {
            const sizesForColor = product.variantImages[selectedColor].size
            // If current selected size is not available in new color, select first size
            if (!sizesForColor.includes(selectedSize)) {
                setSelectedSize(sizesForColor[0])
            }
        }
    }, [selectedColor, product])

    const currentVariant = product?.variantImages[selectedColor]
    const availableSizes = currentVariant?.size || []



    const handleAddToCart = async (product: Product) => {
        try {
            if (!product) {
                throw new Error("Product not found")
            }
            if (quantity < 0) {
                throw new Error("Quantity cannot be less than 0")
            }
            if (quantity > product?.quantity) {
                throw new Error("Quantity cannot be greater than available quantity")
            }
            if (!selectedVariantImage) {
                throw new Error("Please select a variant image")
            }
            if (!selectedSize) {
                throw new Error("Please select a size")
            }
            if (!selectedColor) {
                throw new Error("Please select a color")
            }


            const data = {
                items: [
                    {
                        product_id: product?._id,
                        quantity: quantity,
                        price: product?.price,
                        variant: selectedVariantImage as string,
                        size: selectedSize
                    }
                ]
            }

            const res = await createCartMutation(data).unwrap()
           
            if (!res?.success) {
                throw new Error(res?.message)
            }
            toast.success(res?.message || "Product added to cart successfully!")
        } catch (error: any) {
            if (error?.status === 403) {
                toast.error("Session expired. Please login again.")
                localStorage.removeItem("token")
                router.push("/login")
            } else {
                toast.error(error?.message || error?.data?.message || "Failed to add product to cart")
            }
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col border border-[var(--border-color)]">
            <div>
                <Badge className="bg-transparent text-foreground rounded-none border-none text-xl">{product?.category?.name}</Badge>
                <h1 className="text-3xl font-bold p-2 border-b border-[var(--border-color)] tracking-tight text-foreground sm:text-4xl">{product?.name}</h1>
                <div className="flex items-center gap-2 p-2 border-b border-[var(--border-color)]">

                    {product?.quantity > 0 ? (
                        <Badge variant="outline" className="text-green-600 rounded-none border-green-600">
                            In Stock
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="text-red-600 rounded-none border-red-600">
                            Out of Stock
                        </Badge>
                    )}
                </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-4xl border-b border-[var(--border-color)] w-full p-2 font-bold text-foreground">${product?.price.toFixed(2)}</span>
                {hasDiscount && (
                    <>
                        <span className="text-xl text-muted-foreground line-through">${product?.previous_price.toFixed(2)}</span>
                        <Badge variant="destructive" className="text-sm">
                            {discountPercentage}% OFF
                        </Badge>
                    </>
                )}
            </div>
            <VariantSelector setIsVideo={setIsVideo} setSelectedVariantImage={setSelectedVariantImage} variantImages={product?.variantImages} colors={product?.variantColors} sizes={availableSizes} onVariantChange={handleVariantChange} />

            {/* Quantity Selector */}
            <div className="space-y-3 p-2 border-b border-[var(--border-color)]">
                <h3 className="text-sm font-medium text-foreground">Quantity</h3>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[var(--border-color)]">
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="rounded-none cursor-pointer h-16 w-16"
                        >
                            <Minus className="h-6 w-6" />
                        </Button>
                        <span className="w-16 border-x border-[var(--border-color)] text-center text-xl font-medium">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= product?.quantity}
                            className="rounded-none cursor-pointer h-16 w-16"
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">{product?.quantity} available</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                    onClick={() => handleAddToCart(product)}
                    size="default" className="flex-1 text-xl border-[var(--border-color)] border h-16  hover:text-white transition-all duration-300 cursor-pointer rounded-none gap-2" disabled={product?.quantity === 0}>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </Button>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 p-2 border-b border-[var(--border-color)] text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="font-medium text-foreground">{product?._id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium text-foreground">{product?.category?.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium text-foreground">{product?.quantity} in stock</span>
                </div>
            </div>

            <div className="text-base p-2 leading-relaxed text-muted-foreground">
                <h1 className="text-2xl font-bold">Description</h1>
                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
        </div>
    )
}
