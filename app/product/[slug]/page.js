"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const API_BASE =
"https://api.api-store.workers.dev/api/bazardor";

const unitNames = {
kg: "কেজি",
liter: "লিটার",
piece: "টি",
dozen: "ডজন",
};

const formatPrice = (value) =>
new Intl.NumberFormat("bn-BD", {
maximumFractionDigits: 2,
}).format(Number(value) || 0);

export default function ProductDetailsPage() {
const { slug } = useParams();

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const controller = new AbortController();


async function fetchProduct() {
  setLoading(true);
  setError("");
  setProduct(null);

  try {
    const response = await fetch(`${API_BASE}/products`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
    }

    const data = await response.json();
    const products = Array.isArray(data) ? data : data.products;

    if (!Array.isArray(products)) {
      throw new Error("API থেকে সঠিক তথ্য পাওয়া যায়নি।");
    }

    const selectedProduct = products.find(
      (item) => item.slug === slug
    );

    if (!selectedProduct) {
      throw new Error("এই পণ্যটি খুঁজে পাওয়া যায়নি।");
    }

    setProduct(selectedProduct);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError(err.message || "কিছু একটা সমস্যা হয়েছে।");
    }
  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
}

if (slug) fetchProduct();

return () => controller.abort();


}, [slug]);

if (loading) {
return ( <main className="min-h-screen bg-[#f4f7f4] px-4 py-8 md:px-8"> <div className="mx-auto flex max-w-5xl flex-col gap-5"> <div className="h-5 w-48 animate-pulse rounded bg-gray-200" /> <div className="h-40 animate-pulse rounded-2xl bg-white" /> <div className="h-52 animate-pulse rounded-2xl bg-white" /> <div className="h-72 animate-pulse rounded-2xl bg-white" /> </div> </main>
);
}

if (error || !product) {
return ( <main className="flex min-h-[60vh] items-center justify-center bg-[#f4f7f4] px-4 py-12"> <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"> <div className="text-4xl">🔎</div> <h1 className="mt-4 text-xl font-bold text-gray-900">
পণ্য পাওয়া যায়নি </h1> <p className="mt-2 text-sm text-gray-500">
{error || "পণ্যের তথ্য পাওয়া যায়নি।"} </p> <Link
         href="/"
         className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
       >
হোম পেজে ফিরে যান </Link> </div> </main>
);
}

const unit = unitNames[product.unit] || product.unit || "কেজি";
const change = product.change?.pct ?? 0;
const isUp = product.change?.dir === "up";
const isDown = product.change?.dir === "down";

const changeStyle = isUp
? "bg-red-50 text-red-600"
: isDown
? "bg-emerald-50 text-emerald-600"
: "bg-gray-100 text-gray-600";

const arrow = isUp ? "▲" : isDown ? "▼" : "—";

const markets = Array.isArray(product.markets)
? product.markets
: [];

const marketPrices = markets
.map((market) => ({
...market,
min: Number(market.min),
max: Number(market.max),
}))
.filter(
(market) =>
Number.isFinite(market.min) &&
Number.isFinite(market.max)
);

const minMarket = marketPrices.reduce(
(lowest, market) =>
!lowest || market.min < lowest.min ? market : lowest,
null
);

const maxMarket = marketPrices.reduce(
(highest, market) =>
!highest || market.max > highest.max ? market : highest,
null
);

const averagePrice =
marketPrices.length > 0
? marketPrices.reduce(
(total, market) => total + (market.min + market.max) / 2,
0
) / marketPrices.length
: Number(product.today);

const changeAmount =
product.yesterday != null
? Number(product.today) - Number(product.yesterday)
: null;

return ( <main className="bg-[#f4f7f4] px-4 py-6 md:px-8"> <div className="mx-auto flex max-w-5xl flex-col gap-5"> <nav
       aria-label="Breadcrumb"
       className="flex flex-wrap items-center gap-1 text-xs text-gray-500 md:text-sm"
     > <Link href="/" className="transition hover:text-emerald-700">
হোম </Link> <span>›</span>
<Link
href={`/category/${product.category}`}
className="transition hover:text-emerald-700"
>
{product.categoryNameBn || product.category} </Link> <span>›</span> <span className="font-medium text-gray-700">
{product.nameBn} </span> </nav>


    <section className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-900">
            {product.nameBn}
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            প্রতি {unit} · {product.categoryNameBn || product.category}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {changeAmount === null
              ? "গতকালের দামের তথ্য পাওয়া যায়নি"
              : changeAmount > 0
                ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(changeAmount)} টাকা`
                : changeAmount < 0
                  ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(Math.abs(changeAmount))} টাকা`
                  : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
          </p>
        </div>
      </div>

      <div className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-center sm:w-auto sm:min-w-[150px]">
        <span className="mb-1 block text-xs text-gray-400">
          আজকের দাম
        </span>
        <p className="text-3xl font-extrabold text-gray-900">
          {formatPrice(product.today)}
        </p>
        <span className="mt-0.5 block text-xs text-gray-500">
          টাকা / {unit}
        </span>
        <span
          className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-semibold ${changeStyle}`}
        >
          {arrow} {formatPrice(Math.abs(change))}%
        </span>
      </div>
    </section>

    <section>
      <h2 className="mb-3 text-base font-bold text-gray-900">
        দামের সারসংক্ষেপ
      </h2>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-lg font-bold text-emerald-600">
              {minMarket
                ? `${formatPrice(minMarket.min)} টাকা`
                : "তথ্য নেই"}
            </p>
            <p className="text-xs text-gray-400">
              {minMarket?.market || "বাজারের তথ্য পাওয়া যায়নি"}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-lg font-bold text-red-600">
              {maxMarket
                ? `${formatPrice(maxMarket.max)} টাকা`
                : "তথ্য নেই"}
            </p>
            <p className="text-xs text-gray-400">
              {maxMarket?.market || "বাজারের তথ্য পাওয়া যায়নি"}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(averagePrice)} টাকা
            </p>
            <p className="text-xs text-gray-400">
              প্রতি {unit}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="mb-3 mt-2 text-base font-bold text-gray-900">
        বাজারভিত্তিক আজকের দাম
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        {marketPrices.length > 0 ? (
          <table className="w-full min-w-[600px] border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr>
                {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="border-b border-gray-100 px-3 py-3 text-center font-semibold text-gray-500 first:text-left"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {marketPrices.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
                >
                  <td className="px-3 py-3.5 font-medium text-gray-700">
                    {market.market}
                  </td>
                  <td className="px-3 py-3.5 text-center text-gray-700">
                    {market.division || "—"}
                  </td>
                  <td className="px-3 py-3.5 text-center text-gray-700">
                    {formatPrice(market.min)} টাকা
                  </td>
                  <td className="px-3 py-3.5 text-center text-gray-700">
                    {formatPrice(market.max)} টাকা
                  </td>
                  <td className="px-3 py-3.5 text-center font-medium text-gray-700">
                    {formatPrice((market.min + market.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখন পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  </div>
</main>
);
}
