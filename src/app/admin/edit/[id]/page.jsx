"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditMenu = () => {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    menuName: "",
    category: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${id}`
        );
        const data = await res.json();
        if (data.success) {
          const { menuName, category, price, image } = data.data;
          setForm({ menuName, category, price, image });
        } else {
          setError(data.message || "Failed to load data.");
        }
      } catch {
        setError("Failed to fetch item.");
      }
    };
    if (id) fetchItem();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Failed to update item.");
      }
    } catch {
      setError("Error updating item.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Menu Item</h1>

      <button
        onClick={() => router.back()}
        className="text-sm mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="menuName"
          value={form.menuName}
          onChange={handleChange}
          placeholder="Menu Name"
          required
          className="border p-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border p-2 rounded"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditMenu;
