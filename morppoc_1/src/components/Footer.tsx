import Link from "next/link";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/roadmap", label: "Roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/help", label: "Help Center" },
      { href: "/guides", label: "Guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#005F7B] text-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">Morpheus77</h2>
          <p className="mt-2 text-sm text-white/80">
            AI-powered career guidance for students and families.
          </p>
        </div>

        {/* Columns */}
        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold mb-3">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:underline hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Morpheus77. All rights reserved.
      </div>
    </footer>
  );
}
