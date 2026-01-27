import React, { memo } from 'react';
import ProductCard from './ProductCard';
import useFilter from '../hooks/useFilter';

const ProductList = memo(function ProductList({ products }) {
  const { 
    sortBy, 
    setSortBy, 
    filterCategory, 
    setFilterCategory, 
    categories, 
    filteredItems,
    resetFilters 
  } = useFilter(products);

  return (
    <div>
      <h1 className="text-4xl font-bold text-rose-900 mb-6">Desserts</h1>
      
      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-lg">
        <div className="flex items-center gap-2">
          <label htmlFor="category" className="text-sm font-medium text-rose-900">
            Category:
          </label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-rose-200 rounded-lg text-sm text-rose-900 bg-white focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-rose-900">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-rose-200 rounded-lg text-sm text-rose-900 bg-white focus:outline-none focus:ring-2 focus:ring-red focus:border-transparent"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A to Z</option>
            <option value="name-za">Name: Z to A</option>
          </select>
        </div>

        {(filterCategory !== 'all' || sortBy !== 'default') && (
          <button
            onClick={resetFilters}
            className="px-3 py-2 text-sm text-red hover:text-red-dark font-medium transition-colors"
          >
            Reset Filters
          </button>
        )}

        <span className="ml-auto text-sm text-rose-500">
          {filteredItems.length} dessert{filteredItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-rose-500 text-lg">No desserts found matching your criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-6 py-2 bg-red text-white rounded-full hover:bg-red-dark transition-colors"
          >
            Show All Desserts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredItems.map((product) => (
            <ProductCard 
              key={product.name}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ProductList;
