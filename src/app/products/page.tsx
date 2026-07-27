import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">COLLECTION</p>
          <h1 className="text-3xl md:text-4xl font-bold">همه محصولات</h1>
          <p className="text-gray-400 mt-3 text-sm">
            {products?.length || 0} محصول موجود
          </p>
        </div>

        {/* فیلتر ظاهری */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 text-sm">
          <button className="px-4 py-2 rounded border border-[#d4af37] bg-[#d4af37] text-black">
            همه
          </button>
          <button className="px-4 py-2 rounded border border-[#2a2a2a] hover:border-[#d4af37] transition-colors">
            مردانه
          </button>
          <button className="px-4 py-2 rounded border border-[#2a2a2a] hover:border-[#d4af37] transition-colors">
            زنانه
          </button>
          <button className="px-4 py-2 rounded border border-[#2a2a2a] hover:border-[#d4af37] transition-colors">
            یونیسکس
          </button>
        </div>

        {!products || products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            هنوز محصولی اضافه نشده است.
          </div>
        ) : (
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
                      className="w-full h-full object-cover"
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
        )}
      </main>

      <Footer />
    </div>
  );
}
