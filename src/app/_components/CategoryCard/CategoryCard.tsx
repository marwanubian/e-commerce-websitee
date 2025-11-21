"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faImage, 
  faArrowRight, 
  faLayerGroup 
} from "@fortawesome/free-solid-svg-icons";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
}

export default function CategoryCard({ id, name, image }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/categories/${id}`}>
      <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 hover:-translate-y-1 transform transition-transform">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          {!imageError ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>
              )}
              
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className={`w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 p-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 group-hover:bg-gray-300 transition-colors">
                <FontAwesomeIcon icon={faLayerGroup} className="text-2xl text-gray-500" />
              </div>
              <span className="text-sm text-gray-500">Image not available</span>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5 border-t border-gray-100 group-hover:border-indigo-100 transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors line-clamp-2">
              {name}
            </h3>
            
            {/* Arrow Icon - appears on hover */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <FontAwesomeIcon 
                  icon={faArrowRight} 
                  className="text-indigo-600 text-xs group-hover:text-white transition-colors" 
                />
              </div>
            </div>
          </div>
          
          {/* View Details Text - appears on hover */}
          <div className="mt-2">
            <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View products
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}