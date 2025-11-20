// src/pages/AdminCategories.tsx
import React, { useEffect, useState } from "react";
import AdminLayout from "@/pages/Admin/AdminLayout";
import { Button } from "@/components/ui/button";

type Category = {
  _id?: string;
  name: string;
  image?: string;
};

const emptyCategoryForm: Category = {
  name: "",
  image: "",
};

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryForm, setCategoryForm] = useState<Category>({
    ...emptyCategoryForm,
  });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryImageUpload = async (
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
      setCategoryForm((prev) => ({ ...prev, image: data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name: categoryForm.name.trim(),
        image: categoryForm.image?.trim() || "",
      };

      const isEdit = Boolean(editingCategoryId);
      const url = isEdit
        ? `${API_BASE}/api/categories/${editingCategoryId}`
        : `${API_BASE}/api/categories`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Category save error:", errorData);
        alert("Error saving category. Check console for details.");
        return;
      }

      await fetchCategories();
      setCategoryForm({ ...emptyCategoryForm });
      setEditingCategoryId(null);
    } catch (err) {
      console.error("Error saving category:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategoryId(category._id || null);
    setCategoryForm({
      name: category.name,
      image: category.image || "",
    });
  };

  const handleCategoryDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        alert("Failed to delete category");
        return;
      }
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Categories">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Category Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Form */}
          <section className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
            <h3 className="text-md font-semibold mb-4">
              {editingCategoryId ? "Edit Category" : "Create New Category"}
            </h3>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  required
                  className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background"
                  placeholder="e.g. Electronics, Fashion, Fabrics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL / Path (optional)
                </label>
                <input
                  type="text"
                  name="image"
                  value={categoryForm.image || ""}
                  onChange={handleCategoryChange}
                  className="w-full rounded-md border border-border px-3 py-2 text-sm bg-background mb-2"
                  placeholder="/images/cat-electronics.jpg or https://..."
                />

                <label className="block text-xs font-medium mb-1">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCategoryImageUpload}
                  className="w-full text-sm"
                />
                {uploadingImage && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploading image...
                  </p>
                )}
                {categoryForm.image && (
                  <div className="mt-2">
                    <img
                      src={categoryForm.image}
                      alt="Preview"
                      className="h-24 w-auto rounded border border-border object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={loading}>
                  {editingCategoryId ? "Update Category" : "Create Category"}
                </Button>

                {editingCategoryId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingCategoryId(null);
                      setCategoryForm({ ...emptyCategoryForm });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </section>

          {/* Category List */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold">All Categories</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchCategories}
                disabled={loading}
              >
                Refresh
              </Button>
            </div>

            {loading && (
              <p className="text-sm text-muted-foreground mb-3">
                Loading categories...
              </p>
            )}

            {categories.length === 0 && !loading ? (
              <p className="text-sm text-muted-foreground">
                No categories found. Create one using the form.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="border border-border rounded-lg p-4 bg-card flex flex-col justify-between"
                  >
                    <div>
                      {category.image && (
                        <div className="mb-3">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <h4 className="font-semibold text-sm md:text-base mb-1 line-clamp-2">
                        {category.name}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleCategoryEdit(category)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleCategoryDelete(category._id)}
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

export default AdminCategories;
