import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmedModal from './components/OrderConfirmedModal';
import NotificationBanner from './components/NotificationBanner';
import CheckoutSummary from './views/CheckoutSummary';
import data from '../data.json';
import { CartProvider, useCart } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import type { Product } from './types';

type ViewType = 'shop' | 'checkout';

function AppContent() {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('shop');
  const { clearCart } = useCart();

  const confirmOrder = (): void => {
    setIsOrderConfirmed(true);
    setCurrentView('shop');
  };

  const startNewOrder = (): void => {
    clearCart();
    setIsOrderConfirmed(false);
  };

  const goToCheckout = (): void => {
    setCurrentView('checkout');
  };

  const goToShop = (): void => {
    setCurrentView('shop');
  };

  // Checkout Summary View
  if (currentView === 'checkout') {
    return (
      <>
        <NotificationBanner />
        <CheckoutSummary 
          onBack={goToShop} 
          onConfirmOrder={confirmOrder} 
        />
        {isOrderConfirmed && (
          <OrderConfirmedModal startNewOrder={startNewOrder} />
        )}
      </>
    );
  }

  // Main Shop View
  return (
    <div className="min-h-screen bg-rose-50 py-20 px-4 md:px-10 font-display relative">
      <NotificationBanner />
      {isOrderConfirmed && (
        <OrderConfirmedModal 
          startNewOrder={startNewOrder} 
        />
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ProductList products={data as Product[]} />
        </div>
        <Cart confirmOrder={confirmOrder} goToCheckout={goToCheckout} />
      </div>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;
