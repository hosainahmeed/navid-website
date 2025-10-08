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


interface cartResponse {
  _id: string,
  user: string,
  items: Item[],
  total_quantity: number,
  total_price: number,
}

interface Item {
  product_id: {
    _id: string,
    name: string,
    product_image: string,
    price: number
  },
  quantity: number,
  price: number,
  _id: string
}
