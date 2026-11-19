import type { Metadata } from "next";
import "./globals.css";
import { ProductsProvider } from "@/context/ProductsContext";

export const metadata: Metadata = {
  title: "DashStack - Dashboard",
  description: "Modern Responsive Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#F5F6FA] text-[#202224] font-sans">
        <ProductsProvider>{children}</ProductsProvider>
      </body>
    </html>
  );
}
