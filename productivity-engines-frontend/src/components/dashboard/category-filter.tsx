'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategories, 
  onChange 
}: CategoryFilterProps) {
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };
  
  const clearAll = () => {
    onChange([]);
  };
  
  const selectAll = () => {
    onChange([...categories]);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter by Category</h3>
        <div className="flex gap-2">
          <button 
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Clear All
          </button>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <button 
            onClick={selectAll}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Select All
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategories.includes(category)
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}