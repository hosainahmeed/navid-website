import { StaticImageData } from "next/image";

export interface IVariant {
    img: string[];
    size: string[];
    quantity: number;
}

export interface Iproduct {
    _id: string,
    name: string,
    description: string,
    category: {
        name: string,
        img: string
    },
    sub_category: string,
    whole_sale: boolean,
    sub_categories: {
        name: string,
        img: string
    },
    img: string,
    price: number,
    discount: number,
    colors: [string],
    size: [string],
    price_after_discount: number
}

export interface IBanner {
    _id: string;
    img: string | StaticImageData;
}

//form others
export interface Category {
    _id: string,
    name: string,
    img: string,
    is_service: boolean,
    // is_active: boolean,
}

export interface VariantImage {
    img: string[]
    size: string[]
    quantity: number
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
