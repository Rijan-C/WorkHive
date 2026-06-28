import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createGig as createGigApi } from "../../api/gig.api";

const STORAGE_KEY = "createGigFormData";

const emptyForm = {
    title: "",
    category: "",
    description: "",
    packageTitle: "",
    price: "",
    deliveryTime: "",
    shortDescription: "",
    tags: "",
};

export default function createGig() {
    const navigate = useNavigate();
    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : emptyForm;
    });
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to create a gig.");
            navigate("/login");
            return;
        }

        const gigData = new FormData();
        gigData.append("title", form.title);
        gigData.append("category", form.category);
        gigData.append("description", form.description);
        gigData.append(
            "packages",
            JSON.stringify([
                {
                    title: form.packageTitle,
                    price: Number(form.price),
                    deliveryTime: Number(form.deliveryTime),
                    shortDescription: form.shortDescription,
                    features: [],
                },
            ]),
        );
        gigData.append("tags", form.tags);

        files.forEach((file) => gigData.append("images", file));

        try {
            setLoading(true);
            await createGigApi(gigData, token);
            localStorage.removeItem(STORAGE_KEY);
            setForm(emptyForm);
            setFiles([]);
            alert("Gig created successfully!");
            navigate("/freelancer/dashboard", { state: { refreshMyGigs: true } });
        } catch (err) {
            setError("Failed to create gig.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f6f2] text-zinc-900 p-8">
            <div className="max-w-3xl mx-auto bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-green-600">
                            Freelancer
                        </p>
                        <h1 className="text-3xl font-bold mt-1">Create New Gig</h1>
                        <p className="text-sm text-zinc-500 mt-1">
                            Add your service details so clients can find and order from you.
                        </p>
                    </div>

                    <Link
                        to="/freelancer/dashboard"
                        className="text-sm font-semibold text-zinc-500 hover:text-green-700"
                    >
                        Back
                    </Link>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Gig Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder="I will build a responsive React website"
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Category</label>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            placeholder="Web Development"
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="Describe what you offer, your process, and what clients will receive."
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Package Name</label>
                            <input
                                name="packageTitle"
                                value={form.packageTitle}
                                onChange={handleChange}
                                required
                                placeholder="Basic"
                                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Price</label>
                            <input
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                                required
                                placeholder="5000"
                                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Delivery Days</label>
                            <input
                                name="deliveryTime"
                                type="number"
                                value={form.deliveryTime}
                                onChange={handleChange}
                                required
                                placeholder="7"
                                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Package Short Description
                        </label>
                        <input
                            name="shortDescription"
                            value={form.shortDescription}
                            onChange={handleChange}
                            required
                            placeholder="A clean responsive website with basic pages"
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Tags</label>
                        <input
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="react, frontend, website"
                            className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Images</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                            className="w-full rounded-xl border border-zinc-200 px-4 py-2 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-white file:font-semibold"
                        />
                        {files.length > 0 && (
                            <p className="mt-2 text-xs text-zinc-500">
                                Selected images: {files.map((file) => file.name).join(", ")}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-zinc-950 hover:bg-green-700 text-white font-bold py-3 transition disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Gig"}
                    </button>
                </form>
            </div>
        </div>
    );
}