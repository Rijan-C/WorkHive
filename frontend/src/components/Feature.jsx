import { useState } from "react";
import { Link } from "react-router-dom";

const freelancers = [
  {
    id: 1,
    name: "Arjun Mehta",
    title: "Full-Stack Engineer",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=arjun&backgroundColor=d1fae5",
    skills: ["React", "Node.js", "MongoDB"],
    rating: 4.9,
    reviews: 142,
    hourlyRate: 45,
    completedJobs: 218,
    badge: "Top Rated",
    available: true,
  },
  {
    id: 2,
    name: "Sofia Reyes",
    title: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=sofia&backgroundColor=fce7f3",
    skills: ["Figma", "Tailwind", "Framer"],
    rating: 4.8,
    reviews: 98,
    hourlyRate: 38,
    completedJobs: 164,
    badge: "Rising Star",
    available: true,
  },
  {
    id: 3,
    name: "Daniel Osei",
    title: "DevOps & Cloud Architect",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=daniel&backgroundColor=dbeafe",
    skills: ["AWS", "Docker", "Terraform"],
    rating: 5.0,
    reviews: 76,
    hourlyRate: 65,
    completedJobs: 109,
    badge: "Expert",
    available: false,
  },
  {
    id: 4,
    name: "Yuna Park",
    title: "Mobile Developer",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=yuna&backgroundColor=ede9fe",
    skills: ["React Native", "Swift", "Firebase"],
    rating: 4.7,
    reviews: 53,
    hourlyRate: 42,
    completedJobs: 87,
    badge: "Rising Star",
    available: true,
  },
];

const badgeStyles = {
  "Top Rated": "bg-amber-50 text-amber-700 border border-amber-200",
  "Rising Star": "bg-green-50 text-green-700 border border-green-200",
  "Expert": "bg-zinc-900 text-white border border-zinc-800",
};

export default function FeaturedFreelancers() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-white border-t border-zinc-100 py-24 relative overflow-hidden">

      {/* Ambient blob */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-green-50/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              <span className="text-[12px] font-bold tracking-widest uppercase text-green-800">
                Vetted Talent
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
              Meet the builders{" "}
              <em className="not-italic text-zinc-400 font-normal">behind the work.</em>
            </h2>
            <p className="text-[15px] text-zinc-500 leading-relaxed">
              Every freelancer on WorkHive is reviewed, rated, and ready to ship. Browse profiles, check reviews, and hire with confidence.
            </p>
          </div>

          <Link
            to="/freelancers"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 hover:border-green-600 hover:text-green-700 text-[14px] font-semibold text-zinc-600 transition-all duration-200"
          >
            Browse all talent
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {freelancers.map((f) => (
            <div
              key={f.id}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative bg-white rounded-3xl border-2 p-6 flex flex-col transition-all duration-300 cursor-pointer
                ${hovered === f.id
                  ? "border-green-400 shadow-xl shadow-green-900/5 -translate-y-1"
                  : "border-zinc-100 shadow-sm"
                }`}
            >
              {/* Badge */}
              <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide ${badgeStyles[f.badge]}`}>
                {f.badge}
              </span>

              {/* Avatar + availability */}
              <div className="relative w-16 h-16 mb-4">
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-zinc-100"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${f.available ? "bg-green-500" : "bg-zinc-300"}`}
                  title={f.available ? "Available" : "Busy"}
                />
              </div>

              {/* Name & title */}
              <h3 className="text-[16px] font-bold text-zinc-950 leading-tight mb-0.5 group-hover:text-green-700 transition-colors duration-200">
                {f.name}
              </h3>
              <p className="text-[13px] text-zinc-500 mb-4">{f.title}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {f.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] bg-zinc-50 border border-zinc-100 font-semibold text-zinc-500 px-2 py-0.5 rounded-md uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-auto pt-4 border-t border-zinc-50 grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[13px] font-bold text-zinc-900">{f.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{f.reviews} reviews</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400 leading-none mb-0.5">From</p>
                  <p className="text-[17px] font-black text-zinc-950 leading-none">Rs.{f.hourlyRate}<span className="text-[11px] font-semibold text-zinc-400">/hr</span></p>
                </div>
              </div>

              
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-14 pt-10 border-t border-zinc-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "12,000+", label: "Active Freelancers" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "4.9★", label: "Average Rating" },
            { value: "48hr", label: "Avg. First Response" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[26px] font-black text-zinc-950 leading-none mb-1">{stat.value}</p>
              <p className="text-[13px] text-zinc-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}