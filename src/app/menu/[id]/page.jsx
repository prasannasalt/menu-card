"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api/v1";

const MenuDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [menuItem, setMenuItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/menu/${id}`);
        const data = await res.json();

        if (!data.success || !data.data) {
          setErrorMessage(data.message || "Item not found");
        } else {
          setMenuItem(data.data);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to fetch item details");
      }
    };

    if (id) {
      fetchMenuItem();
    }
  }, [id]);

  if (errorMessage) {
    return <div className="text-red-500 text-center mt-6">{errorMessage}</div>;
  }

  if (!menuItem) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-6">
      <button
        onClick={() => router.back()}
        className="text-sm mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* {menuItem.image && (
          <div className="w-full md:w-1/2">
            <Image
              src={menuItem.image}
              alt={menuItem.menuName}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        )} */}

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold text-sky-700">
            {menuItem.menuName}
          </h1>
          <p className="text-gray-700 text-lg">
            <span className="font-medium">Category:</span> {menuItem.category}
          </p>
          <p className="text-sky-600 text-2xl font-semibold">
            ₹{menuItem.price}
          </p>
          <p className="text-gray-600">
            Delicious {menuItem.description} prepared with the finest
            ingredients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailPage;
