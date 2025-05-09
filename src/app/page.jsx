"use client";
import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard/MenuCard";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import SearchBar from "../components/SearchBar/SearchBar";

export default function HomePage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/menu`);
        const data = await res.json();
        if (!data.data || data.data.length === 0) {
          setErrorMessage("No menu items available.");
          setMenus([]);
          setFilteredMenus([]);
        } else {
          setErrorMessage("");
          setMenus(data.data);
          setFilteredMenus(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch menu items", err);
        setErrorMessage("Failed to fetch menu items. Please try again later.");
      }
    };

    fetchMenus();
  }, [BACKEND_URL]);

  useEffect(() => {
    const filterItems = () => {
      let items = [...menus];

      if (selectedCategory !== "All") {
        items = items.filter((item) => item.category === selectedCategory);
      }

      if (searchTerm) {
        items = items.filter((item) =>
          item.menuName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredMenus(items);
    };

    filterItems();
  }, [menus, selectedCategory, searchTerm]);

  const categories = Array.from(new Set(menus.map((item) => item.category)));

  return (
    <main className="p-6 bg-sky-50 min-h-screen">
      <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
        Hotel Menu Card
      </h1>

      {errorMessage ? (
        <p className="text-center text-red-500 font-medium">{errorMessage}</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
            />
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>

          {filteredMenus.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredMenus.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No matching menu items.</p>
          )}
        </>
      )}
    </main>
  );
}
