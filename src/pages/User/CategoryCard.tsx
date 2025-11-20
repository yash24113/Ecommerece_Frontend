// src/components/CategoryCard.tsx
import React from "react";
import type { LucideIcon } from "lucide-react";

export interface CategoryCardProps {
  icon?: LucideIcon;      // or whatever type you already had
  label: string;
  image?: string;         // <-- add this
  active?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  label,
  image,
  active,
}) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border bg-card p-3 text-center text-xs transition hover:border-primary/60 ${
        active ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        {image ? (
          <img
            src={image}
            alt={label}
            className="h-8 w-8 object-contain rounded-full"
          />
        ) : (
          Icon && <Icon className="h-5 w-5" />
        )}
      </div>
      <span className="font-medium line-clamp-2">{label}</span>
    </button>
  );
};

export default CategoryCard;
