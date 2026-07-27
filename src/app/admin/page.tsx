"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    old_price: "",
    gender: "",
    volume: "",
    description: "",
    notes_top: "",
    notes_middle: "",
    notes_base: "",
    is_new: false,
  });

  // چک کردن لاگین بودن
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "zeinab" && loginForm.password === "12122312") {
      localStorage.setItem("admin_logged_in", "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      price: "",
      old_price: "",
      gender: "",
      volume: "",
      description: "",
      notes_top: "",
      notes_middle: "",
      notes_base: "",
      is_new: false,
    });
    setImageFile(null);
    setEditingId(null);
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      brand: product.brand || "",
      price: product.price?.toString() || "",
      old_price: product.old_price?.toString() || "",
      gender: product.gender || "",
      volume: product.volume || "",
      description: product.description || "",
      notes_top: product.notes_top || "",
      notes_middle: product.notes_middle || "",
      notes_base: product.notes_base || "",
      is_new: product.is_new || false,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setUploading(true);

    if (!form.name || !form.price) {
      setMessage("نام و قیمت محصول الزامی است");
      setUploading(false);
      return;
    }

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `\( {Date.now()}. \){fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage("خطا در آپلود عکس: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = urlData.publicUrl;
    }

    const productData: any = {
      name: form.name,
      brand: form.brand || null,
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      gender: form.gender || null,
      volume: form.volume || null,
      description: form.description || null,
      notes_top: form.notes_top || null,
      notes_middle: form.notes_middle || null,
      notes_base: form.notes_base || null,
      is_new: form.is_new,
      is_active: true,
    };

    if (imageUrl) {
      productData.image_url = imageUrl;
    }

    let error;

    if (editingId) {
      // ویرایش
      const { error: updateError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingId);
      error = updateError;
    } else {
      // افزودن جدید
      const { error: insertError } = await supabase
        .from("products")
        .insert([productData]);
      error = insertError;
    }

    if (error) {
      setMessage("خطا: " + error.message);
    } else {
      setMessage(editingId ? "✅ محصول با موفقیت ویرایش شد" : "✅ محصول با موفقیت اضافه شد");
      resetForm();
      fetchProducts();
    }

    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      alert("خطا در حذف: " + error.message);
    } else {
      fetchProducts();
    }
  };

  // صفحه لاگین
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-lg p-8">
          <div className="text-center mb-8">
            <p className="text-[#d4af37] text-sm tracking-widest mb-2">ADMIN</p>
            <h1 className="text-2xl font-bold">ورود به پنل مدیریت</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">نام کاربری</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                placeholder="نام کاربری"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">رمز عبور</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                placeholder="رمز عبور"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#d4af37] text-black py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    );
  }

  // صفحه اصلی پنل
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#d4af37] text-sm tracking-widest mb-1">ADMIN PANEL</p>
            <h1 className="text-3xl font-bold">پنل مدیریت محصولات</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="text-sm border border-[#2a2a2a] px-4 py-2 rounded hover:border-[#d4af37] transition-colors"
            >
              مشاهده فروشگاه
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm border border-red-800 text-red-400 px-4 py-2 rounded hover:bg-red-900/20 transition-colors"
            >
              خروج
            </button>
          </div>
        </div>

        {/* فرم افزودن / ویرایش */}
        <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg p-6 mb-12">
          <h2 className="text-xl font-medium mb-6 text-[#d4af37]">
            {editingId ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">نام محصول *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">برند</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">قیمت (تومان) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">قیمت قبلی</label>
                <input
                  type="number"
                  name="old_price"
                  value={form.old_price}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">جنسیت</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="مردانه">مردانه</option>
                  <option value="زنانه">زنانه</option>
                  <option value="یونیسکس">یونیسکس</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">حجم</label>
                <input
                  type="text"
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">توضیحات</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">نت اولیه</label>
                <input
                  type="text"
                  name="notes_top"
                  value={form.notes_top}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">نت میانی</label>
                <input
                  type="text"
                  name="notes_middle"
                  value={form.notes_middle}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">نت پایه</label>
                <input
                  type="text"
                  name="notes_base"
                  value={form.notes_base}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                {editingId ? "عکس جدید (اختیاری)" : "عکس محصول"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
              />
              {imageFile && (
                <p className="text-xs text-gray-500 mt-2">فایل: {imageFile.name}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_new"
                checked={form.is_new}
                onChange={handleChange}
                id="is_new"
                className="w-4 h-4"
              />
              <label htmlFor="is_new" className="text-sm">
                محصول جدید است
              </label>
            </div>

            {message && (
              <p className={`text-sm ${message.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="bg-[#d4af37] text-black px-8 py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors disabled:opacity-50"
              >
                {uploading
                  ? "در حال ثبت..."
                  : editingId
                  ? "ذخیره تغییرات"
                  : "افزودن محصول"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-[#2a2a2a] px-6 py-3 rounded hover:border-gray-500 transition-colors"
                >
                  انصراف
                </button>
              )}
            </div>
          </form>
        </div>

        {/* لیست محصولات */}
        <div>
          <h2 className="text-xl font-medium mb-6 text-[#d4af37]">
            محصولات موجود ({products.length})
          </h2>

          {loading ? (
            <p className="text-gray-500">در حال بارگذاری...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">هنوز محصولی وجود ندارد.</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-[#111111] border border-[#2a2a2a] rounded-lg p-4"
                >
                  <div className="flex items-center gap-4">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-[#1a1a1a] rounded flex items-center justify-center text-xs text-gray-600">
                        بدون عکس
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        {product.brand} • {formatPrice(product.price)} تومان
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="text-sm border border-[#d4af37] text-[#d4af37] px-3 py-1.5 rounded hover:bg-[#d4af37] hover:text-black transition-colors"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-sm border border-red-800 text-red-400 px-3 py-1.5 rounded hover:bg-red-900/30 transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
