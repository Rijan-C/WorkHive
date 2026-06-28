import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(16px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      const { token, user } = res.data;

      // store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // role-based redirect
      if (user.role === "freelancer") {
        navigate("../freelancer/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } catch (err) {
      console.log(err.response?.data);

      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen bg-[#f7f6f2] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── LEFT PANEL — Branding ── */}
      <div className="hidden lg:flex lg:w-[44%] bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-900/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-800/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10" style={fade(0)}>
          <Link to="/">
            <span
              className="text-2xl font-black tracking-tight text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-green-500">Work</span>Hive
            </span>
          </Link>
        </div>

        {/* Center quote */}
        <div className="relative z-10 space-y-6" style={fade(100)}>
          <div className="w-10 h-px bg-green-500" />
          <p
            className="text-white leading-snug"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 2.5vw, 34px)",
              fontWeight: 700,
            }}
          >
            Your next great collaboration{" "}
            <em className="not-italic text-zinc-400 font-normal">
              starts here.
            </em>
          </p>
          <p className="text-[15px] text-zinc-400 leading-relaxed max-w-xs">
            Connect with 12,000+ vetted tech freelancers ready to ship your next
            project.
          </p>

          {/* Social proof avatars */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {[
                "https://api.dicebear.com/7.x/personas/svg?seed=arjun&backgroundColor=d1fae5",
                "https://api.dicebear.com/7.x/personas/svg?seed=sofia&backgroundColor=fce7f3",
                "https://api.dicebear.com/7.x/personas/svg?seed=daniel&backgroundColor=dbeafe",
                "https://api.dicebear.com/7.x/personas/svg?seed=yuna&backgroundColor=ede9fe",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-8 h-8 rounded-full border-2 border-zinc-950 object-cover bg-zinc-800"
                />
              ))}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-white">
                98% satisfaction rate
              </p>
              <p className="text-[12px] text-zinc-500">
                across 3,200+ completed projects
              </p>
            </div>
          </div>
        </div>

        {/* Bottom trust row */}
        <div
          className="relative z-10 flex items-center gap-6"
          style={fade(200)}
        >
          {["Stripe", "Notion", "Vercel", "Figma"].map((b) => (
            <span
              key={b}
              className="text-[13px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors cursor-default"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10" style={fade(0)}>
            <Link to="/">
              <span
                className="text-2xl font-black tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <span className="text-green-700">Work</span>
                <span className="text-zinc-950">Hive</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8 space-y-2" style={fade(60)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[12px] font-semibold tracking-widest uppercase text-zinc-500">
                Welcome back
              </span>
            </div>
            <h1
              className="text-zinc-950 leading-tight tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
              }}
            >
              Sign in to your account
            </h1>
            <p className="text-[15px] text-zinc-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-700 font-semibold hover:text-green-600 transition-colors"
              >
                Create one free
              </Link>
            </p>
          </div>

          {/* Form card */}
          <div
            className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm shadow-zinc-900/5"
            style={fade(120)}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <svg
                    className="w-4 h-4 text-red-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p className="text-[13px] text-red-600 font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-zinc-700">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-zinc-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[12px] text-zinc-400 hover:text-green-700 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPass ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-zinc-950 hover:bg-green-700 disabled:bg-zinc-300 text-white text-[14px] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p
            className="mt-6 text-center text-[12px] text-zinc-400"
            style={fade(200)}
          >
            By signing in, you agree to our{" "}
            <Link
              to="/terms"
              className="underline hover:text-zinc-600 transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="underline hover:text-zinc-600 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
