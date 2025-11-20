// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/pages/Admin/AdminLayout";

type Product = {
  _id?: string;
  collections?: string[];
};

type Category = {
  _id?: string;
};

type Stats = {
  totalProducts: number;
  flash: number;
  best: number;
  explore: number;
  totalCategories: number;
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    flash: 0,
    best: 0,
    explore: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/api/products`),
          fetch(`${API_BASE}/api/categories`),
        ]);

        const [prodData, catData]: [Product[], Category[]] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);

        const totalProducts = prodData.length;
        const flash = prodData.filter((p) =>
          p.collections?.includes("flash")
        ).length;
        const best = prodData.filter((p) =>
          p.collections?.includes("best")
        ).length;
        const explore = prodData.filter((p) =>
          p.collections?.includes("explore")
        ).length;

        const totalCategories = catData.length;

        setStats({
          totalProducts,
          flash,
          best,
          explore,
          totalCategories,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_BASE]);

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      desc: "All products in your catalogue",
      badge: "Products",
      path: "/admin/products",
    },
    {
      title: "Flash Deals",
      value: stats.flash,
      desc: "Products tagged as flash",
      badge: "Flash",
      path: "/admin/products",
    },
    {
      title: "Best Selling",
      value: stats.best,
      desc: "Products tagged as best",
      badge: "Best",
      path: "/admin/products",
    },
    {
      title: "Explore Products",
      value: stats.explore,
      desc: "Products in explore section",
      badge: "Explore",
      path: "/admin/products",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      desc: "Total active categories",
      badge: "Categories",
      path: "/admin/categories",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Overview of your products and categories.
        </p>

        {loading && (
          <p className="text-sm text-muted-foreground mb-4">
            Loading dashboard...
          </p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.path)}
              className="text-left bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary/50 hover:shadow-md transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold">{card.title}</h2>
                  <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {card.badge}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </div>
            </button>
          ))}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
