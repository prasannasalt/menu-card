"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddMenu = () => {
  const [menuName, setMenuName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const categoryOptions = [
    "starter",
    "main course",
    "dessert",
    "beverage",
    "snack",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMenuItem = { menuName, category, price, image };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenuItem),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setErrorMessage(data.message || "Failed to add menu item.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Error adding menu item.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Add New Menu Item</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Menu Name"
          className="w-full p-2 mb-4 border rounded"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          required
        />

        <select
          className="w-full p-2 mb-4 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 mb-4 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-2 mb-4 border rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit" className="bg-sky-500 text-white p-2 rounded">
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
