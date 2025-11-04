'use client';
import { Category } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { imageUrl } from "@/app/utils/imagePreview";

interface CategoryCardProps {
    item: Category;
    onSelectCategory: (id: string) => void;
    className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    item,
    onSelectCategory,
    className,
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative w-full h-[278px] bg-[#EDEDED] overflow-hidden border border-[var(--border-color)] flex items-end justify-end p-2 cursor-pointer",
                className
            )}
        >
            {/* Text + Button area */}
            <div className="relative z-10 flex items-start justify-end flex-col gap-3 w-full">
                <h1 className="text-black text-2xl uppercase font-bold text-start">
                    {item?.name}
                </h1>

                {/* For desktop → animated on hover */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:flex items-center gap-2"
                >
                    <Button
                        onClick={() => onSelectCategory(item._id)}
                        className="!bg-white !cursor-pointer hover:!bg-white/90 hover:!text-black !rounded !text-black"
                    >
                        See Subcategories
                    </Button>
                </motion.div>

                {/* For mobile → always visible, no animation */}
                <div className="flex sm:hidden items-center gap-2">
                    <Button
                        onClick={() => onSelectCategory(item._id)}
                        className="!bg-white !cursor-pointer hover:!bg-white/90 hover:!text-black !rounded !text-black"
                    >
                        See Subcategories
                    </Button>
                </div>
            </div>

            {/* Image */}
            <div className="absolute top-0 z-0 right-0 flex items-center justify-center w-48 h-48 p-2">
                <Image
                    src={imageUrl({ image: item?.img || "" })}
                    alt={item?.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full opacity-90 transition-transform duration-500 hover:scale-110"
                />
            </div>
        </div>
    );
};

export default CategoryCard;
