import React, { memo } from 'react';
import ProductCard from './ProductCard';

const ProductList = memo(function ProductList({ products }) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-rose-900 mb-8">Desserts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product.name}
            product={product}
          />
        ))}
      </div>
    </div>
  );
});

export default ProductList;
