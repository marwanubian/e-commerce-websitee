"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type ResultItem = {
  _id: string;
  title: string;
  image?: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Debounced fetch with AbortController and normalization
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;
    let didCancel = false;

    const fetchResults = async () => {
      setLoading(true);
      setOpen(true);
      setSelectedIndex(-1);
      try {
        // primary attempt: keyword param (many APIs use this)
        const q = encodeURIComponent(query.trim());
        const url = `https://ecommerce.routemisr.com/api/v1/products?keyword=${q}`;
        const res = await fetch(url, { signal });

        if (!res.ok) {
          // if non-OK, stop and empty results
          console.warn("Search API returned non-OK:", res.status);
          if (!didCancel) setResults([]);
          return;
        }

        const data = await res.json();
        // normalize - try common shapes
        const list = data?.data ?? data?.products ?? data?.results ?? data ?? [];
        const items = (Array.isArray(list) ? list : [])
          .slice(0, 10) // limit
          .map((p: any) => ({
            _id: p._id ?? p.id ?? p.productId ?? p.slug ?? JSON.stringify(p).slice(0, 8),
            title: p.title ?? p.name ?? p.productName ?? p.slug ?? String(p._id ?? p.id ?? ""),
            image: p.imageCover ?? p.image ?? p.images?.[0] ?? p.thumbnail ?? "",
          }));

        if (!didCancel) setResults(items);
      } catch (err: any) {
        if (err.name === "AbortError") {
          // request aborted, ignore
        } else {
          console.error("Search fetch error:", err);
          if (!didCancel) setResults([]);
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 450); // debounce 450ms

    return () => {
      didCancel = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  // click outside -> close dropdown
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        router.push(`/products/${results[selectedIndex]._id}`);
        setOpen(false);
      } else {
        // go to search page as fallback
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
        <input
          type="text"
          value={query}
          placeholder="Search products..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length) setOpen(true); }}
          onKeyDown={onKeyDown}
          className="w-full px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          onClick={() => {
            // immediate navigate to search page
            if (query.trim().length > 0) router.push(`/search?query=${encodeURIComponent(query.trim())}`);
          }}
          className="bg-indigo-600 px-4 py-2 text-white"
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {loading ? (
            <p className="px-4 py-2 text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            results.map((product, idx) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className={`flex items-center px-4 py-2 hover:bg-indigo-50 transition ${
                  idx === selectedIndex ? "bg-indigo-50" : ""
                }`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onMouseLeave={() => setSelectedIndex(-1)}
                onClick={() => setOpen(false)}
              >
                <img
                  src={product.image || "/images/placeholder-100.png"}
                  alt={product.title}
                  className="w-10 h-10 object-cover rounded mr-3"
                />
                <span className="text-gray-700 text-sm truncate">{product.title}</span>
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
