import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">CONTACT</p>
          <h1 className="text-3xl md:text-4xl font-bold">تماس با ما</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* اطلاعات تماس */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-medium text-[#d4af37] mb-2">
              راه‌های ارتباطی
            </h2>

            <div>
              <p className="text-sm text-gray-500 mb-1">شهر</p>
              <p className="font-medium">بابل</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">اینستاگرام</p>
              <a
                href="https://instagram.com/midnight_perfume1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:underline"
              >
                @midnight_perfume1
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">ساعات پاسخگویی</p>
              <p className="font-medium">همه روزه از ساعت ۱۰ صبح تا ۱۰ شب</p>
            </div>
          </div>

          {/* پیام */}
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-8">
            <h2 className="text-xl font-medium text-[#d4af37] mb-6">
              پیام بگذارید
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">نام شما</label>
                <input
                  type="text"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  placeholder="نام کامل"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">شماره تماس</label>
                <input
                  type="tel"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  placeholder="۰۹۱۲xxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">پیام شما</label>
                <textarea
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>

              <button className="w-full bg-[#d4af37] text-black py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors">
                ارسال پیام
              </button>

              <p className="text-xs text-gray-500 text-center">
                برای پاسخ سریع‌تر از طریق اینستاگرام پیام دهید
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
