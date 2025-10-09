import { IBanner, Iproduct } from "../types/product";
import { IMAGE } from "./Image.index";

export const productData: Iproduct[] = [
    // Hookahs
    {
        _id: "2b3c4d5e6f7g8h9i0j1k",
        name: "Premium Stainless Steel Hookah",
        wholesaleAvailable: true,
        previous_price: 120,
        description: "Professional-grade stainless steel hookah with modern design and smooth smoking experience.",
        price: 99,
        category: {
            name: "Hookahs",
            img: "uploads/img/1739953905022-hookah.png"
        },
        quantity: 25,
        variantImages: {
            silver: {
                img: ["https://images.unsplash.com/photo-1630175772812-3368aad7982d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            gold: {
                img: ["uploads/variants_gold/1739955981739-hookah_gold.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            black: {
                img: ["uploads/variants_black/1739955981740-hookah_black.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["silver", "gold", "black"]
    },
    {
        _id: "3c4d5e6f7g8h9i0j1k2l",
        name: "Traditional Brass Hookah",
        wholesaleAvailable: false,
        previous_price: 85,
        description: "Classic brass hookah with intricate designs, perfect for traditional smoking sessions.",
        price: 75,
        category: {
            name: "Hookahs",
            img: "uploads/img/1739953905023-brass-hookah.png"
        },
        quantity: 15,
        variantImages: {
            brass: {
                img: ["https://images.unsplash.com/photo-1662805522314-d316b95046b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["brass"]
    },
    // Shisha
    {
        _id: "4d5e6f7g8h9i0j1k2l3m",
        name: "Double Apple Shisha Tobacco",
        wholesaleAvailable: true,
        previous_price: 25,
        description: "Premium double apple flavored shisha tobacco with rich flavor and thick smoke.",
        price: 20,
        category: {
            name: "Shisha",
            img: "uploads/img/1739953905024-double-apple.png"
        },
        quantity: 100,
        variantImages: {
            red: {
                img: ["https://images.unsplash.com/photo-1685345729575-7f059204c0cd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["red"]
    },
    {
        _id: "5e6f7g8h9i0j1k2l3m4n",
        name: "Mixed Fruit Shisha Pack",
        wholesaleAvailable: true,
        previous_price: 45,
        description: "Assorted fruit flavors including mint, grape, and watermelon. 250g each.",
        price: 38,
        category: {
            name: "Shisha",
            img: "uploads/img/1739953905025-mixed-fruit.png"
        },
        quantity: 75,
        variantImages: {
            mixed: {
                img: ["https://images.unsplash.com/photo-1651565109530-9821776eff7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["mixed"]
    },
    // Charcoals
    {
        _id: "6f7g8h9i0j1k2l3m4n5o",
        name: "Natural Coconut Charcoals",
        wholesaleAvailable: true,
        previous_price: 18,
        description: "100% natural coconut shell charcoals, long-lasting and odor-free.",
        price: 15,
        category: {
            name: "Charcoals",
            img: "uploads/img/1739953905026-coconut-charcoal.png"
        },
        quantity: 200,
        variantImages: {
            natural: {
                img: ["https://images.unsplash.com/photo-1715173677037-90248041e659?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["natural"]
    },
    {
        _id: "7g8h9i0j1k2l3m4n5o6p",
        name: "Quick Light Charcoal Box",
        wholesaleAvailable: false,
        previous_price: 12,
        description: "Easy to light charcoals, perfect for quick setup. Box of 50 pieces.",
        price: 10,
        category: {
            name: "Charcoals",
            img: "uploads/img/1739953905027-quick-light.png"
        },
        quantity: 150,
        variantImages: {
            standard: {
                img: ["https://images.unsplash.com/photo-1574238905104-ee98fd8a985a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["standard"]
    },
    // Hookah Bowls
    {
        _id: "8h9i0j1k2l3m4n5o6p7q",
        name: "Clay Phunnel Bowl",
        wholesaleAvailable: true,
        previous_price: 35,
        description: "High-quality clay phunnel bowl for even heat distribution and better flavor.",
        price: 28,
        category: {
            name: "Hookah Bowls",
            img: "uploads/img/1739953905028-phunnel-bowl.png"
        },
        quantity: 40,
        variantImages: {
            terra: {
                img: ["uploads/variants_terra/1739955981746-bowl_terra.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            brown: {
                img: ["uploads/variants_brown/1739955981747-bowl_brown.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["terra", "brown"]
    },
    {
        _id: "9i0j1k2l3m4n5o6p7q8r",
        name: "Silicone Hookah Bowl",
        wholesaleAvailable: true,
        previous_price: 22,
        description: "Durable silicone bowl, unbreakable and easy to clean. Various colors available.",
        price: 18,
        category: {
            name: "Hookah Bowls",
            img: "uploads/img/1739953905029-silicone-bowl.png"
        },
        quantity: 60,
        variantImages: {
            blue: {
                img: ["uploads/variants_blue/1739955981748-bowl_blue.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            red: {
                img: ["uploads/variants_red/1739955981749-bowl_red.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            black: {
                img: ["uploads/variants_black/1739955981750-bowl_black.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["blue", "red", "black"]
    },
    // Additional Hookah Accessories
    {
        _id: "0j1k2l3m4n5o6p7q8r9s",
        name: "Hookah Hose - Modern Design",
        wholesaleAvailable: true,
        previous_price: 30,
        description: "Flexible and washable hookah hose with modern aesthetic.",
        price: 25,
        category: {
            name: "Hookahs",
            img: "uploads/img/1739953905030-modern-hose.png"
        },
        quantity: 35,
        variantImages: {
            silver: {
                img: ["uploads/variants_silver/1739955981751-hose_silver.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            },
            black: {
                img: ["uploads/variants_black/1739955981752-hose_black.png"],
                size: ["small", "medium", "large"],
                quantity: 10
            }
        },
        variantColors: ["silver", "black"]
    }
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