import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          
          <div>
            <p className="mb-4 text-sm font-semibold text-green-700">
              প্রতিদিনের বাজার দর
            </p>

            <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              আজকের বাজার দর
              <span className="block text-green-700">
                এক নজরেই জানুন
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              প্রয়োজনীয় পণ্যের আজকের দাম, দাম বাড়া-কমার তথ্য
              এবং বিভিন্ন বাজারের মূল্য এক জায়গায় দেখুন।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="/assets/bazar-hero.png"
              alt="বাজারের পণ্যের ছবি"
              width={600}
              height={500}
              priority
              className="h-auto w-full max-w-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}