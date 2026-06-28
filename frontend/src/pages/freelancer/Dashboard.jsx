import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getMyProfile } from "../../api/profile.api";
import { fetchMyGigs } from "../../api/gig.api";

// Ensure Boxicons is linked in your project:
// <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

const navItems = [
  { label: "Dashboard", icon: "bx-grid-alt" },
  { label: "My Gigs", icon: "bx-briefcase" },
  { label: "Orders", icon: "bx-receipt" },
  { label: "Messages", icon: "bx-message-square-detail" },
  { label: "Jobs", icon: "bx-search-alt" }

];

const tips = [
  { icon: "bx-user-circle", title: "Add a profile photo", desc: "Profiles with photos get 3x more views." },
  { icon: "bx-edit-alt", title: "Write a bio", desc: "Tell clients what makes you unique." },
  { icon: "bx-rocket", title: "Create your first gig", desc: "Start earning by listing your services." },
  { icon: "bx-badge-check", title: "Complete your skills", desc: "Add skills so clients can find you faster." },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

const getProfileImageUrl = (image) => {
  if (!image) return "";
  if (/^(https?:|blob:|data:)/.test(image)) return image;

  const normalizedImage = image.replace(/\\/g, "/");
  return normalizedImage.startsWith("/")
    ? `${API_ORIGIN}${normalizedImage}`
    : `${API_ORIGIN}/${normalizedImage}`;
};

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [myGigs, setMyGigs] = useState([]);
  const [gigsLoading, setGigsLoading] = useState(false);
  const [gigsError, setGigsError] = useState("");
  const [messagesCount, setMessagesCount] = useState(0);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [visible, setVisible] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const stats = [
    {
      label: "Total Gigs",
      value: myGigs.length.toString(),
      sub: myGigs.length === 0 ? "No gigs yet" : `${myGigs.length} published gigs`,
      icon: "bx-folder",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Orders",
      value: "0",
      sub: "No active orders",
      icon: "bx-time-five",
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Total Earnings",
      value: "₹0",
      sub: "Start earning today",
      icon: "bx-wallet",
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Avg. Rating",
      value: "—",
      sub: "No reviews yet",
      icon: "bx-star",
      color: "bg-amber-50 text-amber-500",
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setUser({ name: "Freelancer", email: "freelancer@workhive.com" });
    } else {
      setUser(JSON.parse(storedUser));
    }

    const loadProfile = async () => {
      try {
        const profileData = await getMyProfile();
        setProfile(profileData);
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error("Error loading profile:", err);
        }
      }
    };

    if (localStorage.getItem("token")) {
      loadProfile();
    }

    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Fetch gigs once on mount so dashboard metrics reflect user's gigs immediately
  useEffect(() => {
    const loadInitialGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        setGigsLoading(true);
        const data = await fetchMyGigs(token);
        setMyGigs(data.gigs || []);
      } catch (err) {
        console.error("Error loading initial gigs:", err);
      } finally {
        setGigsLoading(false);
      }
    };

    loadInitialGigs();
  }, []);

  useEffect(() => {
    const loadMyGigs = async () => {
      try {
        setGigsLoading(true);
        setGigsError("");
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await fetchMyGigs(token);
        setMyGigs(data.gigs || []);
      } catch (err) {
        console.error("Error loading gigs:", err);
        setGigsError("Unable to load your gigs. Please refresh.");
      } finally {
        setGigsLoading(false);
      }
    };

    if (activeNav === "My Gigs") {
      loadMyGigs();
    }

    if (location.state?.refreshMyGigs) {
      setActiveNav("My Gigs");
      loadMyGigs();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [activeNav, location.state, location.pathname, navigate]);

  useEffect(() => {
    setImageFailed(false);
  }, [profile?.profileImage]);

  const fade = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const completedProfileItems = [
    Boolean(profile?.profileImage),
    Boolean(profile?.bio),
    Boolean(profile?.title),
    Boolean(profile?.skills?.length),
  ].filter(Boolean).length;
  const profileProgress = Math.round((completedProfileItems / 4) * 100);
  const profileStrength = profileProgress >= 100 ? "Complete" : profileProgress >= 50 ? "Growing" : "Beginner";
  const profileImageUrl = getProfileImageUrl(profile?.profileImage);
  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;

  return (
    <div
      className="min-h-screen w-full flex bg-[#f7f6f2] text-zinc-900"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ══════════════════════════════
          SIDEBAR (Strict Original Theme)
         ══════════════════════════════ */}
      <aside className="w-[240px] shrink-0 bg-zinc-950 text-white flex flex-col justify-between py-7 px-5 sticky top-0 h-screen">
        <div className="flex flex-col">
          {/* Logo */}
          <Link to="/" className="mb-10 px-2 block">
            <span
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-green-500">Work</span>Hive
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 text-left ${isActive
                    ? "bg-green-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                >
                  <i className={`bx ${item.icon} text-base ${isActive ? "text-white" : "text-zinc-400"}`}></i>
                  <span className="flex-1">{item.label}</span>
                  {((item.label === "Messages") ? messagesCount : item.badge) > 0 && (
                    <span className="w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-black flex items-center justify-center">
                      {item.label === "Messages" ? messagesCount : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User card */}
        <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-2.5">

            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white truncate leading-tight">{user?.name || "Freelancer"}</p>
              <p className="text-[11px] text-zinc-500 truncate mt-0.5">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-850 hover:bg-red-900/40 hover:text-red-400 text-zinc-400 text-[12px] font-semibold transition-all duration-200"
          >
            <i className="bx bx-log-out text-sm"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════
          MAIN WORKSPACE
         ══════════════════════════════ */}
      <main className="flex-1 p-10 max-w-[1400px] mx-auto w-full flex flex-col justify-start">

        {/* Header Block */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4" style={fade(0)}>
          <div className="flex items-center gap-4">
            {showProfileImage ? (
              <img
                src={profileImageUrl}
                alt={user?.name || "Freelancer"}
                onError={() => setImageFailed(true)}
                className="h-40 w-40 rounded-2xl object-cover shadow-sm "
              />
            ) : (
              <div
                className="h-16 w-16 rounded-2xl bg-green-600 flex items-center justify-center text-white text-2xl font-black shrink-0 shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {user?.name?.[0]?.toUpperCase() || "F"}
              </div>
            )}

            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{greeting}</p>
              <h2
                className="text-zinc-950 leading-tight tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 700,
                }}
              >
                {user?.name || "Freelancer"}
              </h2>
              <p className="text-[13px] text-zinc-500 mt-1">
                {profile?.title || "Here's what's happening with your WorkHive account today."}
              </p>
              {profile?.location && (
                <p className="text-[12px] text-zinc-400 mt-1">{profile.location}</p>
              )}
            </div>
          </div>


        </div>

        {activeNav === "Dashboard" && (
          <>
            {/* Stats Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm hover:border-zinc-300 transition-all duration-200"
                  style={fade(i * 40)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{s.label}</p>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                      <i className={`bx ${s.icon} text-base`}></i>
                    </div>
                  </div>
                  <p
                    className="text-3xl font-black text-zinc-950 leading-none mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11px] text-zinc-400">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Split Content Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

              {/* Checklist Segment - hidden when profile is complete */}
              {profileProgress < 100 && (
                <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm" style={fade(160)}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Get started
                      </h3>
                      <p className="text-[12px] text-zinc-400">Complete your profile to attract more clients</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Progress</p>
                      <p className="text-xl font-black text-zinc-900" style={{ fontFamily: "'Playfair Display', serif" }}>{profileProgress}%</p>
                    </div>
                  </div>

                  {/* Smooth Progress Track */}
                  <div className="w-full h-1 bg-zinc-100 rounded-full mb-5 overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${profileProgress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tips.map((tip, index) => {
                      const done = index < completedProfileItems;

                      return (
                        <div
                          key={tip.title}
                          className={`flex gap-3.5 p-4 rounded-xl border transition-all duration-200 group cursor-pointer ${done
                              ? "border-green-100 bg-green-50/40"
                              : "border-zinc-100 hover:border-green-200 hover:bg-green-50/20"
                            }`}
                        >
                          <div className={`text-xl transition-colors ${done ? "text-green-600" : "text-zinc-400 group-hover:text-green-600"}`}>
                            <i className={`bx ${done ? "bx-check-circle" : tip.icon}`}></i>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-zinc-800 group-hover:text-green-700 transition-colors">{tip.title}</p>
                            <p className="text-[11px] text-zinc-400 mt-0.5 leading-normal">{tip.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Right Menu Sidecar */}
              <div className="flex flex-col gap-6">

                {/* Profile Strengths Card (improved) */}
                {/* Profile Card */}
                <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm" style={fade(200)}>

                  {/* Top banner */}
                  <div className="h-16 bg-gradient-to-br from-green-700 to-green-500 relative">
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                    />
                  </div>

                  <div className="px-5 pb-5">
                    {/* Avatar overlapping banner */}
                    <div className="flex items-end justify-between -mt-8 mb-4">
                      {showProfileImage ? (
                        <img
                          src={profileImageUrl}
                          alt={user?.name || "F"}
                          className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center text-white text-2xl font-black border-4 border-white shadow-md">
                          {user?.name?.[0]?.toUpperCase() || "F"}
                        </div>
                      )}

                      {/* Profile % badge */}
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">
                          Profile
                        </span>
                        <span
                          className={`text-2xl font-black leading-none ${profileProgress === 100 ? "text-green-700" : "text-zinc-900"
                            }`}
                        >
                          {profileProgress}%
                        </span>
                      </div>
                    </div>

                    {/* Name + bio */}
                    <p className="text-[15px] font-bold text-zinc-900 truncate leading-tight">
                      {profile?.title || user?.name || "Freelancer"}
                    </p>
                    <p className="text-[12px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {profile?.bio || "Add a short bio to attract clients."}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-4 mb-1">
                      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${profileProgress}%`,
                            background: profileProgress === 100
                              ? "#16a34a"
                              : "linear-gradient(90deg, #16a34a, #4ade80)",
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1.5">
                        {profileProgress < 100
                          ? `${100 - profileProgress}% left to complete`
                          : "Profile complete ✓"}
                      </p>
                    </div>

                    {/* Skills */}
                    {profile?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {profile.skills.slice(0, 5).map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                        {profile.skills.length > 5 && (
                          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-400 font-semibold">
                            +{profile.skills.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <Link
                      to="/profile"
                      className="mt-5 flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-950 hover:bg-green-700 text-white text-[13px] font-bold rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-green-900/20 hover:-translate-y-0.5"
                    >
                      {profile ? "Edit profile" : "Complete profile"}
                      <i className="bx bx-right-arrow-alt text-[16px]" />
                    </Link>
                  </div>
                </div>


              </div>
            </div>

            {/* Orders Datatable Zero State */}
            <div className="mt-6 bg-white rounded-2xl border border-zinc-200/60 p-8 shadow-sm text-center" style={fade(280)}>
              <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                <i className="bx bx-data text-lg"></i>
              </div>
              <h4 className="text-sm font-bold text-zinc-900 mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>No orders yet</h4>
              <p className="text-[12px] text-zinc-400 mb-4 max-w-xs mx-auto">
                Once clients start ordering your services, your performance ledger data will populate here.
              </p>
              <Link
                to="/freelancer/createGig"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-950 hover:bg-green-700 text-white text-[12px] font-bold rounded-xl transition-all"
              >
                Create your first gig
                <i className="bx bx-right-arrow-alt text-base"></i>
              </Link>
            </div>
          </>
        )}

        {activeNav === "My Gigs" && (
          <div className="space-y-6" style={fade(40)}>
            <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">My Gigs</p>
                  <h3 className="text-xl font-bold text-zinc-950">Your active listings</h3>
                  <p className="text-[12px] text-zinc-500 mt-1">Review, edit, or add new gig listings from your freelancer dashboard.</p>
                </div>
                <Link
                  to="/freelancer/createGig"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-zinc-950 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-all"
                >
                  <i className="bx bx-plus text-base"></i>
                  Create gig
                </Link>
              </div>

              {gigsLoading ? (
                <p className="text-sm text-zinc-500">Loading your gigs…</p>
              ) : gigsError ? (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{gigsError}</div>
              ) : myGigs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center">
                  <p className="text-sm font-semibold text-zinc-900 mb-2">No gigs found yet.</p>
                  <p className="text-[12px] text-zinc-500 mb-4">Create your first gig and it will appear here for quick access.</p>
                  <Link
                    to="/freelancer/createGig"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-semibold"
                  >
                    Add a gig
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {myGigs.map((gig) => (
                    <div key={gig._id} className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-widest text-zinc-400 mb-2">{gig.category}</p>
                          <h4 className="text-lg font-bold text-zinc-950 truncate">{gig.title}</h4>
                          <p className="text-[12px] text-zinc-500 mt-2 line-clamp-2">{gig.description}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap text-[11px] text-zinc-500">
                          <span className="rounded-full border border-zinc-200 px-3 py-1">{gig.packages?.length ?? 0} package{gig.packages?.length === 1 ? "" : "s"}</span>
                          <span className="rounded-full border border-zinc-200 px-3 py-1">{gig.tags?.length ?? 0} tag{gig.tags?.length === 1 ? "" : "s"}</span>
                          <span className="rounded-full border border-zinc-200 px-3 py-1">{new Date(gig.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {gig.images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {gig.images.slice(0, 4).map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${gig.title} ${index + 1}`}
                              className="h-24 w-full rounded-2xl object-cover border border-zinc-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeNav === "Orders" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-12 text-center" style={fade(40)}>
            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <i className="bx bx-receipt text-lg"></i>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 mb-1">Orders</h3>
            <p className="text-[12px] text-zinc-400 max-w-xs mx-auto">No orders yet.</p>
          </div>
        )}

        {activeNav === "Messages" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 shadow-sm" style={fade(40)}>
            <h3 className="text-lg font-bold text-zinc-950 mb-2">Messages</h3>
            {messagesCount === 0 ? (
              <p className="text-[12px] text-zinc-400">You have no messages.</p>
            ) : (
              <p className="text-[12px] text-zinc-400">You have {messagesCount} messages.</p>
            )}
          </div>
        )}

        {activeNav === "Jobs" && (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-12 text-center" style={fade(40)}>
            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <i className="bx bx-search-alt text-lg"></i>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 mb-1">Jobs</h3>
            <p className="text-[12px] text-zinc-400 max-w-xs mx-auto">Job listings and opportunities will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
