import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrUpdateProfile,
  getMyProfile,
} from "../../api/profile.api";

const emptyForm = {
  title: "",
  bio: "",
  skills: "",
  profileImage: "",
  profileImageFile: null,
  profileImageName: "",
  location: "",
  github: "",
  linkedin: "",
  website: "",
};

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const profile = await getMyProfile();
        const socialLinks = profile.socialLinks || {};

        setForm({
          title: profile.title || "",
          bio: profile.bio || "",
          skills: profile.skills?.join(", ") || "",
          profileImage: profile.profileImage || "",
          profileImageFile: null,
          profileImageName: profile.profileImageName || "",
          location: profile.location || "",
          github: socialLinks.github || "",
          linkedin: socialLinks.linkedin || "",
          website: socialLinks.website || "",
        });
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Could not load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profileImageFile: file,
      profileImageName: file.name,
      profileImage: URL.createObjectURL(file),
    }));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const skills = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const socialLinks = {
      github: form.github,
      linkedin: form.linkedin,
      website: form.website,
    };

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("bio", form.bio);
    payload.append("location", form.location);
    payload.append("skills", JSON.stringify(skills));
    payload.append("socialLinks", JSON.stringify(socialLinks));
    payload.append("profileImage", form.profileImage);
    payload.append("profileImageName", form.profileImageName);

    if (form.profileImageFile) {
      payload.set("profileImage", form.profileImageFile);
    }

    try {
      const savedProfile = await createOrUpdateProfile(payload);
      setForm((prev) => ({
        ...prev,
        profileImage: savedProfile.profileImage || prev.profileImage,
        profileImageFile: null,
        profileImageName: savedProfile.profileImageName || prev.profileImageName,
      }));
      setMessage("Profile saved.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f7f6f2] flex items-center justify-center text-sm text-zinc-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-[#f7f6f2] px-6 py-10 text-zinc-900"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Freelancer Profile
            </p>
            <h1
              className="mt-1 text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Complete your profile
            </h1>
          </div>

          <Link
            to="/freelancer/dashboard"
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
          >
            Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          {message && (
            <div className="mb-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700">
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700">
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Kathmandu, Nepal"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700 sm:col-span-2">
              Bio
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={5}
                placeholder="Tell clients what you do best."
                className="resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700 sm:col-span-2">
              Skills
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <div className="flex flex-col gap-3 sm:col-span-2">
              <p className="text-sm font-semibold text-zinc-700">
                Profile photo
              </p>

              <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center">
                {form.profileImage ? (
                  <img
                    src={form.profileImage}
                    alt="Profile preview"
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-200 text-2xl text-zinc-500">
                    <i className="bx bx-user"></i>
                  </div>
                )}

                <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white hover:bg-green-700">
                  <i className="bx bx-upload text-base"></i>
                  Choose photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {form.profileImageName && (
                  <span className="text-sm text-zinc-500">
                    {form.profileImageName}
                  </span>
                )}
              </div>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700">
              GitHub
              <input
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700">
              LinkedIn
              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-700 sm:col-span-2">
              Website
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-normal outline-none focus:border-green-500 focus:bg-white"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:bg-zinc-300"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
