
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import PriceTicker from "@/components/shared/PriceTicker";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Toaster position="top-center" />
        <Navbar />
        <PriceTicker />
        {children}
        <Footer />
      </body>
    </html>
  );
}