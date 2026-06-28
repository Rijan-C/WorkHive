import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // default role
  });

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
      const res = await registerUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "freelancer") {
        navigate("/freelancer/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f7f6f2] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── LEFT FORM ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 space-y-2" style={fade(60)}>
            <h1
              className="text-zinc-900 leading-tight tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
              }}
            >
              Create your account
            </h1>

            <p className="text-[15px] text-zinc-500">
              Already have an account?{" "}
              <Link to="/login" className="text-green-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <div
            className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm"
            style={fade(120)}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <input
                name="name"
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl"
              />

              {/* Email */}
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl"
              />

              {/* Password */}
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-sm text-zinc-500"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>

              {/* ROLE SELECTOR */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">
                  Register as
                </label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm"
                >
                  <option value="client">Client (Hire talent)</option>
                  <option value="freelancer">Freelancer (Sell services)</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-zinc-950 hover:bg-green-700 text-white rounded-xl font-semibold"
              >
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-400">
            By continuing you agree to WorkHive terms
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        className="hidden lg:flex lg:w-[44%] bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-900/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-800/15 rounded-full blur-[100px]" />

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
        <div className="relative z-10">
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
        <div className="relative z-10 space-y-6">
          <div className="w-10 h-px bg-green-500" />

          <p
            className="text-white leading-snug"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 2.5vw, 34px)",
              fontWeight: 700,
            }}
          >
            Choose your role and{" "}
            <em className="not-italic text-zinc-400 font-normal">
              start your journey.
            </em>
          </p>

          <p className="text-[15px] text-zinc-400 leading-relaxed max-w-xs">
            Join thousands of clients and freelancers building the future of
            work on WorkHive.
          </p>
        </div>

        {/* Trust / tags */}
        <div className="relative z-10 flex items-center gap-6">
          {["Hire", "Work", "Earn"].map((item) => (
            <span
              key={item} 
              className="text-[13px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
