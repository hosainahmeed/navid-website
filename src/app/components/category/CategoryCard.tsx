'use client';
import { Category } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
    item: Category;
    overlayColor?: string;
    ctaText?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    item,
    overlayColor = "rgba(0, 0, 0, 0.25)",
    ctaText = "Shop Now",
}) => {
    return (
        <Link
            href={`/categories/${item._id}`}
            className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 "
        >
            {/* Image */}
            <div className="relative aspect-[3/4] w-full h-full">
                <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {overlayColor !== "none" && (
                    <div
                        className="absolute inset-0 transition-all duration-500 group-hover:bg-black/40"
                        style={{ backgroundColor: overlayColor }}
                    ></div>
                )}
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 backdrop-blur-sm right-0 bg-white/30 p-4 text-center rounded-t-2xl">
                <h2 className="uppercase font-bold text-lg mb-2 text-gray-900">
                    {item.name}
                </h2>
                <button className="text-sm bg-black text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-800">
                    {ctaText}
                </button>
            </div>
        </Link>
    );
};

export default CategoryCard;
