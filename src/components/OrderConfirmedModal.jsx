import React, { useMemo } from 'react';

export default function OrderConfirmedModal({ cartItems, startNewOrder }) {
  const totalPrice = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cartItems]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 md:p-10 rounded-t-xl md:rounded-xl flex flex-col gap-8 w-full md:w-175 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex flex-col gap-6 items-start">
            <img src="/assets/images/icon-order-confirmed.svg" alt="Order Confirmed" className="w-12 h-12" />
            <div className="flex flex-col gap-2">
                <h2 className="text-rose-900 font-bold text-[40px] leading-[1.2]">Order Confirmed</h2>
                <p className="text-rose-500 text-base">We hope you enjoy your food!</p>
            </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-lg">
            <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                    <div key={item.name}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={item.image.thumbnail} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-rose-900 font-semibold text-sm truncate max-w-[150px] sm:max-w-[200px]">{item.name}</h4>
                                    <div className="flex gap-2 text-sm">
                                        <span className="text-red font-semibold">{item.quantity}x</span>
                                        <span className="text-rose-500">@ ${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-rose-900 font-semibold text-base">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="h-px bg-rose-100 w-full mt-4"></div>
                    </div>
                ))}
            </div>
            
            <div className="flex items-center justify-between mt-6">
                <span className="text-rose-900 text-sm">Order Total</span>
                <span className="text-rose-900 font-bold text-2xl">${totalPrice.toFixed(2)}</span>
            </div>
        </div>

        <button 
            onClick={startNewOrder}
            className="w-full bg-red hover:bg-red-dark text-white font-semibold py-4 rounded-full transition-colors"
        >
            Start New Order
        </button>
      </div>
    </div>
  );
}
