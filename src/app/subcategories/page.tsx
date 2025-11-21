"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // parent category id
}

export default function SubcategoriesPage() {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/subcategories");
        setSubcategories(res.data.data);
      } catch (error) {
        console.error("❌ Error fetching subcategories", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubcategories();
  }, []);

  if (loading) return <p className="text-center">Loading subcategories...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Subcategories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {subcategories.map((sub) => (
          <Link key={sub._id} href={`/subcategories/${sub._id}`}>
            <div className="border rounded-lg p-4 shadow hover:scale-105 transition cursor-pointer">
              <h3 className="text-center font-medium">{sub.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Category: {sub.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
