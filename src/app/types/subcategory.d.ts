import { StaticImageData } from "next/image";

export interface Subcategory {
    id: string;
    name: string;
    img: string | StaticImageData;
    category: {
        id: string;
        name: string;
        img: string | StaticImageData;
    }
}
