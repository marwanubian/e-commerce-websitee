"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const CategoryDropdown = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
        setCategories(
          data.data.map((cat: any) => ({
            _id: cat._id,
            name: cat.name,
            slug: cat.name.toLowerCase().replace(/\s+/g, "-"),
          }))
        );
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="relative group">
      {/* Trigger Button */}
      <button
        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 font-medium"
      >
        <span>Categories</span>
        <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
      </button>

      {/* Dropdown Menu */}
      {isCategoryOpen && (
        <div className="absolute left-0 mt-2 w-52 bg-white shadow-lg rounded-lg py-2 z-50">
          {categories.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
          ) : (
            <>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/categories/${cat._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                >
                  {cat.name}
                </Link>
              ))}

              {/* View All Categories */}
              <div className="border-t mt-2 pt-2">
                <Link
                  href="/categories"
                  className="block px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  View All Categories →
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
