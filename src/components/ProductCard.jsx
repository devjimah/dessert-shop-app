import React, { useMemo, memo } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = memo(function ProductCard({ product }) {
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  
  const quantity = useMemo(() => {
     const item = cartItems.find(item => item.name === product.name);
     return item ? item.quantity : 0;
  }, [cartItems, product.name]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col items-center">
        <div className={`relative w-full overflow-hidden rounded-lg ${quantity > 0 ? 'ring-2 ring-red' : ''}`}>
          {product.image ? (
            <picture>
              <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
              <source media="(min-width: 768px)" srcSet={product.image.tablet} />
              <img 
                src={product.image.mobile} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </picture>
          ) : (
            <div className="w-full h-60 bg-rose-100 flex items-center justify-center text-rose-400">
              <span className="text-sm">Image Unavailable</span>
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
            <div className="flex items-center justify-between bg-red rounded-full py-3 px-3 w-[160px]">
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
        <p className="text-rose-500 text-sm">{product.category}</p>
        <h3 className="text-rose-900 font-semibold text-base">{product.name}</h3>
        <p className="text-red font-semibold text-base">
          {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Price Unavailable'}
        </p>
      </div>
    </div>
  );
});

export default ProductCard;
