import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f0f5f1] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-5 rounded-2xl border border-[#e0e8e1] bg-[#fbfdfb] px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-8">
          <div>
            <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              প্রতিদিনের বাজার দর
            </p>

            <h1 className="max-w-xl text-2xl font-bold leading-tight text-[#202b23] sm:text-3xl lg:text-[30px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="/#সব-পণ্য"
              className="mt-5 inline-flex min-h-9 items-center justify-center rounded-md bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/assets/bazar-hero.png"
              alt="বাজারের পণ্যের ঝুড়ি"
              width={280}
              height={230}
              priority
              className="h-auto w-full max-w-[220px] object-contain sm:max-w-[250px] lg:max-w-[230px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

