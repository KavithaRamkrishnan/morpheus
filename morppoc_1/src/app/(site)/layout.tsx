// src/app/(site)/layout.tsx
import Header from "@/components/Header";  // or "../../components/Header" if you don't use @ alias
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
