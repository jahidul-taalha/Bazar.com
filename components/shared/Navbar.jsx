import Link from "next/link";

const categories = [
{ name: "সব পণ্য", href: "/#সব-পণ্য" },
{ name: "চাল", href: "/category/chal" },
{ name: "ডাল", href: "/category/dal" },
{ name: "তেল", href: "/category/tel" },
{ name: "মাছ", href: "/category/mach" },
{ name: "মাংস", href: "/category/mangsho" },
{ name: "সবজি", href: "/category/sobji" },
{ name: "ফল", href: "/category/fol" },
];

export default function Navbar() {
return ( <header className="border-b border-gray-200 bg-white"> <div className="mx-auto max-w-7xl px-4 py-4"> <div className="flex items-center justify-between gap-3"> <Link href="/" className="shrink-0"> <h1 className="text-2xl font-bold text-green-700">
🛒 বাজার দর </h1> <p className="mt-1 text-sm text-gray-500">
বৃহস্পতিবার, ৮ অক্টোবর ২০২৬ </p> </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="rounded-lg border border-green-600 px-3 py-2 text-sm text-green-600 transition hover:bg-green-50 sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-700 sm:px-4"
        >
          সাইন আপ
        </Link>
      </div>
    </div>

    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="mt-5 flex items-center gap-6 overflow-x-auto pb-1"
    >
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="shrink-0 whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-green-700"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  </div>
</header>

);
}
