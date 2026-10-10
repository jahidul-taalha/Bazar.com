
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মেলেনি");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider) {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
      }
    } catch {
      toast.error("সামাজিক লগইন চালু করতে সেটআপ প্রয়োজন");
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                minLength={8}
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                minLength={8}
                placeholder="আবার লিখুন"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 py-3 font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-bold">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-bold">⌘</span>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="font-semibold text-emerald-700 hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 transition hover:text-emerald-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}