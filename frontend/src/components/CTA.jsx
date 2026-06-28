import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="bg-white border-t border-zinc-100 py-24 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-50/80 blur-[80px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-green-50/60 blur-[80px]" />
        {/* Dot grid accent */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-950 rounded-[2.5rem] px-8 md:px-16 py-16 md:py-20 relative overflow-hidden">

          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-green-700/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Left copy */}
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/40 border border-green-700/40 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[12px] font-bold tracking-widest uppercase text-green-400">
                  Join WorkHive Today
                </span>
              </div>

              <h2
                className="text-white leading-[1.06] tracking-tight mb-5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                }}
              >
                Your next great hire{" "}
                <em className="not-italic text-zinc-500 font-normal">is already here.</em>
              </h2>

              <p className="text-[15px] text-zinc-400 leading-relaxed mb-8">
                Whether you're a startup looking to ship faster or a developer ready to monetize your skills — WorkHive is the platform built for how modern tech teams actually work.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/register?role=client"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white text-[14px] font-bold rounded-xl transition-colors duration-200"
                >
                  Hire a freelancer
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="/register?role=freelancer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white text-[14px] font-bold rounded-xl transition-all duration-200"
                >
                  Start freelancing
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right stats card */}
            <div className="shrink-0 grid grid-cols-2 gap-3 w-full max-w-xs">
              {[
                { value: "12K+", label: "Freelancers", sub: "Active on platform" },
                { value: "98%", label: "Satisfaction", sub: "Client-rated quality" },
                { value: "24hr", label: "Avg. Hire", sub: "Time to first match" },
                { value: "$0", label: "To Join", sub: "Free for freelancers" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center"
                >
                  <p className="text-[26px] font-black text-white leading-none mb-0.5">{s.value}</p>
                  <p className="text-[12px] font-bold text-green-400 mb-0.5">{s.label}</p>
                  <p className="text-[11px] text-zinc-500">{s.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}