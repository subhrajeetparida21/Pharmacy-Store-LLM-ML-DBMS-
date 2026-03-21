import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPhoto, setAdminPhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    // Load admin data from localStorage
    const loadAdminData = () => {
      const savedProfile = localStorage.getItem("adminProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setFullName(profile.fullName || "");
        setEmail(profile.email || "");
        setPhone(profile.phone || "");
        setAdminPhoto(profile.profilePhoto || null);
        if (profile.fullName) {
          setAdminName(profile.fullName.split(" ")[0]);
        }
        return;
      }

      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const u = JSON.parse(currentUser);
        setFullName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
        if (u.profilePhoto) {
          setAdminPhoto(u.profilePhoto);
        }
        if (u.name) {
          setAdminName(u.name.split(" ")[0]);
        }
      }
    };
    loadAdminData();
  }, []);

  const handleSaveProfile = () => {
    const profileData = {
      fullName,
      email,
      phone,
      profilePhoto: adminPhoto,
    };
    localStorage.setItem("adminProfile", JSON.stringify(profileData));
    setSavedMessage("✅ Profile saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">💊 Pharmacy</h2>

        <p className="section">PROFILE</p>
        <button className="active">My Profile</button>
        <button onClick={handleBack}>← Back</button>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h2>👤 User Profile</h2>
        </div>

        {/* Profile Card */}
        <div style={{ maxWidth: "600px", margin: "30px auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#0F4454", marginBottom: "20px" }}>Profile Information</h2>

          {savedMessage && <div style={{ background: "#dcfce7", color: "#166534", padding: "12px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>{savedMessage}</div>}

          {/* Profile Photo */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src={adminPhoto || "https://i.pravatar.cc/150"}
              alt="Profile"
              style={{ width: "120px", height: "120px", borderRadius: "50%", border: "3px solid #0ea5e9", objectFit: "cover" }}
            />
          </div>

          {/* Form Fields */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2d3748" }}>
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2d3748" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#2d3748" }}>
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={handleSaveProfile}
              style={{
                background: "#0ea5e9",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              💾 Save Profile
            </button>
            <button
              onClick={handleBack}
              style={{
                background: "#e2e8f0",
                color: "#2d3748",
                border: "none",
                padding: "12px 30px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
