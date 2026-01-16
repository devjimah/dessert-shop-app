import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmedModal from './components/OrderConfirmedModal';
import data from '../data.json';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productName) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === productName);
      if (existing.quantity === 1) {
        return prev.filter(item => item.name !== productName);
      }
      return prev.map(item => 
        item.name === productName 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  const removeFromCart = (productName) => {
    setCartItems(prev => prev.filter(item => item.name !== productName));
  };

  const confirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const startNewOrder = () => {
    setCartItems([]);
    setIsOrderConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-rose-50 py-20 px-4 md:px-10 font-display relative">
      {isOrderConfirmed && (
        <OrderConfirmedModal 
          cartItems={cartItems} 
          startNewOrder={startNewOrder} 
        />
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ProductList 
            products={data} 
            cartItems={cartItems} 
            addToCart={addToCart} 
            decreaseQuantity={decreaseQuantity}
          />
        </div>
        <Cart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          confirmOrder={confirmOrder}
        />
      </div>
    </div>
  );
}

export default App;
