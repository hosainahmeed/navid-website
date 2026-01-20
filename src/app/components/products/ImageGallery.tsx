"use client"
import { useState, useRef, type MouseEvent, useMemo } from "react"
import cn from "@/app/utils/cn"
import { imageUrl } from "@/app/utils/imagePreview"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Image, Skeleton, Tooltip } from "antd"
import { PlayCircle, Video as VideoIcon } from "lucide-react"

const isVideoFile = (url: string | undefined): boolean => {
    if (!url) return false;
    const urlStr = String(url).toLowerCase();
    console.log(urlStr)
    return urlStr.endsWith('.mp4') || urlStr.endsWith('.webm') || urlStr.endsWith('.mov') || urlStr.endsWith('.m3u8');
};

const VideoThumbnail = ({ src, onClick }: { src: string; onClick: () => void }) => (
    <div className="relative w-full h-full group">
        <button
            onPointerDown={onClick}
            className="w-full h-full flex items-center justify-center bg-black/5"
            type="button"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                    <PlayCircle className="w-6 h-6 text-white" />
                </div>
            </div>
            <VideoIcon className="w-1/2 h-1/2 text-gray-300" />
        </button>
    </div>
);

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
                // ref={imageRef}
                className={cn("relative border border-[var(--border-color)] aspect-square w-full overflow-hidden bg-white",
                    isVideo ? "cursor-auto" : "cursor-crosshair",
                )}
                // onMouseEnter={() => !isVideo && setShowMagnifier(true)}
                // onMouseLeave={() => setShowMagnifier(false)}
                // onMouseMove={handleMouseMove}
            >
                {isVideo && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <PlayCircle className="w-16 h-16 text-white/80" />
                    </div>
                )}
                {isVideo ? (
                    isLoading ? (
                        <div className="aspect-square w-full h-full">
                            <Skeleton.Image className="!aspect-square !w-full !h-full" />
                        </div>
                    ) : (
                        <div className="aspect-square w-full h-full bg-black">
                            <video 
                                className="w-full h-full object-contain" 
                                src={imageUrl({ image: selectedVariantImage || images[selectedImage] })} 
                                controls 
                                autoPlay 
                                loop
                                playsInline
                                onError={(e) => {
                                    console.error('Error loading video:', e);
                                    const videoElement = e.target as HTMLVideoElement;
                                    videoElement.controls = false;
                                    videoElement.poster = '/video-error-placeholder.jpg';
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )
                )
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

                {/* {showMagnifier && !isVideo && !isLoading && (
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
                )} */}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 border border-[var(--border-color)] gap-3 sm:gap-4">
                    {images.slice(0, 3).map((image, index) => (
                        <button
                            key={index}
                            onPointerDown={() => {
                                setSelectedVariantImage(image);
                                setSelectedImage(index);
                                setIsVideo(isVideoFile(image));
                            }}
                            className={cn(
                                "relative aspect-square border border-[var(--border-color)] overflow-hidden bg-white transition-all",
                                selectedImage === index ? "border-primary" : "opacity-70 hover:opacity-100",
                            )}
                        >
                            {isVideoFile(image) ? (
                                <VideoThumbnail 
                                    src={imageUrl({ image })}
                                    onClick={() => {
                                        setSelectedVariantImage(image);
                                        setSelectedImage(index);
                                        setIsVideo(true);
                                    }}
                                />
                            ) : (
                                <Image
                                    src={imageUrl({ image })}
                                    alt={`${productName} view ${index + 1}`}
                                    className="!object-cover aspect-square !w-full !h-full"
                                    preview={false}
                                />
                            )}
                        </button>
                    ))}

                    {images.length > 3 && (
                        <div className="relative flex-col aspect-square overflow-hidden bg-white transition-all flex items-center justify-center text-3xl">
                            + {images.length - 3}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="cursor-pointer" size="sm">View All</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                    <DialogHeader>All Media</DialogHeader>
                                    <div className="grid grid-cols-4 gap-4">
                                        {images.map((image, index) => (
                                            <button
                                                key={index}
                                                onPointerDown={() => {
                                                    const isVideo = isVideoFile(image);
                                                    setSelectedVariantImage(image);
                                                    setSelectedImage(index);
                                                    setIsVideo(isVideo);
                                                }}
                                                className={cn(
                                                    "relative aspect-square overflow-hidden rounded-md bg-gray-100 transition-all group",
                                                    selectedImage === index 
                                                        ? "ring-2 ring-primary ring-offset-2" 
                                                        : "opacity-70 hover:opacity-100"
                                                )}
                                            >
                                                {isVideoFile(image) ? (
                                                    <VideoThumbnail 
                                                        src={imageUrl({ image })}
                                                        onClick={() => {
                                                            setSelectedVariantImage(image);
                                                            setSelectedImage(index);
                                                            setIsVideo(true);
                                                        }}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={imageUrl({ image })}
                                                        alt={`${productName} view ${index + 1}`}
                                                        className="object-cover !w-full !h-full"
                                                        preview={false}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            )
            }

        </div >
    )
}
