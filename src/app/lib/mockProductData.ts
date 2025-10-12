import { ProductResponse } from "../types/product";


export const mockProductData: ProductResponse = {
    success: true,
    message: "product data retrieved successfully",
    data: {
        _id: "68c791f84f84b01c49a8e8b1",
        name: "Wireless Earbuds",
        description: "Compact wireless earbuds with noise cancellation and long battery life.",
        price: 39.99,
        category: {
            _id: "68c78fbc4f84b01c49a8e87a",
            name: "Electronics",
            img: "uploads/img/1757908924271-gadgets.png",
        },
        whole_sale: false,
        quantity: 176,
        previous_price: 39.99,
        variantImages: {
            black: {
                img: ["https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["33MM", "40MM"],
                quantity: 32,
            },
            gray: {
                img: ["https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["33MM", "40MM", "SMALL"],
                quantity: 144,
            },
        },
        banner: [
            "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        variantColors: ["black", "gray"],
    },
    related_product: [
        {
            _id: "68c791f84f84b01c49a8e8b1",
            name: "Wireless Earbuds",
            description: "Compact wireless earbuds with noise cancellation and long battery life.",
            price: 39.99,
            category: {
                name: "Electronics",
                img: "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            sub_category: "68c78fd84f84b01c49a8e884",
            whole_sale: false,
            quantity: 176,
            previous_price: 39.99,
            variantImages: {
                black: {
                    img: ["https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                    size: ["33MM", "40MM"],
                    quantity: 32,
                },
                gray: {
                    img: ["https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                    size: ["33MM", "40MM", "SMALL"],
                    quantity: 144,
                },
            },
            banner: [
                "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ],
            variantColors: ["black", "gray"],
        },
    ],
}
