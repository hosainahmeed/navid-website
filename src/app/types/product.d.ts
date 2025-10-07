import { StaticImageData } from "next/image";

export interface Iproduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    wholesaleAvailable: boolean;
    category: {
        name: string;
        img: string;
    };
    quantity: number;
    variantImages: {
        red?: string[];
        blue?: string[];
        black?: string[];
        white?: string[];
        green?: string[];
        silver?: string[];
        brown?: string[];
        purple?: string[];
    };
    variantColors: string[];
}

export interface IBanner {
    _id: string;
    img: string | StaticImageData;
}