import { memo } from 'react';
import { useCart } from '../context/CartContext';

interface CheckoutSummaryProps {
  onBack: () => void;
  onConfirmOrder: () => void;
}

const CheckoutSummary = memo(function CheckoutSummary({ onBack, onConfirmOrder }: CheckoutSummaryProps) {
  const { cartItems, cartTotal, tax, deliveryFee, orderTotal, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-rose-50 py-20 px-4 md:px-10">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold text-rose-900 mb-6">Checkout</h1>
          <p className="text-rose-500 text-center py-8">Your cart is empty</p>
          <button
            onClick={onBack}
            className="w-full bg-rose-100 hover:bg-rose-200 text-rose-900 font-semibold py-3 rounded-full transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 py-20 px-4 md:px-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-rose-500 hover:text-rose-900 mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path fill="currentColor" d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Back to Shop
        </button>

        <div className="bg-white p-8 rounded-xl">
          <h1 className="text-3xl font-bold text-rose-900 mb-2">Checkout Summary</h1>
          <p className="text-rose-500 mb-8">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>

          <div className="border-b border-rose-100 pb-6 mb-6">
            <h2 className="font-semibold text-rose-900 mb-4">Order Items</h2>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <img 
                    src={item.image?.thumbnail} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-rose-900">{item.name}</h3>
                    <p className="text-sm text-rose-500">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="font-semibold text-rose-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex justify-between text-rose-900">
              <span>Subtotal</span>
              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-rose-900">
              <span>Tax (8%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-rose-900">
              <span>Delivery Fee</span>
              <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-rose-100 my-2"></div>
            <div className="flex justify-between text-rose-900">
              <span className="font-bold text-lg">Order Total</span>
              <span className="font-bold text-2xl">${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 bg-rose-50 p-4 rounded-lg mb-6">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
            <p className="text-rose-900 text-sm">
              This is a <span className="font-semibold">carbon-neutral</span> delivery
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onConfirmOrder}
              className="w-full bg-red hover:bg-red-dark text-white font-semibold py-4 rounded-full transition-colors"
            >
              Confirm Order
            </button>
            <button
              onClick={onBack}
              className="w-full bg-rose-100 hover:bg-rose-200 text-rose-900 font-semibold py-3 rounded-full transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CheckoutSummary;
