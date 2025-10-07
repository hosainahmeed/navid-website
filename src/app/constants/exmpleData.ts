import { IBanner, Iproduct } from "../types/product";
import { IMAGE } from "./Image.index";

export const productData: Iproduct[] = [
    {
        _id: "67b59f0d27e1a94d6bbef0a3",
        name: "Product name",
        description: "This is a exmple product details description , with multiple lines",
        price: 10,
        category: {
            name: "category name",
            img: "uploads/img/1739953905021-Screenshot from 2025-02-12 23-17-12.png"
        },
        quantity: 20,
        variantImages: {
            red: [
                "uploads/variants_red/1739955981736-Screenshot from 2025-02-11 00-26-58.png"
            ],
            blue: [
                "uploads/variants_blue/1739955981737-Screenshot from 2025-02-14 03-35-20.png"
            ]
        },
        variantColors: [
            "red",
            "blue"
        ]
    }]


export const BannerData: IBanner[] = [
    {
        _id: "68e548e24f84b01c49a8efe6",
        img: IMAGE.closeUpHookahVaping
    },
    {
        _id: "68e549004f84b01c49a8efee",
        img: IMAGE.closeUpHookahVaping2
    },
    {
        _id: "68e548e24f84b01c49a8efe6",
        img: IMAGE.closeUpHookahVaping
    },
    {
        _id: "68e549004f84b01c49a8efee",
        img: IMAGE.placeholderBanner
    },
]