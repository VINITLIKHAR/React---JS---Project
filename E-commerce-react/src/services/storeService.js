// Mock data + helpers (no API yet). Later, replace these with axiosInstance calls.

export const categories = [
  { slug: "electronics", name: "Electronics", icon: "🎧", colors: ["#6366f1", "#8b5cf6"] },
  { slug: "fashion", name: "Fashion", icon: "👟", colors: ["#ec4899", "#f43f5e"] },
  { slug: "home", name: "Home & Living", icon: "🛋️", colors: ["#f59e0b", "#f97316"] },
  { slug: "beauty", name: "Beauty", icon: "💄", colors: ["#d946ef", "#a855f7"] },
  { slug: "sports", name: "Sports", icon: "🏏", colors: ["#10b981", "#059669"] },
  { slug: "books", name: "Books", icon: "📚", colors: ["#0ea5e9", "#2563eb"] },
];

const p = (id, name, category, price, oldPrice, rating, reviews, emoji, bg, description) => ({
  id, name, category, price, oldPrice, rating, reviews, emoji, bg, description,
});

export const products = [
  p(1, "Wireless Headphones", "electronics", 2499, 3999, 4.5, 1280, "🎧", ["#e0e7ff", "#c7d2fe"], "Active noise cancellation, 30-hour battery life and ultra-soft ear cushions for all-day comfort."),
  p(2, "Smart Watch Pro", "electronics", 3999, 6999, 4.4, 960, "⌚", ["#dbeafe", "#bfdbfe"], "Track steps, heart rate and sleep with a bright AMOLED display and 7-day battery."),
  p(3, "Bluetooth Speaker", "electronics", 1799, 2999, 4.3, 740, "🔊", ["#ede9fe", "#ddd6fe"], "Waterproof portable speaker with deep bass and 360° sound."),
  p(4, "Running Shoes", "fashion", 2199, 3499, 4.6, 2100, "👟", ["#fce7f3", "#fbcfe8"], "Lightweight, breathable mesh shoes with cushioned soles built for daily runs."),
  p(5, "Denim Jacket", "fashion", 1899, 2999, 4.2, 530, "🧥", ["#e0f2fe", "#bae6fd"], "Classic fit denim jacket with a soft inner lining. Goes with everything."),
  p(6, "Classic   Sunglasses", "fashion", 799, 1499, 4.1, 410, "🕶️", ["#fef3c7", "#fde68a"], "UV400 protected polarized lenses in a timeless frame."),
  p(7, "Minimal Table Lamp", "home", 1299, 1999, 4.5, 320, "💡", ["#fef9c3", "#fef08a"], "Warm dimmable LED lamp with a touch control base. Perfect for desks and bedsides."),
  p(8, "Cozy Armchair", "home", 8999, 12999, 4.7, 180, "🛋️", ["#ffedd5", "#fed7aa"], "Ergonomic accent chair with high-density foam and a solid wood frame."),
  p(9, "Vitamin C Face Serum", "beauty", 699, 999, 4.4, 890, "🧴", ["#fae8ff", "#f5d0fe"], "Brightening serum with 10% Vitamin C and hyaluronic acid for glowing skin."),
  p(10, "Matte Lipstick Set", "beauty", 549, 899, 4.3, 670, "💄", ["#ffe4e6", "#fecdd3"], "Set of 4 long-lasting matte shades that stay put for up to 12 hours."),
  p(11, "Cricket Bat", "sports", 1999, 2799, 4.5, 260, "🏏", ["#dcfce7", "#bbf7d0"], "Premium Kashmir willow bat with a comfortable grip and balanced pickup."),
  p(12, "Anti-Slip Yoga Mat", "sports", 899, 1499, 4.6, 1020, "🧘", ["#ccfbf1", "#99f6e4"], "6mm thick eco-friendly mat with excellent grip and cushioning."),
  p(13, "Bestseller Novel", "books", 349, 499, 4.8, 3400, "📖", ["#e0f2fe", "#bae6fd"], "A gripping page-turner that topped the charts for 20 weeks straight."),
  p(14, "Productivity Planner", "books", 299, 449, 4.2, 450, "📓", ["#f1f5f9", "#e2e8f0"], "Undated daily planner with goal tracking, habit logs and weekly reviews."),
];

export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");
export const discountPercent = (item) => Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
export const thumbStyle = (item) => ({ background: `linear-gradient(135deg, ${item.bg[0]}, ${item.bg[1]})` });
export const getProductById = (id) => products.find((x) => x.id === Number(id));
export const getCategory = (slug) => categories.find((c) => c.slug === slug);