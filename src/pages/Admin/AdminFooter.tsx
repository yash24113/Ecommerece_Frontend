// src/components/admin/AdminFooter.tsx
import React from "react";

const AdminFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-card px-4 lg:px-6 py-3 text-xs text-muted-foreground flex items-center justify-between">
      <span>© {year} Shopping Website.</span>
      <span className="hidden sm:inline">
        Design & Developed by Yash Khalas.
      </span>
    </footer>
  );
};

export default AdminFooter;
