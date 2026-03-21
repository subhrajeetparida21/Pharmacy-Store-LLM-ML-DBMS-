import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function DeliveryTeam({ deliveryPeople = [], setDeliveryPeople, orders = [], setOrders }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPhoto, setAdminPhoto] = useState(null);
  const [newDeliveryName, setNewDeliveryName] = useState("");
  const [newDeliveryPhone, setNewDeliveryPhone] = useState("");
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);

  useEffect(() => {
    // Load admin data from localStorage
    const loadAdminData = () => {
      const savedProfile = localStorage.getItem("adminProfile");
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.fullName && profile.fullName.trim() !== "") {
          setAdminName(profile.fullName.split(' ')[0]);
        }
        if (profile.profilePhoto) {
          setAdminPhoto(profile.profilePhoto);
          return;
        }
      }
      
      const currentUser = localStorage.getItem("user");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.name && user.name.trim() !== "") {
          setAdminName(user.name.split(' ')[0]);
        }
        if (user.profilePhoto) {
          setAdminPhoto(user.profilePhoto);
        }
      }
    };
    
    loadAdminData();
  }, []);

  const handleAddDeliveryPerson = () => {
    if (!newDeliveryName.trim() || !newDeliveryPhone.trim()) return;
    const newPerson = {
      id: Date.now(),
      name: newDeliveryName.trim(),
      orders: 0,
      phone: newDeliveryPhone.trim()
    };
    setDeliveryPeople?.(prev => [...(prev || []), newPerson]);
    setNewDeliveryName("");
    setNewDeliveryPhone("");
  };

  const handleDeleteDeliveryPerson = (id) => {
    if (window.confirm("Are you sure you want to remove this delivery person?")) {
      setDeliveryPeople?.(prev => prev.filter(person => person.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  // Get orders assigned to a specific delivery person
  const getOrdersForDeliveryPerson = (personName) => {
    return (orders || []).filter(order => order.deliveryPartner === personName);
  };

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">💊 Pharmacy</h2>

        <p className="section">MAIN MENU</p>
        <button onClick={handleDashboardClick}>Dashboard</button>
        <button>Products</button>
        <button>Categories</button>
        <button className="active">Delivery Team</button>

        <p className="section">LEADS</p>
        <button>Orders</button>
        <button>Sales</button>
        <button>Customers</button>

        <p className="section">COMMS</p>
        <button>Payments</button>
        <button>Reports</button>
        <button>Settings</button>

        <div className="profile-card">
          <p>Complete Profile</p>
          <button onClick={handleProfileClick}>Verify Identity</button>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        {/* Fixed Admin Logo with Profile Photo */}
        <div className="fixed-admin">
          {adminPhoto ? (
            <img 
              src={adminPhoto} 
              alt="Admin" 
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
            />
          ) : (
            <img src="https://i.pravatar.cc/40" alt="Admin" />
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Topbar */}
        <div className="topbar">
          <input className="search" placeholder="Search delivery team..." />
        </div>

        {/* Welcome message */}
        <h1 className="welcome">Delivery Team Management</h1>

        {/* Delivery Team Management */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: "20px" }}>
          <h3 style={{ marginTop: 0, color: "#0F4454" }}>➕ Add New Delivery Partner</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
            <input
              value={newDeliveryName}
              onChange={(e) => setNewDeliveryName(e.target.value)}
              placeholder="Delivery Person Name"
              style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <input
              value={newDeliveryPhone}
              onChange={(e) => setNewDeliveryPhone(e.target.value)}
              placeholder="Phone Number"
              style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <button
              onClick={handleAddDeliveryPerson}
              style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer" }}
            >
              Add Delivery Person
            </button>
          </div>
        </div>

        {/* Current Delivery Team with Orders */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <h3 style={{ marginTop: 0, color: "#0F4454" }}>👥 Delivery Team ({deliveryPeople?.length || 0})</h3>
          {deliveryPeople?.length === 0 ? (
            <p style={{ color: "#64748b", textAlign: "center", padding: "40px" }}>No delivery team members added yet. Add your first delivery person above!</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {deliveryPeople.map(person => {
                const assignedOrders = getOrdersForDeliveryPerson(person.name);
                const activeOrders = assignedOrders.filter(o => o.status?.toLowerCase() !== "delivered");
                
                return (
                  <div key={person.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                    <div style={{ padding: "16px", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "1.1rem", marginBottom: "5px" }}>{person.name}</div>
                        <div style={{ fontSize: "0.9rem", color: "#64748b" }}>📞 {person.phone}</div>
                        <div style={{ fontSize: "0.9rem", color: "#0f5132", fontWeight: "500" }}>
                          ✅ Completed Deliveries: {person.orders || 0}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#e67e22", fontWeight: "500" }}>
                          🚚 Active Orders: {activeOrders.length}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDeliveryPerson(person.id)}
                        style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "0.85rem" }}
                      >
                        Remove
                      </button>
                    </div>
                    
                    {/* Show assigned orders for this delivery person */}
                    {assignedOrders.length > 0 && (
                      <div style={{ padding: "16px", background: "#fff" }}>
                        <h4 style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#334155" }}>📋 Current Orders:</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {assignedOrders.map(order => (
                            <div key={order.id} style={{ padding: "10px", background: "#f1f5f9", borderRadius: "8px", fontSize: "0.85rem" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                  <strong>Order #{order.id}</strong> - {order.customerName}
                                  <br />
                                  <span style={{ color: "#64748b" }}>{order.medicine} x{order.qty} - ${order.totalPrice}</span>
                                </div>
                                <span className={`status-badge status-${order.status?.toLowerCase().replace(/\s/g, '-')}`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}