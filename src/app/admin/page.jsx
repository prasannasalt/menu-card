"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminList = () => {
  const [menus, setMenus] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/menu`);
        const data = await res.json();
        if (data.success) {
          setMenus(data.data);
        } else {
          setErrorMessage(data.message || "Failed to fetch menu items");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Failed to fetch menu items.");
      }
    };
    fetchMenus();
  }, []);

  const handleEdit = (id) => router.push(`/admin/edit/${id}`);
  const handleView = (id) => router.push(`/admin/view/${id}`);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this menu item?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/menu/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (data.success) {
          setMenus(menus.filter((menu) => menu._id !== id));
        } else {
          alert(data.message || "Failed to delete menu item");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting menu item");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Admin - Menu Listing</h1>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => router.push("/admin/add")}
          className="bg-sky-500 text-white p-2 rounded mb-4"
        >
          Add New Menu
        </button>

        <button
          onClick={() => router.push("/")}
          className="bg-sky-500 text-white p-2 rounded mb-4"
        >
          Home Page
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menus.map((menu) => (
          <div key={menu._id} className="bg-white p-4 rounded shadow">
            {/* <Image
              src={menu.image}
              alt={menu.menuName}
              width={400}
              height={300}
              className="w-full h-40 object-cover rounded mb-4"
            /> */}
            <h2 className="font-semibold text-xl">{menu.menuName}</h2>
            <p className="text-sky-600">{menu.price} INR</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleView(menu._id)}
                className="bg-green-500 text-white py-1 px-4 rounded"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(menu._id)}
                className="bg-sky-500 text-white py-1 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(menu._id)}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
