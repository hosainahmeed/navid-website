export interface OrderProduct {
    _id: string;
    name: string;
}

export interface OrderVariant {
    _id: string;
    img: string[];
    color: string;
    size: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface OrderItem {
    _id: string;
    product: OrderProduct;
    variant: OrderVariant;
    quantity: number;
}

export interface DeliveryAddress {
    _id: string;
    address: string;
    phone: string;
    name: string;
}
export interface PickupAddress {
    _id: string;
    address: string;
    phone: string;
    name: string;
}

export interface Order {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    items: OrderItem[];
    payment_status: string;
    total_amount: number;
    delivery_status: string;
    delivery_address: DeliveryAddress | null;
    pick_up_address: PickupAddress | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}