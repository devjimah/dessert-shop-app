import { useState, useMemo, useCallback } from 'react';
import type { Product, SortOption } from '../types';

interface UseFilterReturn {
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  categories: string[];
  filteredItems: Product[];
  resetFilters: () => void;
}

export default function useFilter(items: Product[]): UseFilterReturn {
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = [...new Set(items.map(item => item.category))];
    return ['all', ...cats.sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (filterCategory !== 'all') {
      result = result.filter(item => item.category === filterCategory);
    }

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
