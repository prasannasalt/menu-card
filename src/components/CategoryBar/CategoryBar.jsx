const CategoryBar = ({ categories, onSelectCategory }) => (
    <div className="flex gap-4 overflow-x-auto p-4">
      <button
        className="text-sky-600 hover:text-sky-800"
        onClick={() => onSelectCategory('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className="text-sky-600 hover:text-sky-800"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
  
  export default CategoryBar;
  