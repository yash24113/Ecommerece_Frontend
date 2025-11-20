// src/components/admin/AdminLayout.tsx
import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

interface AdminLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AdminHeader
        title={title}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
