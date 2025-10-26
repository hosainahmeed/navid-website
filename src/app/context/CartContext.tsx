"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { CartContextType, CartItem } from "../types/cart";
import { Toaster } from 'react-hot-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const totalQuantity = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const addToCart = useCallback((id: string, quantity: number = 1) => {
        setCartItems((prev: any) => {
            const existing = prev.find((i: any) => i.id === id);
            if (existing) {
                return prev.map((i: any) =>
                    i.id === id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...prev, { id, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCartItems((prev: any) => prev.filter((item: any) => item.id !== id));
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    const value = useMemo(
        () => ({
            cartItems,
            totalQuantity,
            addToCart,
            removeFromCart,
            clearCart,
        }),
        [cartItems, totalQuantity, addToCart, removeFromCart, clearCart]
    );

    return <CartContext.Provider value={value}>
          <Toaster />
        {children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};
