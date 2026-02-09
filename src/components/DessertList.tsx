import DessertCard from './DessertCard';
import { Product, CartItem } from '../types';

interface DessertListProps {
  readonly products?: Product[];
  readonly cartItems: CartItem[];
  readonly addToCart: (product: Product) => void;
  readonly decreaseQuantity: (productName: string) => void;
}

export default function DessertList({ products = [], cartItems, addToCart, decreaseQuantity }: DessertListProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-rose-900 mb-8">Desserts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <DessertCard 
              key={product.name}
              product={product}
              cartItem={cartItems.find(item => item.name === product.name)}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
            />
          ))
        ) : (
          <p className="text-rose-500">No desserts available.</p>
        )}
      </div>
    </div>
  );
}
