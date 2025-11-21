"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "-/lib/store";
import { getBrands } from "-/lib/CounterSlice";
import Link from "next/link";

export default function BrandsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, isLoading, error } = useSelector(
    (state: RootState) => state.counterRed
  );

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  if (isLoading) return <p className="text-center py-10">Loading brands...</p>;
  if (error)
    return <p className="text-center text-red-500 py-10">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            href={`/brands/${brand._id}`} // ✅ clickable link
            key={brand._id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col items-center text-center"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="font-medium">{brand.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
