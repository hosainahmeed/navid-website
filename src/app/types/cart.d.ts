export interface CartItem {
    id: string;
    quantity: number;
  }
  
  export interface CartContextType {
    cartItems: CartItem[];
    totalQuantity: number;
    addToCart: (id: string, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
  }
  