"use client"
import { useState, useRef, type MouseEvent } from "react"
import Image from "next/image"
import cn from "@/app/utils/cn"
import { imageUrl } from "@/app/utils/imagePreview"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ImageGalleryProps {
    images: string[]
    productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [showMagnifier, setShowMagnifier] = useState(false)
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const imageRef = useRef<HTMLDivElement>(null)
    console.log(images)
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return

        const { left, top, width, height } = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setMagnifierPosition({ x: e.clientX - left, y: e.clientY - top })
        setImagePosition({ x, y })
    }

    const handleShowAllImage = (images: string[]) => {
        console.log(images)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
                ref={imageRef}
                className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted cursor-crosshair"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={imageUrl({ image: images[selectedImage] })}
                    alt={productName}
                    fill
                    className="object-cover"
                    priority
                />

                {showMagnifier && (
                    <div
                        className="absolute pointer-events-none border-2 border-white shadow-lg rounded-full hidden md:block"
                        style={{
                            width: "500px",
                            height: "500px",
                            left: `${magnifierPosition.x - 250}px`,
                            top: `${magnifierPosition.y - 250}px`,
                            backgroundImage: `url(${imageUrl({ image: images[selectedImage] })})`,
                            backgroundSize: "600%",
                            backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {images.slice(0, 3).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-md bg-muted transition-all",
                                selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100",
                            )}
                        >
                            <Image
                                src={imageUrl({ image })}
                                alt={`${productName} view ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}

                    <div className="relative flex-col aspect-square overflow-hidden rounded-md bg-muted transition-all flex items-center justify-center text-3xl">
                        + {images.length - 3}
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleShowAllImage(images)}
                                size="sm">View All</Button>
                        </DialogTrigger>
                    </div>
                </div>
            )}

            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <h1>hosain</h1>
            </DialogContent>
        </div>
    )
}
