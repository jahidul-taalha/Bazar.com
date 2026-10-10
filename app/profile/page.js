"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
const [name, setName] = useState("Rezwan Ahmed");
const [savedName, setSavedName] = useState("Rezwan Ahmed");
const [message, setMessage] = useState("");

function handleUpdate(e) {
e.preventDefault();
setSavedName(name.trim() || savedName);
setMessage("আপনার তথ্য আপডেট হয়েছে।");
}

function handleSignOut() {
setMessage("আপনি এখনো সাইন আউট সিস্টেমের সঙ্গে যুক্ত হননি।");
}

return ( <main className="min-h-[calc(100vh-200px)] bg-[#f4f7f4] px-4 py-10"> <div className="mx-auto flex w-full max-w-xl flex-col items-center"> <header className="mb-8 text-center"> <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
আমার প্রোফাইল </h1> <p className="text-sm text-gray-600">
আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন। </p> </header>

    <section className="mb-6 w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-emerald-50 text-3xl">
            👤
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-lg font-bold text-gray-900">
              {savedName}
            </h2>
            <p className="mt-0.5 break-all text-sm text-gray-500">
              rezwanahmed@gmail.com
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 rounded-lg border border-red-400 bg-white px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-50"
        >
          ← সাইন আউট
        </button>
      </div>
    </section>

    <section className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">তথ্য</h2>

      <form onSubmit={handleUpdate}>
        <label
          htmlFor="profile-name"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          নাম
        </label>

        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setMessage("");
          }}
          required
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-emerald-500"
          placeholder="আপনার নাম লিখুন"
        />

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          আপডেট
        </button>

        {message && (
          <p
            role="status"
            className="mt-3 text-center text-sm text-emerald-700"
          >
            {message}
          </p>
        )}
      </form>
    </section>

    <Link
      href="/"
      className="mt-6 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
    >
      ← হোম পেজে ফিরে যান
    </Link>
  </div>
</main>
);
}
