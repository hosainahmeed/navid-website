import { IBanner, Iproduct } from "../types/product";
import { IMAGE } from "./Image.index";

export const productData: Iproduct[] = [
    {
        _id: "1a2b3c4d5e6f7g8h9i0j",
        name: "Wireless Bluetooth Headphones",
        wholesaleAvailable: true,
        description: "High-quality wireless headphones with noise-cancellation and long battery life.",
        price: 55,
        category: {
            name: "Electronics",
            img: "uploads/img/1739953905021-headphones.png"
        },
        quantity: 50,
        variantImages: {
            black: ["uploads/variants_black/1739955981736-headphones_black.png"],
            white: ["uploads/variants_white/1739955981737-headphones_white.png"]
        },
        variantColors: ["black", "white"]
    },
    {
        _id: "2b3c4d5e6f7g8h9i0j1a",
        name: "Smart LED TV 42 Inch",
        wholesaleAvailable: false,
        description: "42 inch Full HD smart LED TV with multiple connectivity options.",
        price: 320,
        category: {
            name: "Electronics",
            img: "uploads/img/1739953905022-tv.png"
        },
        quantity: 15,
        variantImages: {
            black: ["uploads/variants_black/1739955981738-tv_black.png"]
        },
        variantColors: ["black"]
    },
    {
        _id: "3c4d5e6f7g8h9i0j1a2b",
        name: "Cotton Casual Shirt",
        wholesaleAvailable: true,
        description: "Comfortable cotton casual shirt suitable for everyday wear.",
        price: 25,
        category: {
            name: "Clothing",
            img: "uploads/img/1739953905023-shirt.png"
        },
        quantity: 80,
        variantImages: {
            red: ["uploads/variants_red/1739955981739-shirt_red.png"],
            blue: ["uploads/variants_blue/1739955981740-shirt_blue.png"],
            green: ["uploads/variants_green/1739955981741-shirt_green.png"]
        },
        variantColors: ["red", "blue", "green"]
    },
    {
        _id: "4d5e6f7g8h9i0j1a2b3c",
        name: "Running Shoes",
        wholesaleAvailable: false,
        description: "Lightweight running shoes with breathable fabric and strong grip.",
        price: 60,
        category: {
            name: "Footwear",
            img: "uploads/img/1739953905024-shoes.png"
        },
        quantity: 40,
        variantImages: {
            black: ["uploads/variants_black/1739955981742-shoes_black.png"],
            white: ["uploads/variants_white/1739955981743-shoes_white.png"]
        },
        variantColors: ["black", "white"]
    },
    {
        _id: "5e6f7g8h9i0j1a2b3c4d",
        name: "Stainless Steel Water Bottle",
        wholesaleAvailable: true,
        description: "500ml insulated stainless steel bottle keeps drinks cold or hot.",
        price: 18,
        category: {
            name: "Kitchen",
            img: "uploads/img/1739953905025-bottle.png"
        },
        quantity: 100,
        variantImages: {
            silver: ["uploads/variants_silver/1739955981744-bottle_silver.png"],
            blue: ["uploads/variants_blue/1739955981745-bottle_blue.png"]
        },
        variantColors: ["silver", "blue"]
    },
    {
        _id: "6f7g8h9i0j1a2b3c4d5e",
        name: "Gaming Mouse",
        wholesaleAvailable: true,
        description: "Ergonomic gaming mouse with RGB lights and high-precision sensor.",
        price: 45,
        category: {
            name: "Electronics",
            img: "uploads/img/1739953905026-mouse.png"
        },
        quantity: 60,
        variantImages: {
            black: ["uploads/variants_black/1739955981746-mouse_black.png"],
            red: ["uploads/variants_red/1739955981747-mouse_red.png"]
        },
        variantColors: ["black", "red"]
    },
    {
        _id: "7g8h9i0j1a2b3c4d5e6f",
        name: "Leather Wallet",
        wholesaleAvailable: false,
        description: "Genuine leather wallet with multiple compartments for cards and cash.",
        price: 35,
        category: {
            name: "Accessories",
            img: "uploads/img/1739953905027-wallet.png"
        },
        quantity: 70,
        variantImages: {
            brown: ["uploads/variants_brown/1739955981748-wallet_brown.png"],
            black: ["uploads/variants_black/1739955981749-wallet_black.png"]
        },
        variantColors: ["brown", "black"]
    },
    {
        _id: "8h9i0j1a2b3c4d5e6f7g",
        name: "Ceramic Coffee Mug",
        wholesaleAvailable: true,
        description: "350ml ceramic coffee mug, dishwasher safe and microwave safe.",
        price: 12,
        category: {
            name: "Kitchen",
            img: "uploads/img/1739953905028-mug.png"
        },
        quantity: 150,
        variantImages: {
            white: ["uploads/variants_white/1739955981750-mug_white.png"],
            black: ["uploads/variants_black/1739955981751-mug_black.png"]
        },
        variantColors: ["white", "black"]
    },
];



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