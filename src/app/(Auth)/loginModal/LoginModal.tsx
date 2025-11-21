"use client";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function LoginModal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          You need to log in to access this page.
        </p>
        <Link
          href="/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center justify-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
