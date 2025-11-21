"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function SubcategoryDetailsPage() {
  const { id } = useParams();
  const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubcategoryAndProducts() {
      try {
        // fetch subcategory info
        const subRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
        );
        setSubcategory(subRes.data.data);

        // fetch products in this subcategory
        const productsRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`
        );
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error("❌ Error fetching subcategory or products", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchSubcategoryAndProducts();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!subcategory) return <p className="text-center text-red-500">Subcategory not found ❌</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      {/* Subcategory Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{subcategory.name}</h1>
        <p className="text-gray-500">Slug: {subcategory.slug}</p>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-semibold mb-4">
        Products in {subcategory.name}
      </h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found for this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border p-4 rounded-lg shadow hover:scale-105 transition cursor-pointer">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-3"
                />
                <h3 className="font-medium text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-primary font-bold mt-2">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
