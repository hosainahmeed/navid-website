'use client';
import { Category } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
    item: Category;
    className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    item,
    className
}) => {
    const [isHovered, setIsHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn("relative w-full h-[278px] bg-[var(--purple-light)] overflow-hidden rounded flex items-end justify-end p-2", className)}
        >
            <div className="relative z-10 flex items-start justify-end flex-col gap-3">
                <h1 className="text-white text-2xl uppercase font-bold text-start">{item.name}</h1>
                {isHovered && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2">
                    <Button className="bg-white hover:bg-white/90 hover:text-black cursor-pointer rounded text-black">Shop Now</Button>
                    <Link
                        href={`/categories/${item._id}`}

                    >
                        <Button className="bg-white hover:bg-white/90 hover:text-black cursor-pointer rounded text-black">See Subcategories</Button>
                    </Link>
                </motion.div>}
            </div>
            <div className="absolute top-0 z-0 right-0 flex items-center justify-center w-48 h-48 p-2">
                <Image
                    src={item.img}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full opacity-90 transition-transform duration-500 hover:scale-110 "
                />
            </div>
        </div>
    );
};

export default CategoryCard;
