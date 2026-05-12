export default function FreelancerProfile() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* PROFILE HEADER */}
      <div className="flex items-center gap-6 bg-gray-900 p-6 rounded-2xl shadow-lg">
        
        <img
          src="https://i.pravatar.cc/150?img=12"
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">Rijan Chudal</h1>
          <p className="text-gray-400">Full Stack MERN Developer</p>

          <div className="flex gap-4 mt-2 text-sm text-gray-300">
            <span>⭐ 4.8 Rating</span>
            <span>📍 Nepal</span>
            <span>⚡ Responds in 1 hour</span>
          </div>
        </div>

        <button className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-500">
          Contact
        </button>
      </div>

      {/* SKILLS */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        <div className="flex gap-2 flex-wrap">
          {["React", "Node.js", "MongoDB", "Express", "UI Design"].map((skill) => (
            <span
              key={skill}
              className="bg-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* GIGS SECTION */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">My Gigs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* GIG CARD */}
          <div className="bg-gray-900 p-4 rounded-2xl hover:scale-105 transition">
            <img
              src="https://source.unsplash.com/400x250/?website"
              className="rounded-xl mb-3"
            />

            <h3 className="font-semibold text-lg">
              I will build MERN stack website
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Web Development • Starting from
            </p>

            <p className="text-blue-400 font-bold mt-2">$20</p>

            {/* PACKAGES PREVIEW */}
            <div className="mt-3 text-xs text-gray-400 space-y-1">
              <p>Basic - $20 (3 days)</p>
              <p>Standard - $50 (5 days)</p>
              <p>Premium - $100 (7 days)</p>
            </div>

            <button className="mt-4 w-full bg-blue-600 py-2 rounded-xl">
              View Gig
            </button>
          </div>

          {/* DUPLICATE CARD (example) */}
          <div className="bg-gray-900 p-4 rounded-2xl hover:scale-105 transition">
            <img
              src="https://source.unsplash.com/400x250/?app"
              className="rounded-xl mb-3"
            />

            <h3 className="font-semibold text-lg">
              I will design modern UI/UX
            </h3>

            <p className="text-blue-400 font-bold mt-2">$15</p>

            <button className="mt-4 w-full bg-blue-600 py-2 rounded-xl">
              View Gig
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}