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


export interface CartItem {
  product_id: string,
  variant: string,
  quantity: number,
  price: number,
  size: string,
}