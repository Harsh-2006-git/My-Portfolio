import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Portfolio",
  description: "Admin dashboard for managing portfolio content.",
  robots: "noindex, nofollow",
};

// This layout replaces the root layout for /admin routes,
// removing the portfolio Header and Footer.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080810] text-white font-sans antialiased">
      {children}
    </div>
  );
}
