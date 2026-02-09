import { Product, CartItem } from '../types';

interface DessertCardProps {
  readonly product: Product;
  readonly cartItem?: CartItem;
  readonly addToCart: (product: Product) => void;
  readonly decreaseQuantity: (productName: string) => void;
}

export default function DessertCard({ product, cartItem, addToCart, decreaseQuantity }: DessertCardProps) {
  const quantity = cartItem ? cartItem.quantity : 0;
  
  if (!product) return null;

  const { image, name = "Unknown Dessert", category = "Uncategorized", price } = product;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col items-center">
        <div className={`relative w-full overflow-hidden rounded-lg ${quantity > 0 ? 'ring-2 ring-red' : ''}`}>
          {image ? (
            <picture>
              {image.desktop && <source media="(min-width: 1024px)" srcSet={image.desktop} />}
              {image.tablet && <source media="(min-width: 768px)" srcSet={image.tablet} />}
              <img 
                src={image.mobile || ''} 
                alt={name} 
                className="w-full h-auto object-cover"
              />
            </picture>
          ) : (
            <div className="w-full h-60 bg-rose-100 flex items-center justify-center text-rose-400">
              <span className="font-semibold">Image unavailable</span>
            </div>
          )}
        </div>
        
        <div className="absolute -bottom-5">
           {quantity === 0 ? (
            <button 
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-white border border-rose-400 rounded-full py-3 px-7 hover:border-red hover:text-red transition-colors"
            >
              <img src="/assets/images/icon-add-to-cart.svg" alt="" />
              <span className="text-rose-900 font-semibold text-sm">Add to Cart</span>
            </button>
           ) : (
            <div className="flex items-center justify-between bg-red rounded-full py-3 px-3 w-40">
              <button 
                onClick={() => decreaseQuantity(product.name)}
                className="group flex items-center justify-center w-5 h-5 rounded-full border border-white hover:bg-white transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2" className="fill-white group-hover:fill-red"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
              </button>
              <span className="text-white font-semibold text-sm">{quantity}</span>
              <button 
                onClick={() => addToCart(product)}
                className="group flex items-center justify-center w-5 h-5 rounded-full border border-white hover:bg-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10" className="fill-white group-hover:fill-red"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </button>
            </div>
           )}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-rose-500 text-sm">{category}</p>
        <h3 className="text-rose-900 font-semibold text-base">{name}</h3>
        <p className="text-red font-semibold text-base">
          {typeof price === 'number' ? `$${price.toFixed(2)}` : 'Price unavailable'}
        </p>
      </div>
    </div>
  );
}
