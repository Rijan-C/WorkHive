import { useState } from "react";

const workflowData = {
  client: [
    {
      phase: "01",
      icon: "bx-search-alt",
      title: "Find a Tech Gig",
      desc: "Browse and filter pre-packaged developer services tailored to your exact tech stack requirements."
    },
    {
      phase: "02",
      icon: "bx-git-pull-request",
      title: "Instantiate Order",
      desc: "Select a package tier to instantly initialize a formal contract record securely inside MongoDB."
    },
    {
      phase: "03",
      icon: "bx-message-square-detail",
      title: "Track & Collaborate",
      desc: "Open a dedicated workspace conversation channel to manage file updates, share code links, and sign off."
    }
  ],
  freelancer: [
    {
      phase: "01",
      icon: "bx-layer-plus",
      title: "Publish Services",
      desc: "Build and deploy structured service listings with clear pricing tiers and delivery milestones."
    },
    {
      phase: "02",
      icon: "bx-slideshow",
      title: "Manage Dashboard",
      desc: "Track incoming notifications, accept order tickets, and transition your project lifecycles seamlessly."
    },
    {
      phase: "03",
      icon: "bx-cloud-upload",
      title: "Submit Delivery",
      desc: "Upload completed deliverables directly to the pipeline and build five-star platform ratings."
    }
  ]
};

export default function HowItWorks() {
  const [role, setRole] = useState("client");

  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-zinc-50 border-t border-zinc-200 py-24 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100/80 border border-green-200/60 rounded-full shadow-[0_2px_10px_rgba(34,197,94,0.05)]">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-[12px] font-bold tracking-widest uppercase text-green-800">
              Interactive Blueprint
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-zinc-950 tracking-tight font-serif leading-none">
            How WorkHive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">manages operations.</span>
          </h2>
          <p className="text-base text-zinc-600 font-medium max-w-lg mx-auto">
            A clean data pipeline syncing clients and freelancers from discovery to final workspace deployment.
          </p>
        </div>

        {/* ROLE TOGGLE */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-zinc-950 rounded-2xl shadow-xl shadow-zinc-950/10 border border-zinc-800">
            <button
              onClick={() => setRole("client")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                role === "client"
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "text-zinc-300 hover:text-zinc-100"
              }`}
            >
              <i className="bx bx-briefcase text-base" />
              Hiring Workflow
            </button>
            <button
              onClick={() => setRole("freelancer")}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                role === "freelancer"
                  ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                  : "text-zinc-300 hover:text-zinc-100"
              }`}
            >
              <i className="bx bx-bolt-circle text-base" />
              Freelancing Pipeline
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowData[role].map((step) => (
            <div
              key={step.phase}
              className="bg-white border-2 border-zinc-200/80 rounded-3xl p-8 relative shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-green-500 hover:shadow-[0_20px_40px_rgba(34,197,94,0.04)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="absolute top-6 right-8 font-mono text-3xl font-black  group-hover:text-zinc-100 transition-colors duration-300 select-none">
                {step.phase}
              </span>

              <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center text-white text-2xl mb-8 group-hover:bg-green-600 shadow-lg shadow-zinc-950/10 group-hover:shadow-green-600/20 transition-all duration-300">
                <i className={`bx ${step.icon}`} />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight group-hover:text-green-700 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[15px] text-zinc-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    
  );
}