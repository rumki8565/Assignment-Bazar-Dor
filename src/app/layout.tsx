import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Color_Emoji } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/types";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

// Makes newer emojis (🫘 🫙 🫚) show on devices whose system font lacks them.
const emoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  variable: "--font-emoji",
  preload: false,
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories().catch((): Category[] => []),
    getProducts().catch((): Product[] => []),
  ]);

  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${hind.variable} ${emoji.variable} flex min-h-screen flex-col`}
      >
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
