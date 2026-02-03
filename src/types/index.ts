export interface ProductImage {
  thumbnail?: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
}

export interface Product {
  image?: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type SortOption = 'default' | 'price-low' | 'price-high' | 'name-az' | 'name-za';

export interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productName: string) => void;
  removeFromCart: (productName: string) => void;
  clearCart: () => void;
  totalItems: number;
  cartTotal: number;
  tax: number;
  deliveryFee: number;
  orderTotal: number;
}

export interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: number) => void;
}
