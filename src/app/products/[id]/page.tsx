"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useCart } from "@/store/cart";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const addItem = useCart((state) => state.addItem);

  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    user_name: "",
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error || !productData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProduct(productData);

      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .order("created_at", { ascending: false });

      if (reviewsData) setReviews(reviewsData);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image_url: product.image_url,
      volume: product.volume,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // خرید با لینک ig.me
  const handleBuyInstagram = () => {
    if (!product) return;

    const message = `سلام، می‌خوام این محصول رو سفارش بدم:

📦 نام محصول: ${product.name}
🏷️ برند: ${product.brand || "-"}
💰 قیمت: ${formatPrice(product.price)} تومان
📏 حجم: ${product.volume || "-"}

لطفاً راهنمایی کنید.`;

    const url = `https://ig.me/m/midnight_perfume1?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setReviewMessage("");

    if (!reviewForm.user_name || !reviewForm.comment) {
      setReviewMessage("نام و متن نظر الزامی است");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("reviews").insert([
      {
        product_id: Number(id),
        user_name: reviewForm.user_name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      },
    ]);

    if (error) {
      setReviewMessage("خطا در ثبت نظر: " + error.message);
    } else {
      setReviewMessage("✅ نظر شما با موفقیت ثبت شد");
      setReviewForm({ user_name: "", rating: 5, comment: "" });

      const { data: reviewsData } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .order("created_at", { ascending: false });

      if (reviewsData) setReviews(reviewsData);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-gray-400">در حال بارگذاری...</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl">محصول یافت نشد</p>
        <Link href="/products" className="text-[#d4af37] hover:underline">بازگشت به محصولات</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#d4af37]">خانه</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#d4af37]">محصولات</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-[3/4] bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] relative overflow-hidden">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">بدون تصویر</div>
            )}
            {product.is_new && (
              <div className="absolute top-4 right-4 bg-[#d4af37] text-black text-xs px-3 py-1 rounded font-medium">جدید</div>
            )}
          </div>

          <div>
            <p className="text-[#d4af37] text-sm mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
              {product.gender && <span>{product.gender}</span>}
              {product.volume && (<><span>•</span><span>{product.volume}</span></>)}
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#d4af37]">{formatPrice(product.price)}</span>
                <span className="text-gray-400">تومان</span>
              </div>
              {product.old_price && (
                <p className="text-gray-500 line-through mt-1">{formatPrice(product.old_price)} تومان</p>
              )}
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={handleBuyInstagram}
                className="w-full bg-[#d4af37] text-black py-4 rounded font-medium hover:bg-[#f0d78c] transition-colors"
              >
                خرید از طریق اینستاگرام
              </button>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded font-medium border transition-colors ${
                  added ? "border-green-600 text-green-400" : "border-[#2a2a2a] hover:border-[#d4af37]"
                }`}
              >
                {added ? "✓ به سبد اضافه شد" : "افزودن به سبد خرید"}
              </button>
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3 text-[#d4af37]">توضیحات</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{product.description}</p>
              </div>
            )}

            {(product.notes_top || product.notes_middle || product.notes_base) && (
              <div className="border border-[#2a2a2a] rounded-lg p-5 bg-[#111111]">
                <h3 className="text-lg font-medium mb-4 text-[#d4af37]">نت‌های عطر</h3>
                <div className="space-y-3 text-sm">
                  {product.notes_top && <div className="flex"><span className="w-24 text-gray-500">نت اولیه:</span><span>{product.notes_top}</span></div>}
                  {product.notes_middle && <div className="flex"><span className="w-24 text-gray-500">نت میانی:</span><span>{product.notes_middle}</span></div>}
                  {product.notes_base && <div className="flex"><span className="w-24 text-gray-500">نت پایه:</span><span>{product.notes_base}</span></div>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* نظرات */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8">
            نظرات کاربران <span className="text-[#d4af37]">({reviews.length})</span>
          </h2>

          <div className="space-y-6 mb-12">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border border-[#2a2a2a] rounded-lg p-5 bg-[#111111]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-medium">
                        {review.user_name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-medium">{review.user_name}</p>
                        <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString("fa-IR")}</p>
                      </div>
                    </div>
                    <div className="text-[#d4af37]">
                      {"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">هنوز نظری ثبت نشده است.</p>
            )}
          </div>

          <div className="border border-[#2a2a2a] rounded-lg p-6 bg-[#111111]">
            <h3 className="text-lg font-medium mb-4 text-[#d4af37]">نظر خود را بنویسید</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">نام شما *</label>
                <input
                  type="text"
                  value={reviewForm.user_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, user_name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">امتیاز</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className={`text-2xl transition-colors ${star <= reviewForm.rating ? "text-[#d4af37]" : "text-gray-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">متن نظر *</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                  required
                />
              </div>
              {reviewMessage && (
                <p className={`text-sm ${reviewMessage.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                  {reviewMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#d4af37] text-black px-8 py-3 rounded font-medium hover:bg-[#f0d78c] transition-colors disabled:opacity-50"
              >
                {submitting ? "در حال ثبت..." : "ثبت نظر"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
