import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">ABOUT US</p>
          <h1 className="text-3xl md:text-4xl font-bold">درباره ما</h1>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-8">
            <h2 className="text-xl font-medium text-[#d4af37] mb-4">
              Midnight Perfume
            </h2>
            <p className="mb-4">
              فروشگاه تخصصی عطر و ادکلن اصل در شهر بابل. ما با هدف ارائه بهترین و اصل‌ترین عطرهای دنیا به مشتریان عزیز فعالیت می‌کنیم.
            </p>
            <p className="mb-4">
              در Midnight Perfume، کیفیت و اصالت کالا برای ما در اولویت قرار دارد. تمام محصولات ما با ضمانت اصالت ارائه می‌شوند تا شما با خیال راحت خرید کنید.
            </p>
            <p>
              ما معتقدیم هر عطر داستانی دارد و هر فرد شایسته‌ی رایحه‌ای منحصر به فرد است که شخصیتش را منعکس کند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-medium text-[#d4af37] mb-2">اصالت کالا</h3>
              <p className="text-sm text-gray-400">
                تمام عطرها اصل و با ضمانت ارائه می‌شوند
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-medium text-[#d4af37] mb-2">ارسال سریع</h3>
              <p className="text-sm text-gray-400">
                ارسال به سراسر ایران در کوتاه‌ترین زمان
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-medium text-[#d4af37] mb-2">انتخاب خاص</h3>
              <p className="text-sm text-gray-400">
                مجموعه‌ای منتخب از بهترین برندها
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Link
              href="/products"
              className="inline-block bg-[#d4af37] text-black px-8 py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors"
            >
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
