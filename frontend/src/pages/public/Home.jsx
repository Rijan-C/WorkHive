import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { dummyGigs } from "../../data/dummyGigs";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const carouselSlides = [
  {
    id: 1,
    name: "Sofia Chen",
    role: "AI/ML Engineer",
    rating: 4.9,
    rate: "Rs. 150/hr",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop",
    tag: "Expert",
    testimonial: "Helped us deploy LLM models in production within 2 weeks.",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Senior UX Designer",
    rating: 5.0,
    rate: "Rs. 120/hr",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=700&fit=crop",
    tag: "Top Rated",
    testimonial: "Redesigned our entire app interface, increased engagement by 40%.",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    role: "Blockchain Dev",
    rating: 4.8,
    rate: "Rs. 180/hr",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=700&fit=crop",
    tag: "Rising Star",
    testimonial: "Smart contract audit and deployment — flawless execution.",
  },
  {
    id: 4,
    name: "Elena Martinez",
    role: "Full Stack Architect",
    rating: 5.0,
    rate: "Rs. 200/hr",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=700&fit=crop",
    tag: "Expert",
    testimonial: "Scaled our backend to handle 1M+ users. Absolute genius.",
  },
];

const stats = [
  { value: "12K+", label: "Freelancers" },
  { value: "98%", label: "Satisfaction" },
  { value: "3.2K", label: "Live jobs" },
  { value: "140+", label: "Countries" },
];

const trustedBy = ["Stripe", "Notion", "Linear", "Vercel", "Figma", "Airbnb"];

const categories = [
  { name: "Web Development", icon: "💻", color: "from-blue-500 to-cyan-500" },
  { name: "Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
  { name: "Video Editing", icon: "🎬", color: "from-red-500 to-orange-500" },
  { name: "Marketing", icon: "📈", color: "from-green-500 to-emerald-500" },
  { name: "Writing", icon: "✍️", color: "from-yellow-500 to-amber-500" },
  { name: "AI Services", icon: "🤖", color: "from-indigo-500 to-violet-500" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    quote: "WorkHive transformed how we hire. Found an incredible React expert within 24 hours. The quality of freelancers is unmatched.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Product Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    quote: "The platform's escrow system gave us peace of mind. Our project was delivered ahead of schedule with stunning quality.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    quote: "As a freelancer, WorkHive helped me scale my business. The gig system makes it easy to showcase my services professionally.",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Web Development");
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const stagger = (i, base = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(25px)",
    transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${base + i * 80}ms, transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${base + i * 80}ms`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefcf8] via-white to-[#f5f3ef] text-zinc-900 selection:bg-green-100 selection:text-green-900 overflow-x-hidden">

      {/* Animated honeycomb / hexagon background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
              <path d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" fill="none" stroke="#15803d" strokeWidth="1" strokeOpacity="0.15" />
              <path d="M30 103.923 L60 86.603 L60 51.96 L30 69.28 L0 51.96 L0 86.603 Z" fill="none" stroke="#15803d" strokeWidth="1" strokeOpacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* ════════════════════════════════════════
          HERO SECTION with CAROUSEL & HIVE SHAPES
      ════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20 pt-12 pb-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT CONTENT */}
            <div className="space-y-8" style={stagger(0)}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md border border-white/30 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide text-zinc-600 uppercase">Trusted by 10,000+ businesses</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08]">
                <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">Hire the best</span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">freelancers</span>
                  <svg className="absolute -bottom-3 left-0 w-full" height="8" viewBox="0 0 300 8" preserveAspectRatio="none">
                    <path d="M0 4 Q75 0 150 4 T300 4" stroke="#15803d" strokeWidth="2" fill="none" opacity="0.3" />
                  </svg>
                </span>
                <br />
                <span className="text-zinc-800">in the tech industry</span>
              </h1>

              <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                Streamline hiring, reduce wait times, and scale your team with elite, vetted tech talent from around the globe.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/jobs"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-green-900/20 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Hire Elite Talent</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white border border-zinc-200 text-zinc-800 rounded-xl font-semibold transition-all duration-300 hover:border-green-500 hover:text-green-700 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Become a Seller
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                    <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-zinc-200/50">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="text-center sm:text-left" style={stagger(i, 200)}>
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT - CAROUSEL + HIVE SHAPES */}
            <div className="relative" style={stagger(1, 100)}>
              {/* Honeycomb frame decoration */}
              <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" stroke="#15803d" strokeWidth="2" fill="none" />
                  <path d="M50 20 L70 30 L70 50 L50 60 L30 50 L30 30 Z" stroke="#15803d" strokeWidth="1.5" fill="none" />
                </svg>
              </div>

              <div className="relative rounded-3xl bg-white/40 backdrop-blur-sm p-3 shadow-2xl border border-white/50">
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {carouselSlides.map((slide) => (
                      <div key={slide.id} className="w-full flex-shrink-0">
                        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
                          <img
                            src={slide.image}
                            alt={slide.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                          {/* Slide content */}
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wide">
                                {slide.tag}
                              </span>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-bold">{slide.rating}</span>
                              </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-1">{slide.name}</h3>
                            <p className="text-white/80 text-lg mb-2">{slide.role}</p>
                            <p className="text-green-300 font-semibold mb-4">{slide.rate}</p>
                            <p className="text-white/90 italic">"{slide.testimonial}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  

                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {carouselSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentSlide(idx);
                          resetAutoPlay();
                        }}
                        className={`transition-all duration-300 ${idx === currentSlide
                            ? "w-8 h-2 bg-green-600 rounded-full"
                            : "w-2 h-2 bg-white/60 rounded-full hover:bg-white"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Hexagonal floating badges - hive shape motif */}


            </div>
          </div>
        </div>
      </div>

      {/* TRUSTED BY MARQUEE (rest of the sections unchanged from previous, but I'll keep them for completeness) */}
      <div className="relative z-10 w-full py-8 border-y border-zinc-200/60 bg-white/30 backdrop-blur-sm my-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <p className="text-center text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-4">Trusted by innovative teams</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBy.map((brand) => (
              <span key={brand} className="text-lg font-semibold text-zinc-400 hover:text-zinc-700 transition-colors cursor-default tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          REST OF SECTIONS (How It Works, Gigs, Categories, Testimonials, CTA, Footer)
          — Same as before but I'll include them for a complete component —
      ════════════════════════════════════════ */}

      {/* How It Works */}
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20 py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-green-700">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
              How WorkHive works
            </h2>
            <p className="text-zinc-500 mt-4">Three simple steps to start hiring or earning on our platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Post your project", desc: "Describe your requirements, budget, and timeline. Get matched with top freelancers.", icon: "📝", color: "bg-blue-50" },
              { step: "02", title: "Choose a freelancer", desc: "Review proposals, portfolios, and ratings. Select the perfect match for your needs.", icon: "🤝", color: "bg-green-50" },
              { step: "03", title: "Pay & collaborate", desc: "Secure payments via escrow. Collaborate seamlessly until project completion.", icon: "🚀", color: "bg-purple-50" },
            ].map((item, i) => (
              <div key={i} className="group relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-zinc-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="text-sm font-mono font-bold text-green-600 mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Gigs Section */}
      <div className="relative z-10 w-full bg-white/40 backdrop-blur-sm py-24 border-y border-zinc-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-green-700">Top Services</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">Popular gigs right now</h2>
            </div>
            <Link to="/gigs" className="group inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800">
              View all gigs
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyGigs.slice(0, 4).map((gig) => (
              <div key={gig._id} className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-green-200">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img src={gig.images[0]} alt={gig.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur text-[10px] font-bold uppercase text-zinc-700 shadow-sm">{gig.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-zinc-900 line-clamp-2 group-hover:text-green-700 transition-colors mb-2">{gig.title}</h3>
                  <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{gig.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-sm font-bold">{gig.rating.toFixed(1)}</span>
                      <span className="text-xs text-zinc-400">({gig.totalSales})</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-400 uppercase">Starting at</p>
                      <p className="text-lg font-black text-zinc-900">Rs. {gig.packages[0].price}<span className="text-xs font-normal">/hr</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20 py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-green-700">Browse by category</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">Find expertise in any field</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 ${activeCategory === cat.name
                    ? "bg-zinc-900 text-white shadow-xl scale-[1.02]"
                    : "bg-white border border-zinc-200 hover:border-green-300 hover:shadow-md"
                  }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-sm opacity-75">2,000+ available gigs</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 w-full bg-gradient-to-r from-green-50 to-emerald-50 py-24 border-y border-green-100">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-green-700">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-2">Loved by freelancers & clients</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center gap-4 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200" />
                  <div>
                    <p className="font-bold text-zinc-900">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-zinc-600 leading-relaxed italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20 py-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-12 text-center shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ready to grow your business?</h2>
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8">
                Join thousands of businesses and freelancers already thriving on WorkHive.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-zinc-200 bg-white/50 backdrop-blur-sm py-12 mt-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  <span className="text-green-700">Work</span>
                  <span className="text-zinc-950">Hive</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 max-w-sm">The leading marketplace for tech freelancers. Connect with top talent from around the world.</p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/find-work" className="hover:text-green-700 transition">Find Work</Link></li>
                <li><Link to="/hire" className="hover:text-green-700 transition">Hire Talent</Link></li>
                <li><Link to="/pricing" className="hover:text-green-700 transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/about" className="hover:text-green-700 transition">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-green-700 transition">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-green-700 transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link to="/help" className="hover:text-green-700 transition">Help Center</Link></li>
                <li><Link to="/safety" className="hover:text-green-700 transition">Trust & Safety</Link></li>
                <li><Link to="/contact" className="hover:text-green-700 transition">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200 mt-8 pt-8 text-center text-sm text-zinc-400">
            © 2025 WorkHive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}