import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default async function Home() {
  // گرفتن محصولات ویژه (جدیدها یا آخرین‌ها)
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* هیرو سکشن */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent"></div>

        <div className="relative z-20 text-center px-4 max-w-3xl">
          <p className="text-[#d4af37] tracking-[0.3em] text-sm mb-4">LUXURY FRAGRANCES</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            عطرهایی که<br />
            <span className="text-[#d4af37]">شب را زنده می‌کنند</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            مجموعه‌ای منتخب از بهترین عطرهای اصل با رایحه‌های ماندگار و لوکس
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#d4af37] text-black px-8 py-4 rounded font-medium hover:bg-[#f0d78c] transition-colors"
            >
              مشاهده محصولات
            </Link>
            <Link
              href="/about"
              className="border border-[#d4af37] text-[#d4af37] px-8 py-4 rounded font-medium hover:bg-[#d4af37]/10 transition-colors"
            >
              درباره فروشگاه
            </Link>
          </div>
        </div>
      </section>

      {/* محصولات ویژه */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">FEATURED</p>
          <h2 className="text-3xl font-bold">محصولات ویژه</h2>
        </div>

        {!products || products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            هنوز محصولی اضافه نشده است.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-[#111111] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#d4af37]/60 transition-all"
                >
                  <div className="aspect-[3/4] bg-[#1a1a1a] relative overflow-hidden">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm">
                        بدون تصویر
                      </div>
                    )}

                    {product.is_new && (
                      <div className="absolute top-3 right-3 bg-[#d4af37] text-black text-xs px-2 py-1 rounded font-medium">
                        جدید
                      </div>
                    )}

                    {product.old_price && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        تخفیف
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[#d4af37] text-xs mb-1">{product.brand}</p>
                    <h3 className="font-medium mb-1 group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-3">{product.gender}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">
                          {formatPrice(product.price)}{" "}
                          <span className="text-sm font-normal text-gray-400">تومان</span>
                        </p>
                        {product.old_price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(product.old_price)} تومان
                          </p>
                        )}
                      </div>
                      <span className="text-sm border border-[#d4af37] text-[#d4af37] px-3 py-1.5 rounded group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                        مشاهده
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block border border-[#d4af37] text-[#d4af37] px-8 py-3 rounded hover:bg-[#d4af37] hover:text-black transition-colors"
              >
                مشاهده همه محصولات
              </Link>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
