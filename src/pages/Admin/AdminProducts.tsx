// src/pages/AdminProducts.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "@/pages/Admin/AdminLayout";
import { Button } from "@/components/ui/button";

type Product = {
  _id?: string;
  title: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  discount?: number;
  isNew?: boolean;
  collections: string[];
};

const emptyForm: Product = {
  title: "",
  image: "",
  price: 0,
  originalPrice: 0,
  rating: 0,
  reviews: 0,
  discount: 0,
  isNew: false,
  collections: [],
};

const collectionOptions = [
  { value: "flash", label: "Flash (Today's Deals)" },
  { value: "best", label: "Best Selling" },
  { value: "explore", label: "Explore Products" },
];

type CollectionFilter = "all" | "flash" | "best" | "explore" | "uncategorized";

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [collectionFilter, setCollectionFilter] =
    useState<CollectionFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "https://ecommerece-backend-ud0m.onrender.com";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (
      ["price", "originalPrice", "rating", "reviews", "discount"].includes(
        name
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? ("" as any) : Number(value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCollectionToggle = (value: string) => {
    setFormData((prev) => {
      const exists = prev.collections.includes(value);
      if (exists) {
        return {
          ...prev,
          collections: prev.collections.filter((v) => v !== value),
        };
      }
      return {
        ...prev,
        collections: [...prev.collections, value],
      };
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    try {
      setUploadingImage(true);
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("Upload error:", errData);
        alert("Failed to upload image");
        return;
      }
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const body = {
        ...formData,
        collections: formData.collections || [],
      };

      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `${API_BASE}/api/products/${editingId}`
        : `${API_BASE}/api/products`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error from server:", errorData);
        alert("Error saving product. Check console for details.");
        return;
      }

      await fetchProducts();
      setFormData({ ...emptyForm });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id || null);
    setFormData({
      ...product,
      collections: product.collections || [],
    });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete product");
        return;
      }
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- FILTERED PRODUCTS ----------
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.trim().toLowerCase();
    const collections = product.collections || [];

    const matchSearch =
      term === "" || product.title.toLowerCase().includes(term);

    let matchCollection = true;
    if (collectionFilter === "uncategorized") {
      matchCollection = collections.length === 0;
    } else if (collectionFilter !== "all") {
      matchCollection = collections.includes(collectionFilter);
    }

    return matchSearch && matchCollection;
  });

  const filterTabs: { value: CollectionFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "flash", label: "Flash" },
    { value: "best", label: "Best" },
    { value: "explore", label: "Explore" },
    { value: "uncategorized", label: "Unassigned" },
  ];

  return (
    <AdminLayout title="Products">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Product Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <section className="lg:col-span-1 bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Product" : "Create New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                  placeholder="Product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL / Path (optional)
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleChange}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background mb-2"
                  placeholder="/images/product-1.jpg or https://..."
                />

                <label className="block text-xs font-medium mb-1">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm"
                />
                {uploadingImage && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploading image...
                  </p>
                )}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-24 w-auto rounded border border-border object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                    min={0}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Original Price
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                    min={0}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                    min={0}
                    max={5}
                    step={0.5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Reviews
                  </label>
                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                    min={0}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                    min={0}
                    max={100}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="isNew"
                  type="checkbox"
                  name="isNew"
                  checked={!!formData.isNew}
                  onChange={handleCheckbox}
                  className="h-4 w-4 rounded border-border"
                />
                <label htmlFor="isNew" className="text-sm">
                  Mark as New
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Sections (Home Page)
                </label>
                <div className="flex flex-wrap gap-3">
                  {collectionOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border"
                        checked={formData.collections.includes(opt.value)}
                        onChange={() => handleCollectionToggle(opt.value)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  These control where the product appears: Flash Sales, Best
                  Selling, or Explore section.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={loading}>
                  {editingId ? "Update Product" : "Create Product"}
                </Button>

                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ ...emptyForm });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </section>

          {/* Product List */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">All Products</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchProducts}
                disabled={loading}
              >
                Refresh
              </Button>
            </div>

            {/* Filters + Search */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setCollectionFilter(tab.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      collectionFilter === tab.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                />
              </div>
            </div>

            {loading && (
              <p className="text-sm text-muted-foreground mb-3">
                Loading products...
              </p>
            )}

            {filteredProducts.length === 0 && !loading ? (
              <p className="text-sm text-muted-foreground">
                No products found for current filters.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-border rounded-lg p-4 bg-card flex flex-col justify-between"
                  >
                    <div>
                      {product.image && (
                        <div className="mb-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-40 object-cover rounded-md"
                          />
                        </div>
                      )}

                      <h3 className="font-semibold text-sm md:text-base mb-1 line-clamp-2">
                        {product.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm mb-1">
                        <span className="font-semibold">
                          ${product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > 0 && (
                          <span className="line-through text-muted-foreground">
                            ${product.originalPrice}
                          </span>
                        )}
                        {product.discount != null && product.discount > 0 && (
                          <span className="text-green-600 text-xs">
                            -{product.discount}%
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground mb-1">
                        Rating: {product.rating ?? 0} · Reviews:{" "}
                        {product.reviews ?? 0}
                      </div>

                      <div className="text-xs mb-2">
                        Sections:{" "}
                        {product.collections && product.collections.length > 0
                          ? product.collections.join(", ")
                          : "—"}
                      </div>

                      {product.isNew && (
                        <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-medium">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
