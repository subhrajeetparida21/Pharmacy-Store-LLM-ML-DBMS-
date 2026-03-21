import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ user, setUser, cart = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [adminName, setAdminName] = useState("");

  const logout = () => {
    // Don't clear adminProfile or persistedProfilePhoto
    // Only clear session-related data
    localStorage.removeItem("user");
    setUser(null);

    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load profile photo and admin name from localStorage
  useEffect(() => {
    const loadProfileData = () => {
      // Load profile photo
      let photo = null;
      
      // First check if user object has profilePhoto
      if (user?.profilePhoto) {
        photo = user.profilePhoto;
      }
      
      // Then check adminProfile
      if (!photo) {
        const adminProfile = localStorage.getItem("adminProfile");
        if (adminProfile) {
          const profile = JSON.parse(adminProfile);
          photo = profile.profilePhoto;
          // Also get admin name
          if (profile.fullName) {
            setAdminName(profile.fullName.split(" ")[0]);
          }
        }
      }
      
      // Finally check persistedProfilePhoto
      if (!photo) {
        photo = localStorage.getItem("persistedProfilePhoto");
      }
      
      setProfilePhoto(photo);
      
      // Load admin name from user object if not already set
      if (!adminName && user?.name) {
        setAdminName(user.name.split(" ")[0]);
      }
    };
    
    loadProfileData();
    
    // Listen for storage changes (when profile is updated)
    const handleStorageChange = (e) => {
      if (e.key === "adminProfile" || e.key === "persistedProfilePhoto" || e.key === "user") {
        loadProfileData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, adminName]);

  // Navigate to admin dashboard
  const goToAdminDashboard = () => {
    navigate('/admin');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  // ✅ Total items count (only for regular users)
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  // Check if user is admin
  const isAdmin = user?.isAdmin === true || user?.role === "admin";

  // Get the profile photo to display
  const displayPhoto = profilePhoto || user?.profilePhoto || localStorage.getItem("persistedProfilePhoto") || "https://i.pravatar.cc/150";
  
  // Get the welcome name
  const welcomeName = adminName || (user?.name ? user.name.split(" ")[0] : "User");

  return (
    <>
      <style>{`
        .nav-item {
          text-decoration: none;
          color: #2d3748;
          font-weight: 600;
          position: relative;
          padding: 8px 14px;
          transition: 0.3s;
          white-space: nowrap;
          min-height: 40px;
          display: flex;
          align-items: center;
          border-radius: 6px;
          font-size: 15px;
        }

        .nav-item:hover {
          color: #0ea5e9;
          background: rgba(14, 165, 233, 0.08);
        }

        .nav-item.active {
          color: #0ea5e9;
          background: rgba(14, 165, 233, 0.12);
          font-weight: 700;
        }

        .cart-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cart-badge {
          position: absolute;
          top: -10px;
          right: -12px;
          background: #ef4444;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 3px 6px;
          border-radius: 50%;
          min-width: 18px;
          text-align: center;
          animation: pop 0.3s ease;
        }

        @keyframes pop {
          0% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        .admin-badge {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          display: inline-block;
          transition: all 0.2s ease;
        }

        .admin-badge.clickable:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 50%;
          min-width: 16px;
          text-align: center;
        }

        .nav-icon {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .nav-dropdown {
          position: relative;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          min-width: 220px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          border-radius: 8px;
          z-index: 1100;
          margin-top: 8px;
        }

        .dropdown-content.open {
          display: block;
        }

        .nav-dropdown:hover .dropdown-content {
          display: block;
        }

        .dropdown-content a {
          padding: 12px 16px;
          display: block;
          text-decoration: none;
          color: #2d3748;
          font-weight: 500;
          transition: 0.2s;
        }

        .dropdown-content a:first-child {
          border-radius: 8px 8px 0 0;
        }

        .dropdown-content a:last-child {
          border-radius: 0 0 8px 8px;
        }

        .dropdown-content a:hover {
          background: #f0f4f8;
          color: #0ea5e9;
        }

        .separator {
          width: 1px;
          height: 30px;
          background: #e2e8f0;
          margin: 0 8px;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-right: 75px;
        }

        .profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 5px 12px;
          border-radius: 40px;
          transition: all 0.2s ease;
          background: rgba(14, 165, 233, 0.05);
        }

        .profile-section:hover {
          background: rgba(14, 165, 233, 0.1);
          transform: translateY(-1px);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #0ea5e9;
          transition: 0.2s;
        }

        .profile-info {
          text-align: right;
        }

        .welcome-text {
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          margin: 0;
          line-height: 1.2;
        }

        .user-name {
          font-size: 16px;
          font-weight: 700;
          color: #0F4454;
          margin: 0;
          line-height: 1.3;
        }

        .user-role {
          font-size: 11px;
          color: #0ea5e9;
          margin: 0;
          font-weight: 500;
        }

        .logout-btn-nav {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
          font-size: 14px;
        }

        .logout-btn-nav:hover {
          background: #dc2626;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .logo-icon {
          font-size: 28px;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(135deg, #0F4454 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .left-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @keyframes photoUpdate {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .profile-avatar-updated {
          animation: photoUpdate 0.3s ease;
        }
      `}</style>

      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 2.5rem",
        background: "#f7fafd",
        boxShadow: "0 2px 12px rgba(224, 229, 236, 0.8)",
        minHeight: "60px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%"
      }}>
        {/* Left Section - Logo and Admin Badge */}
        <div className="left-section">
          <div className="logo-section">
            <span className="logo-icon">💊</span>
            <h2 className="logo-text">PharmaCare</h2>
          </div>
          
          {/* Admin Badge - Now on left side after logo */}
          {isAdmin && (
            <>
              <div className="separator"></div>
              <span
                className="admin-badge clickable"
                onClick={goToAdminDashboard}
                style={{ cursor: "pointer" }}
                title="Click to go to Admin Dashboard"
              >
                👑 Admin Panel
              </span>
            </>
          )}
        </div>

        {/* Center Section - Navigation Items */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isAdmin && (
            <>
              {/* Analytics */}
              <NavLink to="/admin/analytics" className={({ isActive }) => `nav-item nav-icon ${isActive ? 'active' : ''}`}>
                <span>📊</span>
                <span>Analytics</span>
              </NavLink>

              {/* Alerts */}
              <NavLink to="/admin/alerts" className={({ isActive }) => `nav-item nav-icon ${isActive ? 'active' : ''}`}>
                <span style={{ position: "relative" }}>
                  🔔
                  <span className="notification-badge">3</span>
                </span>
                <span>Alerts</span>
              </NavLink>

              {/* AI Recommendations */}
              <NavLink to="/admin/ai-recommendations" className={({ isActive }) => `nav-item nav-icon ${isActive ? 'active' : ''}`}>
                <span>🤖</span>
                <span>AI Insights</span>
              </NavLink>

              {/* Order from Seller */}
              <NavLink to="/admin/order-from-seller" className={({ isActive }) => `nav-item nav-icon ${isActive ? 'active' : ''}`}>
                <span>📦</span>
                <span>Order from Seller</span>
              </NavLink>

              {/* Quick Actions Dropdown */}
              <div className="nav-dropdown" ref={dropdownRef}>
                <div
                  className="nav-item nav-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>⚡</span>
                  <span>Quick Actions</span>
                  <span style={{ marginLeft: "4px" }}>{dropdownOpen ? '▴' : '▾'}</span>
                </div>
                <div className={`dropdown-content ${dropdownOpen ? 'open' : ''}`}>
                  <NavLink to="/admin/restock" onClick={() => setDropdownOpen(false)}>🔄 Restock Low Items</NavLink>
                  <NavLink to="/admin/bulk-discount" onClick={() => setDropdownOpen(false)}>🏷️ Apply Bulk Discount</NavLink>
                  <NavLink to="/admin/emergency-order" onClick={() => setDropdownOpen(false)}>🚨 Emergency Order</NavLink>
                  <NavLink to="/admin/generate-report" onClick={() => setDropdownOpen(false)}>📄 Generate Report</NavLink>
                </div>
              </div>
            </>
          )}

          {!isAdmin && (
            <>
              <NavLink to="/home" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <span>🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink to="/inventory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <span>🛍️</span>
                <span>Shop</span>
              </NavLink>

              <NavLink to="/cart" className={({ isActive }) => `nav-item cart-link ${isActive ? 'active' : ''}`}>
                <span style={{ position: "relative" }}>
                  🛒
                  {totalItems > 0 && (
                    <span key={totalItems} className="cart-badge">
                      {totalItems}
                    </span>
                  )}
                </span>
                <span>Cart</span>
              </NavLink>

              <NavLink to="/orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <span>📋</span>
                <span>Orders</span>
              </NavLink>
            </>
          )}
        </div>

        {/* Right Section - Profile and Logout */}
        <div className="right-section">
          {/* Profile Section */}
          <div className="profile-section" onClick={() => navigate("/profile")}>
            <div className="profile-info">
              <p className="welcome-text">Welcome,</p>
              <p className="user-name">{welcomeName}</p>
              <p className="user-role">{isAdmin ? "Administrator" : "Customer"}</p>
            </div>
            <img
              src={displayPhoto}
              alt="Profile"
              className="profile-avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.pravatar.cc/150";
              }}
            />
          </div>
          
          <button onClick={logout} className="logout-btn-nav">
            Logout
          </button>
        </div>
      </nav>

      <style>{`
        body {
          padding-top: 70px;
        }
      `}</style>
    </>
  );
}