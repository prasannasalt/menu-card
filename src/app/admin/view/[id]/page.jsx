"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const ViewMenu = () => {
  const { id } = useParams();
   const router = useRouter();
  const [menuItem, setMenuItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${id}`
        );
        const data = await res.json();
        if (data.success) {
          setMenuItem(data.data);
        } else {
          setError(data.message || "Item not found.");
        }
      } catch (err) {
        setError("Error fetching item.");
      }
    };
    if (id) fetchItem();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!menuItem) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded shadow">
      <button
        onClick={() => router.back()}
        className="text-sm mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{menuItem.menuName}</h1>
      <p className="text-gray-600 mb-2">Category: {menuItem.category}</p>
      <p className="text-blue-600 font-semibold mb-4">{menuItem.price} INR</p>
      {menuItem.image && (
        <img
          src={menuItem.image}
          alt={menuItem.menuName}
          className="w-full rounded"
        />
      )}
    </div>
  );
};

export default ViewMenu;
