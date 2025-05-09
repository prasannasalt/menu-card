"use client";

import Image from "next/image";
import Link from "next/link";

const MenuCard = (props) => {
  const { _id, menuName, price, image } = props?.item;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {image && (
        <Image
          src="/veg-thali.jpg"
          alt={menuName}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <h3 className="text-xl font-semibold mt-4">{menuName}</h3>
      <p className="text-sky-600 text-lg">{price} INR</p>

      <Link href={`/menu/${_id}`}>
        <button className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default MenuCard;
