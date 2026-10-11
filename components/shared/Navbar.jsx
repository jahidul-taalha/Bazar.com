"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    router.refresh();
    router.push("/");
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[72px] items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-700 p-1.5">
              <Image
                src="/assets/logo-icon.png"
                alt="বাজার দর"
                width={24}
                height={24}
                className="h-full w-full object-contain"
              />
            </span>

            <div>
              <h1 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                বাজার দর
              </h1>

              <p className="text-[10px] leading-4 text-gray-500 sm:text-xs">
                বৃহস্পতিবার, ৮ অক্টোবর ২০২৬
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100" />
            ) : user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-green-50"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-700">
                      {(user.name || user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}

                  <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 sm:block">
                    {user.name || user.email}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex min-h-8 items-center justify-center rounded-md border border-gray-300 px-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:text-sm"
                >
                  লগ আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex min-h-8 items-center justify-center rounded-md border border-green-600 px-3 text-xs font-medium text-green-700 transition hover:bg-green-50 sm:px-4 sm:text-sm"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex min-h-8 items-center justify-center rounded-md bg-green-600 px-3 text-xs font-medium text-white transition hover:bg-green-700 sm:px-4 sm:text-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex items-center gap-x-5 overflow-x-auto border-t border-gray-100 py-2 sm:gap-x-7"
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="shrink-0 whitespace-nowrap py-1 text-xs font-medium text-gray-700 transition hover:text-green-700 sm:text-sm"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}