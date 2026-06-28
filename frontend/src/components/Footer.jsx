import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Browse Gigs", to: "/gigs" },
    { label: "Find Freelancers", to: "/freelancers" },
    { label: "Categories", to: "/categories" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Pricing", to: "/pricing" },
  ],
  Freelancers: [
    { label: "Create a Gig", to: "/create-gig" },
    { label: "Freelancer Dashboard", to: "/dashboard" },
    { label: "Seller Levels", to: "/seller-levels" },
    { label: "Success Stories", to: "/stories" },
    { label: "Resources", to: "/resources" },
  ],
  Company: [
    { label: "About WorkHive", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Press Kit", to: "/press" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Cookie Policy", to: "/cookies" },
    { label: "Refund Policy", to: "/refunds" },
  ],
};

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 mb-14">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <span
                className="text-white font-black text-[20px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                WorkHive
              </span>
            </Link>

            <p className="text-[14px] text-zinc-400 leading-relaxed max-w-[240px]">
              The freelance marketplace built for modern tech teams. Ship faster, hire smarter.
            </p>

            {/* Social links */}
            <div className="flex gap-2 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-zinc-800 hover:border-zinc-600 flex items-center justify-center text-zinc-500 hover:text-zinc-200 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Trust badge */}
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[12px] font-semibold text-zinc-300">12,000+ active freelancers</span>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-[12px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  {group}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[14px] text-zinc-400 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-zinc-600">
            © {year} WorkHive Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[13px] text-zinc-600">
            <span>Made with</span>
            <svg className="w-3.5 h-3.5 text-green-600 fill-current" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>for the dev community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}