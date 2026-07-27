import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#050505] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* درباره */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-[#d4af37]">MIDNIGHT</span> PERFUME
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              فروشگاه تخصصی عطر و ادکلن اصل در شهر بابل.
              ارائه بهترین رایحه‌ها با ضمانت اصالت کالا.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <h4 className="font-medium mb-4 text-[#d4af37]">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">محصولات</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">ورود / ثبت‌نام</Link></li>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h4 className="font-medium mb-4 text-[#d4af37]">ارتباط با ما</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>شهر بابل</li>
              <li>
                <a 
                  href="https://instagram.com/midnight_perfume1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  اینستاگرام: @midnight_perfume1
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mt-10 pt-6 text-center text-sm text-gray-500">
          © ۱۴۰۴ Midnight Perfume — تمامی حقوق محفوظ است
        </div>
      </div>
    </footer>
  );
}
