"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const categoryNames = {
chal: "চাল",
dal: "ডাল",
tel: "তেল",
mach: "মাছ",
mangsho: "মাংস",
sobji: "সবজি",
fol: "ফল",
mosla: "মসলা",
};

const categoryIcons = {
chal: "🌾",
dal: "🫘",
tel: "🫗",
mach: "🐟",
mangsho: "🥩",
sobji: "🥬",
fol: "🍎",
mosla: "🌶️",
};

const unitNames = {
kg: "কেজি",
liter: "লিটার",
piece: "টি",
dozen: "ডজন",
};

const formatPrice = (value) =>
new Intl.NumberFormat("bn-BD").format(value);

export default function CategoryPage() {
const params = useParams();
const slug = params.slug;

const [products, setProducts] = useState([]);
const [sort, setSort] = useState("default");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const validCategory = Object.hasOwn(categoryNames, slug);

useEffect(() => {
if (!validCategory) {
setProducts([]);
setError("এই ক্যাটাগরিটি পাওয়া যায়নি।");
setLoading(false);
return;
}


const controller = new AbortController();

async function getProducts() {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products?category=${encodeURIComponent(slug)}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error("পণ্য লোড করা যায়নি।");
    }

    const data = await response.json();
    const list = Array.isArray(data)
      ? data
      : data.products;

    if (!Array.isArray(list)) {
      throw new Error("API থেকে সঠিক পণ্যের তথ্য পাওয়া যায়নি।");
    }

    setProducts(list);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError(
        err.message || "পণ্য লোড করতে সমস্যা হয়েছে।"
      );
    }
  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
}

getProducts();



}, [slug, validCategory]);

const sortedProducts = useMemo(() => {
const list = [...products];


if (sort === "low") {
  list.sort((a, b) => a.today - b.today);
}

if (sort === "high") {
  list.sort((a, b) => b.today - a.today);
}

return list;


}, [products, sort]);

const categoryName =
products[0]?.categoryNameBn || categoryNames[slug] || "ক্যাটাগরি";

return ( <main className="min-h-[calc(100vh-200px)] bg-[#f4f7f4] px-4 py-8"> <div className="mx-auto max-w-6xl"> <section className="mb-4 flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"> <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
{products[0]?.categoryIcon || categoryIcons[slug] || "🛒"} </div>


      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {categoryName}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {formatPrice(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </section>

    <section className="mb-4 flex items-center justify-end gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 sm:px-6">
      <label
        htmlFor="sort-products"
        className="text-sm font-medium text-gray-600"
      >
        সাজান
      </label>

      <select
        id="sort-products"
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        className="max-w-[220px] rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </section>

    <p className="mb-4 text-sm text-gray-500">
      মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে
    </p>

    {loading ? (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-60 animate-pulse rounded-2xl border border-gray-100 bg-white"
          />
        ))}
      </div>
    ) : error ? (
      <section className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <p className="text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-emerald-600 px-5 py-2 font-medium text-white transition hover:bg-emerald-700"
        >
          আবার চেষ্টা করুন
        </button>
      </section>
    ) : sortedProducts.length === 0 ? (
      <section className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
        <p className="text-gray-700">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      </section>
    ) : (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          const badgeStyle = isUp
            ? "bg-red-50 text-red-600"
            : isDown
              ? "bg-emerald-50 text-emerald-600"
              : "bg-gray-100 text-gray-600";

          const arrow = isUp ? "▲" : isDown ? "▼" : "—";

          return (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  {product.image || categoryIcons[slug] || "🛒"}
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-gray-900">
                    {product.nameBn}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {unitNames[product.unit] || product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400">
                    আজকের দাম
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    {formatPrice(product.today)} টাকা
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold ${badgeStyle}`}
                >
                  {arrow}{" "}
                  {formatPrice(Math.abs(product.change?.pct ?? 0))}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    )}
  </div>
</main>


);
}
