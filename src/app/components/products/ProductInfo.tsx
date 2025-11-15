"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { VariantSelector } from "./VariantSelector"
import { useRouter } from "next/navigation"
import { useCreateCartMutation } from "@/app/redux/services/cartApis"
import toast from "react-hot-toast"
import { useProfileQuery } from "@/app/redux/services/profileApis"
import { FaLock, FaShoppingCart } from "react-icons/fa"
import { motion } from "framer-motion"
import { Loader2, Plus, Minus } from "lucide-react"
import UploadIdentity from "./UploadIdentity"

export interface Variant {
    _id: string
    img: string[]
    color: string
    size: string
    quantity: number
    price: number
    discount: number
    price_after_discount: number
}

interface ProductInfoProps {
    product: any
    selectedVariantImage: string
    isVideo: boolean
    selectedVariant: Variant
    setIsVideo: (value: boolean) => void
    setSelectedVariantImage: (image: string) => void
    onVariantChange?: (variant: Variant) => void
}

export function ProductInfo({
    product,
    selectedVariantImage,
    isVideo,
    selectedVariant,
    setIsVideo,
    setSelectedVariantImage,
    onVariantChange
}: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1)
    const [createCartMutation] = useCreateCartMutation()
    const router = useRouter()
    const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useProfileQuery(undefined)
    console.log(profileData)
    const availableVariants: Variant[] = product?.variants || []
    const availableSizes: string[] = Array.from(new Set(availableVariants.map((v) => v.size)))
    const availableColors: string[] = Array.from(new Set(availableVariants.map((v) => v.color)))


    const handleVariantSelect = (variant: Variant) => {
        if (onVariantChange) {
            onVariantChange(variant)
        }
    }


    useEffect(() => {
        if (availableVariants.length > 0 && !selectedVariant) {
            const firstVariant = availableVariants[0]
            onVariantChange?.(firstVariant)
            setSelectedVariantImage(firstVariant.img[0])
            setIsVideo(firstVariant.img[0]?.includes('.mp4'))
        }
    }, [availableVariants, selectedVariant])

    useEffect(() => {
        return () => {

        }
    }, [])


    const handleQuantityChange = (value: number) => {
        if (!selectedVariant) return
        const newQuantity = Math.max(1, Math.min(selectedVariant.quantity || 1, quantity + value))
        setQuantity(newQuantity)
    }

    const handleAddToCart = async (product: any) => {
        try {
            if (!product) {
                throw new Error("Product not found")
            }

            if (!selectedVariant) {
                throw new Error("Please select a variant")
            }

            if (quantity < 1) {
                throw new Error("Quantity must be at least 1")
            }
            if (!profileData) {
                router.push("/auth/sign-in")
                return
            }

            const cartData = {
                user: profileData?.data?._id,
                product_id: product._id,
                variant: selectedVariant._id,
                quantity: quantity
            }

            const res = await createCartMutation(cartData).unwrap()

            if (!res?.success) {
                throw new Error(res?.message || 'Failed to update cart')
            }

            toast.success(res?.message || "Cart updated successfully")
        } catch (error: any) {
            console.error("Error updating cart:", error)
            if (error?.status === 403) {
                toast.error("Session expired. Please login again.")
                localStorage.removeItem("token")
                router.push("/auth/sign-in")
            } else {
                toast.error(error?.message || error?.data?.message || "Failed to update cart")
            }
        }
    }

    return (
        <div className="flex flex-col border border-[var(--border-color)]">
            <div>
                <Badge className="bg-transparent text-foreground rounded-none border-none text-xl">{product?.category?.name}</Badge>
                <h1 className="text-3xl font-bold p-2 border-b border-[var(--border-color)] tracking-tight text-foreground sm:text-4xl">{product?.name}</h1>
                <div className="flex items-center gap-2 p-2 border-b border-[var(--border-color)]">

                    {selectedVariant?.quantity > 0 ? (
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
                <span className="text-4xl w-full p-2 font-bold text-foreground">
                    ${(selectedVariant.price_after_discount || selectedVariant.price || 0).toFixed(2)}
                </span>
                {selectedVariant.discount > 0 && selectedVariant.price && selectedVariant.price_after_discount && (
                    <>
                        {/* <span className="text-xl text-muted-foreground line-through">
                            ${selectedVariant.price.toFixed(2)}
                        </span> */}
                        <Badge variant="destructive" className="text-sm">
                            {Math.round(((selectedVariant.price - selectedVariant.price_after_discount) / selectedVariant.price) * 100)}% OFF
                        </Badge>
                    </>
                )}
            </div>
            {selectedVariant && (
                <VariantSelector
                    product={product}
                    variants={availableVariants}
                    selectedVariant={selectedVariant}
                    onVariantSelect={handleVariantSelect}
                    variantImages={product?.variantImages}
                    colors={availableColors}
                    sizes={availableSizes}
                    onVariantChange={(color: string, size: string) => {
                        const variant = availableVariants.find(v => v.color === color && v.size === size)
                        if (variant) {
                            handleVariantSelect(variant)
                        }
                    }}
                />
            )}

            {/* Quantity Selector */}
            <div className="space-y-3 p-2 border-b-[0.2px] border-[var(--border-color)]">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-foreground">Quantity</h3>
                    <span className="text-sm text-muted-foreground">
                        {selectedVariant.quantity} available
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-between border border-[var(--border-color)] rounded-md">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 rounded-r-none text-foreground hover:bg-transparent hover:text-[#cc83ee]"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            min={1}
                            max={selectedVariant?.quantity || 1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="h-10 w-12 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 rounded-l-none text-foreground hover:bg-transparent hover:text-[#cc83ee]"
                            onClick={() => handleQuantityChange(1)}
                            disabled={selectedVariant ? quantity >= (selectedVariant.quantity || 1) : true}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex relative flex-col gap-3 sm:flex-row">
                <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={selectedVariant.quantity <= 0 || isProfileLoading || isProfileError}
                    className="w-full h-16 rounded-none bg-[#cc83ee] hover:bg-[#cc83ee]/90 text-white text-lg font-medium flex items-center justify-center gap-2"
                >
                    {isProfileLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <>
                            <FaShoppingCart className="h-6 w-6" />
                            {selectedVariant.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </>
                    )}
                </Button>
                {!profileData &&
                    <div
                        onClick={() => {
                            router.push("/auth/sign-in")
                        }}
                        className="absolute cursor-pointer top-0 left-0 w-full flex items-center justify-center inset-0 h-full bg-black text-white gap-2 z-10">
                        <FaLock /> please login for add to cart
                    </div>
                }
            </div>

            {/* Additional Info */}
            <div className="space-y-2 p-2 border-b-[0.2px] border-[var(--border-color)] text-sm">
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
