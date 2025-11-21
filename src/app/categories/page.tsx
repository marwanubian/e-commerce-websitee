"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faTags, faImage } from "@fortawesome/free-solid-svg-icons";
import CategoryCard from "../_components/CategoryCard/CategoryCard";

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error fetching categories ❌", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  if (loading) return <p className="text-center">Loading categories...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <FontAwesomeIcon icon={faLayerGroup} className="text-3xl text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Product Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of product categories. Find exactly what you're looking for from our curated collections.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <FontAwesomeIcon icon={faTags} className="text-5xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No categories available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {categories.map((cat) => (
    <CategoryCard
      key={cat._id}
      id={cat._id}
      name={cat.name}
      image={cat.image}
    />
  ))}
</div>
        </div>
      )}
    </div>
  );
}
