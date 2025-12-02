"use client"
import { useState, useRef, type MouseEvent } from "react"
import cn from "@/app/utils/cn"
import { imageUrl } from "@/app/utils/imagePreview"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Image, Skeleton } from "antd"

interface ImageGalleryProps {
    images: string[]
    productName: string
    selectedVariantImage: any
    setSelectedVariantImage: any,
    isVideo: boolean
    setIsVideo: any
    isLoading: boolean
}

export function ImageGallery({ selectedVariantImage, images, productName, setSelectedVariantImage, isVideo, setIsVideo, isLoading }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [showMagnifier, setShowMagnifier] = useState(false)
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const imageRef = useRef<HTMLDivElement>(null)
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return

        const { left, top, width, height } = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setMagnifierPosition({ x: e.clientX - left, y: e.clientY - top })
        setImagePosition({ x, y })
    }

    return (
        <div className="flex flex-col border border-[var(--border-color)] gap-4">
            {/* Main Image */}
            <div
                ref={imageRef}
                className={cn("relative border border-[var(--border-color)] aspect-square w-full overflow-hidden bg-white",
                    isVideo ? "cursor-auto" : "cursor-crosshair",
                )}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
            >
                {isVideo ?
                    isLoading ?
                        <div className="aspect-square w-full h-full">
                            <Skeleton.Image className="!aspect-square !w-full !h-full" />
                        </div> : <div className="aspect-square">
                            <video className="aspect-square w-full h-full" src={imageUrl({ image: selectedVariantImage || images[selectedImage] })} controls autoPlay loop />
                        </div>
                    :
                    isLoading ?
                        <div className="w-full h-full">
                            <Skeleton.Image className="!w-full !h-full" />
                        </div>
                        : <div className="w-full h-full flex items-center justify-center">
                            <Image
                                src={imageUrl({ image: selectedVariantImage || images[selectedImage] })}
                                alt={productName}
                                width={800}
                                height={800}
                                className="object-contain max-w-full max-h-full w-auto h-auto"
                                style={{
                                    aspectRatio: '1/1'
                                }}
                            />
                        </div>}

                {showMagnifier && !isVideo && !isLoading && (
                    <div
                        className="absolute  pointer-events-none border-2 border-white shadow-lg rounded-full hidden md:block"
                        style={{
                            width: "500px",
                            height: "500px",
                            left: `${magnifierPosition.x - 250}px`,
                            top: `${magnifierPosition.y - 250}px`,
                            backgroundImage: `url(${imageUrl({ image: selectedVariantImage || images[selectedImage] })})`,
                            backgroundSize: "600%",
                            backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 border border-[var(--border-color)] gap-3 sm:gap-4">
                    {images.slice(0, 3).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedVariantImage(image)
                                setSelectedImage(index)
                                setIsVideo(false)
                            }}
                            className={cn(
                                "relative aspect-square border border-[var(--border-color)] overflow-hidden bg-white transition-all",
                                selectedImage === index ? "border-primary" : "opacity-70 hover:opacity-100",
                            )}
                        >
                            <Image
                                src={imageUrl({ image })}
                                alt={`${productName} view ${index + 1}`}
                                className="!object-fill aspect-square !w-full !h-full !object-bottom"
                                preview={false}
                            />
                        </button>
                    ))}

                    {images.length > 3 && <div className="relative flex-col aspect-square overflow-hidden bg-white transition-all flex items-center justify-center text-3xl">
                        + {images.length - 3}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm">View All</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>All Image</DialogHeader>
                                <div className="grid grid-cols-4 gap-2">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedVariantImage(image)
                                                setSelectedImage(index)
                                            }}
                                            className={cn(
                                                "relative aspect-square overflow-hidden rounded-md bg-white transition-all",
                                                selectedImage === index ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100",
                                            )}
                                        >
                                            <Image
                                                src={imageUrl({ image })}
                                                alt={`${productName} view ${index + 1}`}
                                                className="object-cover !w-full !h-full"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>}
                </div>
            )
            }

        </div >
    )
}
