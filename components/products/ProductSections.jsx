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

        const productList = Array.isArray(data)
          ? data
          : data.products;

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
      <section id="সব-পণ্য" className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="সব-পণ্য" className="mx-auto max-w-7xl px-4 py-12">
        <p className="text-red-600">{error}</p>
        <p className="mt-2 text-sm text-gray-500">
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

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            📈 আজ দাম বেড়েছে
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            যেসব পণ্যের দাম আজ বেড়েছে
          </p>
        </div>

        {risingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {risingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">দাম বেড়েছে এমন পণ্য পাওয়া যায়নি।</p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            📉 আজ দাম কমেছে
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            যেসব পণ্যের দাম আজ কমেছে
          </p>
        </div>

        {fallingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fallingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">দাম কমেছে এমন পণ্য পাওয়া যায়নি।</p>
        )}
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl px-4 py-12 sm:py-16"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            বাজারের সর্বশেষ তথ্য
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            সব পণ্য
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

