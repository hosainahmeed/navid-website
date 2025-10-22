"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { colorOptions } from "@/app/constants/constData"

interface VariantSelectorProps {
    variantImages: any
    colors: string[]
    setSelectedVariantImage: (image: string) => void
    sizes: string[]
    onVariantChange?: (color: string, size: string) => void
}

export function VariantSelector({ setSelectedVariantImage, variantImages, colors, sizes, onVariantChange }: VariantSelectorProps) {

    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedSize, setSelectedSize] = useState(sizes[0])

    useEffect(() => {
        if (variantImages) {
            Object.entries(variantImages).forEach(([color, images]: any) => {
                if (color === selectedColor) {
                    setSelectedVariantImage(images?.img[0])
                }
            })
        }
    }, [selectedColor, variantImages])

    const handleColorChange = (color: string) => {
        setSelectedColor(color)
        onVariantChange?.(color, selectedSize)
    }

    const handleSizeChange = (size: string) => {
        setSelectedSize(size)
        onVariantChange?.(selectedColor, size)
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
                    {colors?.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorChange(color)}
                            style={{ backgroundColor: color.toLocaleLowerCase() }}
                            className={cn(
                                "relative h-10 w-10 rounded-full border-2 transition-all",
                                selectedColor === color
                                    ? "border-primary ring-2 ring-primary ring-offset-2"
                                    : "border-border hover:border-primary/50",
                            )}
                            aria-label={`Select ${color} color`}
                        >
                            <span className={cn("absolute inset-1 rounded-full", getColorClass(color))} />
                            {selectedColor === color && (
                                <Check className="absolute inset-0 m-auto h-5 w-5 mix-blend-difference drop-shadow-md" />
                            )}
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
                            onClick={() => handleSizeChange(size)}
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
