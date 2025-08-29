import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Morpheus77",
  description: "AI-powered career guidance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}

