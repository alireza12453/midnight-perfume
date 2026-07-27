"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const shipping = items.length > 0 ? 150000 : 0;
  const total = totalPrice() + shipping;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">SHOPPING CART</p>
          <h1 className="text-3xl md:text-4xl font-bold">سبد خرید</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6 opacity-30">🛒</div>
            <h2 className="text-2xl font-medium mb-3">سبد خرید شما خالی است</h2>
            <p className="text-gray-400 mb-8">هنوز محصولی اضافه نکرده‌اید</p>
            <Link
              href="/products"
              className="inline-block bg-[#d4af37] text-black px-8 py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 bg-[#111111] border border-[#2a2a2a] rounded-lg p-4"
                >
                  <div className="w-full sm:w-28 h-36 bg-[#1a1a1a] rounded overflow-hidden shrink-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                        بدون عکس
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[#d4af37] text-xs mb-1">{item.brand}</p>
                      <h3 className="font-medium mb-1">{item.name}</h3>
                      {item.volume && (
                        <p className="text-gray-500 text-sm">{item.volume}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-[#2a2a2a] rounded flex items-center justify-center hover:border-[#d4af37] transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-[#2a2a2a] rounded flex items-center justify-center hover:border-[#d4af37] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-bold text-[#d4af37]">
                        {formatPrice(item.price * item.quantity)} تومان
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors text-sm self-start sm:self-center"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-medium mb-6 text-[#d4af37]">
                  خلاصه سفارش
                </h3>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">جمع محصولات</span>
                    <span>{formatPrice(totalPrice())} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">هزینه ارسال</span>
                    <span>{formatPrice(shipping)} تومان</span>
                  </div>
                  <div className="border-t border-[#2a2a2a] pt-3 flex justify-between text-lg font-bold">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-[#d4af37]">
                      {formatPrice(total)} تومان
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#d4af37] text-black py-4 rounded font-medium hover:bg-[#f0d78c] transition-colors mb-3">
                  ادامه و پرداخت
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-sm text-gray-400 hover:text-red-400 transition-colors mb-3"
                >
                  خالی کردن سبد
                </button>

                <Link
                  href="/products"
                  className="block text-center text-sm text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  ← بازگشت به فروشگاه
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
