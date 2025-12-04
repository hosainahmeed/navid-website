"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { colorOptions } from "@/app/constants/constData"
import { FaVideo } from "react-icons/fa"

import { Variant } from './ProductInfo'

interface VariantSelectorProps {
    product: any
    variants: Variant[]
    selectedVariant: Variant | null
    onVariantSelect: (variant: Variant) => void
    variantImages: any
    colors: string[]
    sizes: string[]
    onVariantChange?: (color: string, size: string) => void
}

const videoExtensions = ["mp4", "mov", "wmv", "avi", "mkv", "webm", "flv"]

export function VariantSelector({
    product,
    variants,
    selectedVariant,
    onVariantSelect,
    variantImages,
    colors,
    sizes,
    onVariantChange
}: VariantSelectorProps) {
    const [selectedColor, setSelectedColor] = useState<string>(colors?.[0] || '')
    const [selectedSize, setSelectedSize] = useState<string>(sizes?.[0] || '')


    const availableSizes = Array.from(
        new Set(
            variants
                .filter(v => v.color === selectedColor)
                .map(v => v.size)
        )
    )


    useEffect(() => {
        if (selectedColor && selectedSize) {
            const variant = variants.find(
                v => v.color === selectedColor && v.size === selectedSize
            )
            if (variant) {
                onVariantSelect(variant)
            }
        }
    }, [selectedColor, selectedSize, variants, onVariantSelect])


    const handleColorChange = (color: string) => {
        setSelectedColor(color)

        const newSizes = variants
            .filter(v => v.color === color)
            .map(v => v.size)
        if (newSizes.length > 0 && !newSizes.includes(selectedSize)) {
            setSelectedSize(newSizes[0])
        }
    }


    const handleSizeChange = (size: string) => {
        setSelectedSize(size)
        
        // If no color is selected or the current color is not available for this size,
        // select the first available color for this size
        const availableColorsForSize = Array.from(
            new Set(
                variants
                    .filter(v => v.size === size)
                    .map(v => v.color)
            )
        )
        
        let newColor = selectedColor
        if (!availableColorsForSize.includes(selectedColor) && availableColorsForSize.length > 0) {
            newColor = availableColorsForSize[0]
            setSelectedColor(newColor)
        }
        
        // Find the variant with the selected color and size
        const variant = variants.find(v => v.color === newColor && v.size === size)
        if (variant) {
            onVariantSelect(variant)
        }
        
        onVariantChange?.(newColor, size)
    }

    const getColorClass = (color: string) => {
        const colorMap: Record<string, string> = Object.fromEntries(
            colorOptions.map((option) => [option.value.toLowerCase(), `bg-${option.value}`])
        );
        return colorMap[color.toLowerCase()] || "bg-gray-400"
    }

    return (
        <div className="space-y-6 border-y">
            {/* Color Selection */}
            <div className="space-y-3 border-b border-[var(--border-color)]">
                <div className="flex p-2 items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Color</h3>
                    <span className="text-sm text-muted-foreground capitalize">{selectedColor}</span>
                </div>
                <div className="flex p-2 flex-wrap gap-3">
                    {colors?.map((color, index) => (
                        <button
                            key={index}
                            onPointerDown={() => {
                                handleColorChange(color)
                                const variant = variants.find(v => v.color === color)
                                if (variant) {
                                    onVariantSelect(variant)
                                }
                            }}
                            style={{ backgroundColor: color.toLocaleLowerCase() }}
                            className={cn(
                                "relative h-10 w-10 rounded-full border-2 transition-all",
                                selectedColor === color
                                    ? "border-primary ring-2 ring-primary ring-offset-2"
                                    : "border-border hover:border-primary/50",
                                selectedColor?.toLocaleLowerCase() === 'video' && selectedColor === color ?
                                    "rounded-none" : "border-border hover:border-primary/50"
                            )}
                            aria-label={`Select ${color} color`}
                        >
                            {color === 'video' ?
                                <div className="flex items-center justify-center">
                                    <FaVideo />
                                </div> :
                                <>
                                    <span className={cn("absolute inset-1 rounded-full", getColorClass(color))} />
                                    {selectedColor?.toLocaleLowerCase() === 'video' && selectedColor === color &&
                                        <Check className="absolute inset-0 m-auto h-5 w-5 mix-blend-difference drop-shadow-md" />
                                    }
                                </>
                            }

                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3 p-2 border-b border-[var(--border-color)]">
                <h3 className="text-sm font-medium text-foreground">Size</h3>
                <div className="flex flex-wrap border border-[var(--border-color)]">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSize === size ? "default" : "outline"}
                            size="sm"
                            onPointerDown={() => handleSizeChange(size)}
                            className="min-w-[6rem] h-10 hover:bg-primary text-xl hover:text-white rounded-none"
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
