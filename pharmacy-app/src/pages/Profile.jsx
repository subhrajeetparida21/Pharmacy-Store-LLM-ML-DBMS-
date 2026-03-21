import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const checkUserType = () => {
      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const u = JSON.parse(currentUser);
        const adminStatus = u?.isAdmin === true || u?.role === "admin";
        setIsAdmin(adminStatus);
        return adminStatus;
      }
      return false;
    };

    const adminStatus = checkUserType();
    
    // Load profile data based on user type
    const loadProfileData = () => {
      if (adminStatus) {
        // Load ADMIN data from adminProfile
        const savedProfile = localStorage.getItem("adminProfile");
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setFullName(profile.fullName || "");
          setEmail(profile.email || "");
          setPhone(profile.phone || "");
          setProfilePhoto(profile.profilePhoto || null);
          setPhotoPreview(profile.profilePhoto || null);
          if (profile.fullName) {
            setAdminName(profile.fullName.split(" ")[0]);
          }
          console.log("Loaded ADMIN profile data");
          return;
        }
      } else {
        // Load CUSTOMER data from customerProfile
        const savedProfile = localStorage.getItem("customerProfile");
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setFullName(profile.fullName || "");
          setEmail(profile.email || "");
          setPhone(profile.phone || "");
          setProfilePhoto(profile.profilePhoto || null);
          setPhotoPreview(profile.profilePhoto || null);
          if (profile.fullName) {
            setAdminName(profile.fullName.split(" ")[0]);
          }
          console.log("Loaded CUSTOMER profile data");
          return;
        }
      }

      // Fallback to user data
      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const u = JSON.parse(currentUser);
        setFullName(u.name || "");
        setEmail(u.email || "");
        setPhone(u.phone || "");
        if (u.profilePhoto) {
          setProfilePhoto(u.profilePhoto);
          setPhotoPreview(u.profilePhoto);
        }
        if (u.name) {
          setAdminName(u.name.split(" ")[0]);
        }
        console.log("Loaded fallback user data");
      }
    };
    
    loadProfileData();
    
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (adminStatus && e.key === "adminProfile") {
        loadProfileData();
      } else if (!adminStatus && e.key === "customerProfile") {
        loadProfileData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Please upload an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
        setPhotoPreview(base64String);
        
        // Immediately save the photo to appropriate storage
        if (isAdmin) {
          localStorage.setItem("currentAdminPhoto", base64String);
          console.log("Saved admin photo to currentAdminPhoto");
        } else {
          localStorage.setItem("currentCustomerPhoto", base64String);
          console.log("Saved customer photo to currentCustomerPhoto");
        }
        
        // Update navbar logo in real-time
        const updateNavbarLogo = () => {
          const navbarLogo = document.querySelector('.navbar-logo img, .logo img, .user-avatar img, .sidebar-logo-img');
          if (navbarLogo) {
            navbarLogo.src = base64String;
          }
          
          // Also update any user avatar elements
          const userAvatars = document.querySelectorAll('.user-avatar, .profile-image, .topbar-avatar');
          userAvatars.forEach(avatar => {
            if (avatar.tagName === 'IMG') {
              avatar.src = base64String;
            } else if (avatar.style.backgroundImage) {
              avatar.style.backgroundImage = `url(${base64String})`;
            }
          });
        };
        
        setTimeout(updateNavbarLogo, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const profileData = {
      fullName,
      email,
      phone,
      profilePhoto: profilePhoto,
      lastUpdated: new Date().toISOString()
    };
    
    // Save to appropriate storage based on user type
    if (isAdmin) {
      // Save to ADMIN storage
      localStorage.setItem("adminProfile", JSON.stringify(profileData));
      if (profilePhoto) {
        localStorage.setItem("currentAdminPhoto", profilePhoto);
      }
      console.log("Saved to ADMIN profile:", profileData);
    } else {
      // Save to CUSTOMER storage
      localStorage.setItem("customerProfile", JSON.stringify(profileData));
      if (profilePhoto) {
        localStorage.setItem("currentCustomerPhoto", profilePhoto);
      }
      console.log("Saved to CUSTOMER profile:", profileData);
    }
    
    // Update the user object in localStorage
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      userData.name = fullName;
      userData.email = email;
      userData.phone = phone;
      userData.profilePhoto = profilePhoto;
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Updated user object:", userData);
      
      // Update parent component state if setUser is provided
      if (setUser) {
        setUser(userData);
      }
    }
    
    // Update admin name for sidebar display
    if (fullName) {
      setAdminName(fullName.split(" ")[0]);
    }
    
    setSavedMessage(`✅ ${isAdmin ? "Admin" : "Customer"} profile saved successfully!`);
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Get the display photo from appropriate source
  const getDisplayPhoto = () => {
    if (isAdmin) {
      return profilePhoto || localStorage.getItem("currentAdminPhoto") || "https://i.pravatar.cc/150?img=7";
    } else {
      return profilePhoto || localStorage.getItem("currentCustomerPhoto") || "https://i.pravatar.cc/150?img=8";
    }
  };

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header" style={{ textAlign: "center", marginBottom: "20px" }}>
          <div className="navbar-logo" style={{ marginBottom: "10px" }}>
            <img 
              src={getDisplayPhoto()} 
              alt="Logo" 
              className="sidebar-logo-img"
              style={{ 
                width: "50px", 
                height: "50px", 
                borderRadius: "50%", 
                objectFit: "cover",
                marginBottom: "10px"
              }} 
            />
          </div>
          <h2 className="logo">💊 Pharmacy</h2>
          {adminName && (
            <p style={{ color: "#fff", marginTop: "10px", fontSize: "14px" }}>
              Welcome, {adminName}!
            </p>
          )}
        </div>

        <p className="section">PROFILE</p>
        <button className="active">My Profile</button>
        <button onClick={handleBack}>← Back</button>
      </div>

      {/* Main */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <h2>👤 {isAdmin ? "Admin Profile" : "Customer Profile"}</h2>
          <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img 
              src={getDisplayPhoto()} 
              alt="User Avatar" 
              className="topbar-avatar"
              style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
                objectFit: "cover",
                border: "2px solid #0ea5e9"
              }} 
            />
            <span style={{ fontWeight: "500" }}>{adminName || (isAdmin ? "Admin" : "Customer")}</span>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{ maxWidth: "600px", margin: "30px auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#0F4454", marginBottom: "20px" }}>
            {isAdmin ? "Admin Profile Information" : "Customer Profile Information"}
          </h2>

          {savedMessage && (
            <div style={{ background: "#dcfce7", color: "#166534", padding: "12px", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
              {savedMessage}
            </div>
          )}

          {/* Profile Photo Upload */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={photoPreview || getDisplayPhoto()}
                alt="Profile"
                style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  border: "3px solid #0ea5e9", 
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onClick={() => document.getElementById('photoUpload').click()}
              />
              <button
                onClick={() => document.getElementById('photoUpload').click()}
                style={{
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  background: "#0ea5e9",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px"
                }}
              >
                📷
              </button>
            </div>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
            <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
              Click the camera icon to upload a photo
            </p>
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
              onMouseEnter={(e) => e.target.style.background = "#0c9bdf"}
              onMouseLeave={(e) => e.target.style.background = "#0ea5e9"}
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
              onMouseEnter={(e) => e.target.style.background = "#cbd5e0"}
              onMouseLeave={(e) => e.target.style.background = "#e2e8f0"}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}