'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from '@/app/utils/cn';
import Image from 'next/image';
import { useGetAllBannerQuery } from '@/app/redux/services/bannerApis';
import { imageUrl } from '@/app/utils/imagePreview';

interface IBanner {
    _id: string;
    img: string;
}

export default function BannerCarousel() {
    const { data: bannerData } = useGetAllBannerQuery(undefined)
    const [index, setIndex] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);

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
        if (bannerData?.data?.length) {
            setIndex(0);
        }
    }, [bannerData]);

    const handleNext = () => {
        if (!bannerData?.data?.length) return;
        setDirection(1);
        setIndex((prev) => (prev + 1) % bannerData.data.length);
    };

    const handlePrev = () => {
        if (!bannerData?.data?.length) return;
        setDirection(-1);
        setIndex((prev) => (prev === 0 ? bannerData.data.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (!bannerData?.data?.length) return;
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, [bannerData]);
    if (!bannerData?.data?.length) {
        return null;
    }
    return (
        <section className="h-fit  mx-auto  flex items-center justify-center">
            <div className="w-full mx-auto text-white">
                <div className="relative w-full h-[250px] md:h-[400px] xl:h-[600px] flex items-center justify-center">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous slide"
                        className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <div className="relative w-full h-full bg-gray-200/40 overflow-hidden border border-[var(--border-color)] z-10">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={bannerData?.data[index]?._id}
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
                                className="absolute inset-2"
                            >
                                <Image
                                    src={imageUrl({ image: bannerData?.data[index]?.img })}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-contain md:object-fill select-none"
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
                    {bannerData?.data?.map((item: IBanner, i: number) => (
                        <button
                            key={item._id}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                            className={cn(`transition-all duration-300  rounded-full`, i === index
                                ? 'w-8 sm:w-10 h-2 bg-[var(--purple-light)]'
                                : 'w-2 h-2 bg-[#7a4494] hover:bg-[var(--purple-light)] cursor-poniter'
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
