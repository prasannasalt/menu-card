"use client";

export default function CategoryFilter({ selectedCategory, onSelectCategory, categories = [] }) {
  const allCategories = ["All", ...new Set(categories)];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full border transition-all duration-200 ${
            selectedCategory === category
              ? "bg-sky-500 text-white border-sky-500"
              : "bg-white text-sky-700 border-sky-300 hover:bg-sky-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
