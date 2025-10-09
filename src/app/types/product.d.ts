import { StaticImageData } from "next/image";

export interface IVariant {
    img: string[];
    size: string[];
    quantity: number;
}

export interface Iproduct {
    _id: string;
    name: string;
    wholesaleAvailable: boolean;
    previous_price: number;
    description: string;
    price: number;
    category: {
        name: string;
        img: string;
    };
    quantity: number;
    variantImages: {
        [key: string]: IVariant;
    };
    variantColors: string[];
}

export interface IBanner {
    _id: string;
    img: string | StaticImageData;
}

//form others
export interface Category {
    _id?: string
    name: string
    img: string | StaticImageData
}

export interface VariantImage {
    img: string[]
    size: string[]
    quantity: number
}

export interface Product {
    _id: string
    name: string
    description: string
    price: number
    category: Category
    whole_sale: boolean
    quantity: number
    previous_price: number
    variantImages: Record<string, VariantImage>
    banner: string[]
    variantColors: string[]
}

export interface RelatedProduct {
    _id: string
    name: string
    description: string
    price: number
    category: {
        name: string
        img: string
    }
    sub_category: string
    whole_sale: boolean
    quantity: number
    previous_price: number
    variantImages: Record<string, VariantImage>
    banner: string[]
    variantColors: string[]
}

export interface ProductResponse {
    success: boolean
    message: string
    data: Product
    related_product: RelatedProduct[]
}
