import { useState, useMemo, useCallback } from 'react';

export default function useFilter(items) {
  const [sortBy, setSortBy] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category))];
    return ['all', ...cats.sort()];
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter(item => item.category === filterCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [items, filterCategory, sortBy]);

  const resetFilters = useCallback(() => {
    setSortBy('default');
    setFilterCategory('all');
  }, []);

  return {
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    categories,
    filteredItems,
    resetFilters
  };
}
