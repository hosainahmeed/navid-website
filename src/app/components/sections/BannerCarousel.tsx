'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from '@/app/utils/cn';
import Image, { StaticImageData } from 'next/image';
import { IMAGE } from '@/app/constants/Image.index';

interface IBanner {
    _id: string;
    img: string | StaticImageData;
}

const BannerData: IBanner[] = [
    { _id: "1", img: IMAGE.closeUpHookahVaping3 },
    { _id: "2", img: IMAGE.closeUpHookahVaping4 },
    { _id: "3", img: IMAGE.closeUpHookahVaping5 }
];

const THUMBNAIL_LIMIT = 4;

export default function BannerCarousel() {
    const [index, setIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % BannerData.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev === 0 ? BannerData.length - 1 : prev - 1));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
        const swipeThreshold = 50;
        if (info.offset.x > swipeThreshold) handlePrev();
        else if (info.offset.x < -swipeThreshold) handleNext();
    };
    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,

        }),
        center: {
            x: 0,
            opacity: 1,

            zIndex: 10,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,

        }),
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="h-fit  mx-auto  flex items-center justify-center">
            <div className="w-full mx-auto text-white">
                <div className="relative w-full h-[calc(100vh-25rem)] flex items-center justify-center">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous slide"
                        className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <div className="relative w-full h-full bg-gray-200/40 overflow-hidden rounded-2xl sm:rounded-3xl z-10">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={BannerData[index]._id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleDragEnd}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={BannerData[index].img}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-fill select-none"
                                    draggable={false}
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <button
                        onClick={handleNext}
                        aria-label="Next slide"
                        className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 sm:gap-3 mt-6">
                    {BannerData.map((item, i) => (
                        <button
                            key={item._id}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(`transition-all duration-300  rounded-full`, i === index
                                ? 'w-8 sm:w-10 h-2 bg-black'
                                : 'w-2 h-2 bg-pink-200 hover:bg-black cursor-poniter'
                            )}
                        />
                    ))}
                </div>

                <div className="hidden lg:flex justify-center gap-4 mt-8">
                    {BannerData.slice(0, THUMBNAIL_LIMIT).map((item, i) => (
                        <button
                            key={item._id}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            className={cn(`relative w-28 h-20 rounded-lg overflow-hidden transition-all duration-300`,
                                i === index
                                    ? 'ring-4 ring-pink-500 scale-110'
                                    : 'opacity-50 hover:opacity-80 hover:scale-105'
                            )}
                        >
                            <Image
                                src={item.img}
                                width={900}
                                height={500}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                            {i !== index && <div className="absolute inset-0 bg-black/40" />}
                        </button>
                    ))}

                    {BannerData.length > THUMBNAIL_LIMIT && (
                        <div className="flex items-center justify-center w-28 h-20 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                            +{BannerData.length - THUMBNAIL_LIMIT}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
