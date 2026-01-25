import React, { memo } from 'react';
import { useCart } from '../context/CartContext';

const Cart = memo(function Cart({ confirmOrder }) {
  const { cartItems, removeFromCart, totalItems, cartTotal, tax, deliveryFee, orderTotal } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl self-start w-full lg:w-[384px]">
      <h2 className="text-red font-bold text-2xl mb-6">Your Cart ({totalItems})</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
          <p className="text-rose-500 text-sm font-semibold mt-4">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between border-b border-rose-100 pb-4">
                <div className="flex flex-col gap-1">
                  <h4 className="text-rose-900 font-semibold text-sm">{item.name}</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-red font-semibold">{item.quantity}x</span>
                    <span className="text-rose-500">@ ${item.price.toFixed(2)}</span>
                    <span className="text-rose-500 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.name)}
                  className="w-5 h-5 flex items-center justify-center rounded-full border border-rose-300 hover:border-rose-900 text-rose-300 hover:text-rose-900 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="currentColor" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-rose-100 flex flex-col gap-3">
             <div className="flex items-center justify-between">
              <span className="text-rose-900 text-sm">Subtotal</span>
              <span className="text-rose-900 font-semibold text-lg">${cartTotal.toFixed(2)}</span>
            </div>
             <div className="flex items-center justify-between">
              <span className="text-rose-900 text-sm">Tax (8%)</span>
              <span className="text-rose-900 font-semibold text-lg">${tax.toFixed(2)}</span>
            </div>
             <div className="flex items-center justify-between">
              <span className="text-rose-900 text-sm">Delivery</span>
              <span className="text-rose-900 font-semibold text-lg">${deliveryFee.toFixed(2)}</span>
            </div>
            
            <div className="h-px bg-rose-100 my-2"></div>

            <div className="flex items-center justify-between">
              <span className="text-rose-900 text-sm">Order Total</span>
              <span className="text-rose-900 font-bold text-2xl">${orderTotal.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 bg-rose-50 p-4 rounded-lg mt-4">
                <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
                <p className="text-rose-900 text-sm">This is a <span className="font-semibold">carbon-neutral</span> delivery</p>
            </div>

            <button 
                onClick={confirmOrder}
                className="w-full bg-red hover:bg-red-dark text-white font-semibold py-4 rounded-full transition-colors mt-4"
            >
                Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export default Cart;
