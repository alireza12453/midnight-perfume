"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = useCart((state) => state.totalItems());

  return (
    <header className="border-b border-[#2a2a2a] bg-[#0a0a0a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-wider">
          <span className="text-[#d4af37]">MIDNIGHT</span>
          <span className="text-white"> PERFUME</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-[#d4af37] transition-colors">خانه</Link>
          <Link href="/products" className="hover:text-[#d4af37] transition-colors">محصولات</Link>
          <Link href="/about" className="hover:text-[#d4af37] transition-colors">درباره ما</Link>
          <Link href="/contact" className="hover:text-[#d4af37] transition-colors">تماس</Link>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/cart" className="hover:text-[#d4af37] transition-colors text-sm relative">
            سبد خرید
            {totalItems > 0 && (
              <span className="absolute -top-2 -left-3 bg-[#d4af37] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="hidden sm:block bg-[#d4af37] text-black px-4 py-2 rounded text-sm font-medium hover:bg-[#f0d78c] transition-colors"
          >
            ورود
          </Link>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-[#2a2a2a] bg-[#0a0a0a] px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>خانه</Link>
          <Link href="/products" className="block py-2 hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>محصولات</Link>
          <Link href="/about" className="block py-2 hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>درباره ما</Link>
          <Link href="/contact" className="block py-2 hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>تماس</Link>
          <Link href="/cart" className="block py-2 hover:text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>سبد خرید ({totalItems})</Link>
          <Link href="/login" className="block py-2 text-[#d4af37]" onClick={() => setIsMenuOpen(false)}>ورود / ثبت‌نام</Link>
        </div>
      )}
    </header>
  );
}
