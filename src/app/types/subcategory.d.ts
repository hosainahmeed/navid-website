import { StaticImageData } from "next/image";

export interface Subcategory {
            _id: string,
            name: string,
            img:string,
            category:{
                _id: string,
                name: string,
                img: string
            }
        }
