import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef(null);

  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileSearchOpen) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("searchQuery");
    if (query && query.trim()) {
      console.log("Searching for:", query);
      // Integrate with search logic
    }
    setMobileSearchOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className=" mx-auto px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between gap-6 py-4">
          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <span
              className="text-2xl font-black tracking-tight cursor-pointer"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-green-700">Work</span>
              <span className="text-zinc-950">Hive</span>
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full border border-zinc-200/70 pl-4 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 focus-within:border-green-600 focus-within:shadow-sm focus-within:shadow-green-100"
            >
              <input
                type="text"
                name="searchQuery"
                placeholder="Search services..."
                className="w-full py-2.5 bg-transparent outline-none text-[14px] sm:text-[15px] text-zinc-800 placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="p-3 m-0.5 hover:bg-green-100 rounded-full transition-colors duration-200 text-zinc-500 hover:text-green-700 shrink-0"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* ACTION BUTTONS + MOBILE SEARCH TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile search icon */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 text-zinc-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-all duration-200"
              aria-label="Open search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-zinc-950 hover:bg-green-700 text-white text-[13px] sm:text-[14px] font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/20"
            >
              Login
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M6 3l4 5-4 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-white border border-zinc-200 hover:border-green-500 hover:text-green-700 text-zinc-800 text-[13px] sm:text-[14px] font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Register
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* MOBILE SEARCH EXPANDABLE */}
        {mobileSearchOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-zinc-100/80 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={mobileSearchInputRef}
                type="text"
                name="searchQuery"
                placeholder="Search services..."
                className="w-full py-3 pl-5 pr-12 bg-white border border-zinc-200 rounded-xl text-[15px] text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-green-700 rounded-full transition-colors"
                aria-label="Submit search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;