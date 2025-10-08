import { cartResponse } from "../types/cart";

export const mockCartData: cartResponse = {
    _id: "67b6c8ae09d6fae9038147f2",
    user: "67b560bcdd82cdb37b64997f",
    items: [
        {
            product_id: {
                _id: "67b5a1baf9ea1a1caf55eb7c",
                name: "Product name",
                product_image: "https://i.pinimg.com/736x/13/3f/f5/133ff5b154b5d95181cfff9c55962eb3.jpg",
                price: 4
            },
            quantity: 5,
            price: 20,
            _id: "67b6c8ae09d6fae9038147f3"
        },
        {
            product_id: {
                _id: "67b59f0d27e1a94d6bbef0a3",
                name: "product name 2",
                product_image: "https://i.pinimg.com/736x/a1/91/21/a191219d6dc7ba453577c71e8dcbbd1e.jpg",
                price: 10
            },
            quantity: 2,
            price: 20,
            _id: "67b6c9e1ca5e93b5b9588e55"
        }
    ],
    total_quantity: 7,
    total_price: 40,
}