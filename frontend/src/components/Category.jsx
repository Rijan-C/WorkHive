import { Link } from "react-router-dom";

const categories = [
  {
    slug: "web-development",
    label: "Web Development",
    count: "2,340 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600 border-blue-100",
    hoverBorder: "hover:border-blue-300",
    accent: "group-hover:bg-blue-600",
  },
  {
    slug: "ui-ux-design",
    label: "UI / UX Design",
    count: "1,820 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    color: "bg-pink-50 text-pink-600 border-pink-100",
    hoverBorder: "hover:border-pink-300",
    accent: "group-hover:bg-pink-500",
  },
  {
    slug: "mobile-development",
    label: "Mobile Apps",
    count: "980 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
      </svg>
    ),
    color: "bg-violet-50 text-violet-600 border-violet-100",
    hoverBorder: "hover:border-violet-300",
    accent: "group-hover:bg-violet-600",
  },
  {
    slug: "devops-cloud",
    label: "DevOps & Cloud",
    count: "640 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    color: "bg-sky-50 text-sky-600 border-sky-100",
    hoverBorder: "hover:border-sky-300",
    accent: "group-hover:bg-sky-600",
  },
  {
    slug: "data-science",
    label: "Data & AI",
    count: "1,105 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600 border-amber-100",
    hoverBorder: "hover:border-amber-300",
    accent: "group-hover:bg-amber-500",
  },
  {
    slug: "blockchain",
    label: "Blockchain & Web3",
    count: "430 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    color: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBorder: "hover:border-orange-300",
    accent: "group-hover:bg-orange-500",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    count: "315 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "bg-red-50 text-red-600 border-red-100",
    hoverBorder: "hover:border-red-300",
    accent: "group-hover:bg-red-600",
  },
  {
    slug: "game-development",
    label: "Game Development",
    count: "290 gigs",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
    color: "bg-teal-50 text-teal-600 border-teal-100",
    hoverBorder: "hover:border-teal-300",
    accent: "group-hover:bg-teal-600",
  },
];

export default function BrowseCategories() {
  return (
    <section className="bg-zinc-50 border-t border-zinc-100 py-24 relative overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-green-800">
                All Specializations
              </span>
            </div>
            <h2
              className="text-zinc-950 leading-[1.06] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(34px, 4vw, 54px)",
                fontWeight: 700,
              }}
            >
              Every skill,{" "}
              <em className="not-italic text-zinc-400 font-normal">one platform.</em>
            </h2>
            <p className="text-[15px] text-zinc-500 leading-relaxed max-w-lg">
              From front-end interfaces to blockchain infrastructure — find pre-packaged expert services across every tech discipline.
            </p>
          </div>

          <Link
            to="/categories"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 hover:border-green-600 hover:text-green-700 text-[14px] font-semibold text-zinc-600 transition-all duration-200"
          >
            View all categories
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`group bg-white border-2 border-zinc-100 ${cat.hoverBorder} rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/5`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${cat.color}`}>
                {cat.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-[15px] font-bold text-zinc-900 mb-1 group-hover:text-zinc-950 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[13px] text-zinc-400 font-medium">{cat.count}</p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full bg-zinc-200 transition-colors duration-300 ${
                        i === 0 ? `${cat.accent} bg-transparent` : ""
                      }`}
                    />
                  ))}
                </div>
                <svg
                  className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all duration-200"
                  fill="none" viewBox="0 0 16 16"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}