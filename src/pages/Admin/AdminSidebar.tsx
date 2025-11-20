// src/components/admin/AdminSidebar.tsx
import React from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const renderNav = (isMobile = false) => (
    <nav className="mt-4 space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentPath === item.href;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={isMobile ? onClose : undefined}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-border bg-card min-h-[calc(100vh-56px)]">
        <div className="px-4 pt-4 pb-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Navigation
          </div>
        </div>
        <div className="px-3 pb-4 flex-1 overflow-y-auto">
          {renderNav(false)}
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-card border-r border-border shadow-xl transform transition-transform duration-200 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-4 pt-4 pb-2 border-b border-border">
            <div className="text-sm font-semibold">Admin Menu</div>
          </div>
          <div className="px-3 py-3 overflow-y-auto h-full">
            {renderNav(true)}
          </div>
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;
