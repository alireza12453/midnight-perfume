"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true = ورود | false = ثبت‌نام
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // بعداً به Supabase وصل می‌شه
    if (isLogin) {
      alert("ورود با موفقیت انجام شد (فعلاً تستی)");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("رمز عبور و تکرار آن یکسان نیستند");
        return;
      }
      alert("ثبت‌نام با موفقیت انجام شد (فعلاً تستی)");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-[#d4af37] text-sm tracking-widest mb-2">
            {isLogin ? "LOGIN" : "REGISTER"}
          </p>
          <h1 className="text-3xl font-bold">
            {isLogin ? "ورود به حساب" : "ایجاد حساب کاربری"}
          </h1>
        </div>

        {/* تب‌های ورود / ثبت‌نام */}
        <div className="flex mb-8 border border-[#2a2a2a] rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              isLogin
                ? "bg-[#d4af37] text-black"
                : "bg-[#111111] text-gray-400 hover:text-white"
            }`}
          >
            ورود
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              !isLogin
                ? "bg-[#d4af37] text-black"
                : "bg-[#111111] text-gray-400 hover:text-white"
            }`}
          >
            ثبت‌نام
          </button>
        </div>

        {/* فرم */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">نام و نام خانوادگی</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="نام کامل خود را وارد کنید"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">ایمیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              placeholder="example@email.com"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">شماره موبایل</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="۰۹۱۲xxxxxxx"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">رمز عبور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              placeholder="حداقل ۸ کاراکتر"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">تکرار رمز عبور</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                placeholder="رمز عبور را دوباره وارد کنید"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-left">
              <Link href="#" className="text-sm text-[#d4af37] hover:underline">
                رمز عبور را فراموش کرده‌اید؟
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#d4af37] text-black py-4 rounded font-medium hover:bg-[#f0d78c] transition-colors"
          >
            {isLogin ? "ورود به حساب" : "ثبت‌نام"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#d4af37] hover:underline"
          >
            {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
          </button>
        </p>
      </main>

      <Footer />
    </div>
  );
}
