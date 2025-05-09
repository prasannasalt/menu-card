const SearchBar = ({ value, onChange }) => (
    <div className="flex justify-center p-4">
      <input
        type="text"
        className="w-full max-w-md p-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-600"
        placeholder="Search for a dish..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
  
  export default SearchBar;
  