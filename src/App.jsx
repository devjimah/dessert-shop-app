import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmedModal from './components/OrderConfirmedModal';
import data from '../data.json';
import { CartProvider, useCart } from './context/CartContext';

function AppContent() {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { clearCart } = useCart();

  const confirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const startNewOrder = () => {
    clearCart();
    setIsOrderConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-rose-50 py-20 px-4 md:px-10 font-display relative">
      {isOrderConfirmed && (
        <OrderConfirmedModal 
          startNewOrder={startNewOrder} 
        />
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ProductList products={data} />
        </div>
        <Cart confirmOrder={confirmOrder} />
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
