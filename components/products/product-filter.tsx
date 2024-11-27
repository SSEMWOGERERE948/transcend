interface ProductFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
  }
  
  export function ProductFilter({
    categories,
    selectedCategory,
    onCategoryChange,
  }: ProductFilterProps) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    );
  }