import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "CTO",
    company: "Stackify Labs",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=dbeafe",
    text: "We hired a React developer through WorkHive in under 24 hours. The gig structure made scoping so clear — no back-and-forth, just clean delivery. Saved us two weeks of recruitment time.",
    rating: 5,
    hired: "Full-Stack Engineer",
    tag: "Tech Startup",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Product Lead",
    company: "Nuance Digital",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=priya&backgroundColor=fce7f3",
    text: "WorkHive completely changed how our team sources design talent. The quality of freelancers here is genuinely higher than any other platform I've used. Structured gigs = no surprises.",
    rating: 5,
    hired: "UI/UX Designer",
    tag: "Product Agency",
  },
  {
    id: 3,
    name: "Tom Eriksson",
    role: "Engineering Manager",
    company: "Vaultly",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=tom&backgroundColor=d1fae5",
    text: "Our DevOps bottleneck was fixed in a single sprint. The freelancer we found had his AWS credentials set up and was pushing infrastructure changes on day one. Unreal turnaround.",
    rating: 5,
    hired: "DevOps Engineer",
    tag: "FinTech",
  },
  {
    id: 4,
    name: "Layla Hassan",
    role: "Founder",
    company: "Bloom Studio",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=layla&backgroundColor=ede9fe",
    text: "As a solo founder, I needed reliable tech help fast. WorkHive gave me a vetted mobile developer who treated my project like their own. The workspace chat made collaboration seamless.",
    rating: 5,
    hired: "Mobile Developer",
    tag: "Solo Founder",
  },
  {
    id: 5,
    name: "James Okafor",
    role: "Director of Engineering",
    company: "Parity Systems",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=james&backgroundColor=fef3c7",
    text: "We've run 40+ projects through WorkHive this year. The order management pipeline is the best in the market — transparent, fast, and the freelancer quality is consistently excellent.",
    rating: 5,
    hired: "Backend Engineer",
    tag: "Enterprise",
  },
  {
    id: 6,
    name: "Anya Petrov",
    role: "Head of Product",
    company: "Loopform",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=anya&backgroundColor=fee2e2",
    text: "I was skeptical at first, but our first hire on WorkHive delivered a pixel-perfect Figma system in 5 days. We've now built an entire design library with freelancers from this platform.",
    rating: 5,
    hired: "UI Designer",
    tag: "SaaS",
  },
];

function StarRow({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="bg-zinc-950 py-24 relative overflow-hidden border-t border-zinc-800">

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/40 border border-green-700/40 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-green-400">
                Client Stories
              </span>
            </div>
            <h2
              className="text-white leading-[1.06] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(34px, 4vw, 54px)",
                fontWeight: 700,
              }}
            >
              Trusted by teams{" "}
              <em className="not-italic text-zinc-500 font-normal">that ship fast.</em>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl border border-zinc-700 hover:border-green-500 flex items-center justify-center text-zinc-400 hover:text-green-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-xl border border-zinc-700 hover:border-green-500 flex items-center justify-center text-zinc-400 hover:text-green-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">

          {/* Main card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden">
            {/* Giant quote mark */}
            <span
              className="absolute top-4 right-8 text-[120px] leading-none text-zinc-800 select-none pointer-events-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </span>

            <div className="space-y-6 relative z-10">
              <StarRow count={testimonials[active].rating} />
              <p
                className="text-white leading-relaxed"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(16px, 2vw, 22px)",
                  fontWeight: 400,
                }}
              >
                "{testimonials[active].text}"
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 flex-wrap gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[active].avatar}
                  alt={testimonials[active].name}
                  className="w-12 h-12 rounded-xl object-cover bg-zinc-800"
                />
                <div>
                  <p className="text-[15px] font-bold text-white">{testimonials[active].name}</p>
                  <p className="text-[13px] text-zinc-400">{testimonials[active].role} · {testimonials[active].company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">Hired</span>
                <span className="text-[12px] font-bold text-green-400 bg-green-900/30 border border-green-800/50 px-3 py-1 rounded-full">
                  {testimonials[active].hired}
                </span>
              </div>
            </div>
          </div>

          {/* Side stack */}
          <div className="flex flex-col gap-3">
            {[
              testimonials[(active + 1) % testimonials.length],
              testimonials[(active + 2) % testimonials.length],
            ].map((t, i) => (
              <div
                key={t.id}
                onClick={() => setActive(testimonials.indexOf(t))}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 flex-1"
              >
                <StarRow count={t.rating} />
                <p className="text-[13px] text-zinc-400 leading-relaxed line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-lg object-cover bg-zinc-800" />
                  <div>
                    <p className="text-[13px] font-bold text-white leading-none">{t.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-green-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}