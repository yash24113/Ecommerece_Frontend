// src/components/admin/AdminHeader.tsx
import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  title?: string;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear any auth data you store
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminUser");
    // If you use some other key, replace/remove above lines

    navigate("/login");
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md border border-border p-1.5"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="text-sm font-semibold">Admin Panel</div>
          {title && (
            <div className="text-xs text-muted-foreground">{title}</div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Simple user badge */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs font-medium">Admin User</span>
          <span className="text-[10px] text-muted-foreground">
            admin@example.com
          </span>
        </div>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/80 to-primary shadow-inner flex items-center justify-center text-xs font-semibold text-primary-foreground">
          A
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
