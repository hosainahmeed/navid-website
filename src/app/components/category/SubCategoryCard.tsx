'use client';
import { Subcategory } from "@/app/types/subcategory";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SubCategoryCardProps {
    item: Subcategory;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({
    item,
}) => {
    return (
        <div
            className="relative w-full h-[278px] bg-[var(--purple-light)] overflow-hidden rounded flex items-end justify-end p-2"
        >
            <div className="relative z-10 flex items-end justify-end flex-col gap-3">
                <h1 className="text-white text-2xl uppercase font-bold text-start">{item.name}</h1>
                <Button className="bg-white hover:bg-white/90 hover:text-black cursor-pointer rounded text-black">Shop Now</Button>
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



export default SubCategoryCard