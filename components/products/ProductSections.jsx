"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.products;

        if (!Array.isArray(productList)) {
          throw new Error("API response-এর format সঠিক নয়।");
        }

        setProducts(productList);
      } catch (err) {
        setError(err.message || "কিছু একটা সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
      >
        <p className="text-sm text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="সব-পণ্য"
        className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
      >
        <p className="text-sm text-red-600">{error}</p>
        <p className="mt-2 text-xs text-gray-500">
          API সাময়িকভাবে unavailable হতে পারে। কিছুক্ষণ পরে আবার চেষ্টা করো।
        </p>
      </section>
    );
  }

  const risingProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort((a, b) => (b.change?.pct ?? 0) - (a.change?.pct ?? 0))
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort((a, b) => (a.change?.pct ?? 0) - (b.change?.pct ?? 0))
    .slice(0, 6);

  const sections = [
    {
      title: "আজ দাম বেড়েছে",
      icon: "▲",
      products: risingProducts,
      emptyMessage: "দাম বেড়েছে এমন পণ্য পাওয়া যায়নি।",
    },
    {
      title: "আজ দাম কমেছে",
      icon: "▼",
      products: fallingProducts,
      emptyMessage: "দাম কমেছে এমন পণ্য পাওয়া যায়নি।",
    },
  ];

  return (
    <div className="bg-[#f0f5f1]">
      {sections.map((section) => (
        <section
          key={section.title}
          className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6"
        >
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-[#263229] sm:text-lg">
            <span
              className={
                section.icon === "▲" ? "text-red-500" : "text-green-600"
              }
            >
              {section.icon}
            </span>
            {section.title}
          </h2>

          {section.products.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {section.emptyMessage}
            </p>
          )}
        </section>
      ))}

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-5xl scroll-mt-4 px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#263229] sm:text-xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            বাজারের সর্বশেষ পণ্যের দাম
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

