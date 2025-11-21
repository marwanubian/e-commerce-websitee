"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faTags, 
  faBox, 
  faSpinner, 
  faLayerGroup,
  faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import { productType } from "-/app/_interfaces/products";
import ProductGridSystem from "-/app/_components/productGridSystem/productGridSystem";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export default function CategoryDetailsPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        // ✅ get category details
        const catRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}`
        );
        setCategory(catRes.data.data);

        // ✅ get subcategories
        const subRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
        );
        setSubcategories(subRes.data.data);

        // ✅ get products in this category
        const productsRes = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
        );
        setProducts(productsRes.data.data);
      } catch (error) {
        console.error("❌ Error fetching category data", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCategoryData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} className="text-4xl text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading category details...</p>
      </div>
    </div>
  );
  
  if (!category) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <FontAwesomeIcon icon={faFolderOpen} className="text-6xl text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Category not found</h2>
        <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or may have been removed.</p>
        <Link 
          href="/categories" 
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Categories
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/categories" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-contain rounded-lg border border-gray-200 p-2"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
            <p className="text-gray-500 text-sm mb-4">Slug: {category.slug}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faLayerGroup} className="mr-2 text-indigo-500" />
                {subcategories.length} Subcategories
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faBox} className="mr-2 text-indigo-500" />
                {products.length} Products
              </div>
            </div>
          </div>
        </div>

        {/* Subcategories Section */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <FontAwesomeIcon icon={faTags} className="text-xl text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Subcategories</h2>
          </div>
          
          {subcategories.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FontAwesomeIcon icon={faFolderOpen} className="text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500">No subcategories in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map((sub) => (
                <Link key={sub._id} href={`/subcategories/${sub._id}`}>
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300 cursor-pointer text-center group">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                      <FontAwesomeIcon icon={faTags} className="text-indigo-600" />
                    </div>
                    <h3 className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{sub.slug}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <div className="flex items-center mb-6">
            <FontAwesomeIcon icon={faBox} className="text-xl text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Products in {category.name}
            </h2>
          </div>
          
          {products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FontAwesomeIcon icon={faBox} className="text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductGridSystem key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}