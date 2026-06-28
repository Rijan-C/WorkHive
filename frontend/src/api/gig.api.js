import axios from "axios";

const API = "http://localhost:5000/api/gigs"; 
// change this in production (env variable later)

// 🔥 Get all gigs (Home page feed)
export const fetchGigs = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching gigs:", error);
    throw error;
  }
};

// 🔍 Get single gig (Gig details page)
export const fetchGigById = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching gig:", error);
    throw error;
  }
};

// ➕ Create a gig (Freelancer dashboard)
export const createGig = async (gigData, token) => {
  try {
    const res = await axios.post(API, gigData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating gig:", error);
    throw error;
  }
};

// 🔍 Get current freelancer's gigs
export const fetchMyGigs = async (token) => {
  try {
    const res = await axios.get(`${API}/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching my gigs:", error);
    throw error;
  }
};

// ✏️ Update gig
export const updateGig = async (id, gigData, token) => {
  try {
    const res = await axios.put(`${API}/${id}`, gigData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating gig:", error);
    throw error;
  }
};

// ❌ Delete gig
export const deleteGig = async (id, token) => {
  try {
    const res = await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting gig:", error);
    throw error;
  }
};