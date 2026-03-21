import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function UltraDashboard({ setUser, deliveryPeople = [], setDeliveryPeople, orders = [], setOrders }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPhoto, setAdminPhoto] = useState(null);

  useEffect(() => {
    // Load delivery people from localStorage
    if (!deliveryPeople || deliveryPeople.length === 0) {
      const stored = localStorage.getItem("deliveryPeople");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && setDeliveryPeople) {
            setDeliveryPeople(parsed);
          }
        } catch (error) {
          console.error("Error loading delivery people:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Load orders from localStorage
    if (!orders || orders.length === 0) {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders);
          if (Array.isArray(parsed) && setOrders) {
            setOrders(parsed);
          }
        } catch (error) {
          console.error("Error loading orders:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (deliveryPeople && deliveryPeople.length > 0) {
      localStorage.setItem("deliveryPeople", JSON.stringify(deliveryPeople));
    }
  }, [deliveryPeople]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  useEffect(() => {
    // Load admin data from localStorage
    const loadAdminData = () => {
      try {
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
      } catch (error) {
        console.error("Error loading admin data:", error);
      }
    };
    
    loadAdminData();
  }, []);

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 700 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 900 },
    { month: "May", sales: 600 },
    { month: "Jun", sales: 1100 },
    { month: "Jul", sales: 800 },
    { month: "Aug", sales: 1200 },
    { month: "Sep", sales: 950 },
    { month: "Oct", sales: 1300 },
    { month: "Nov", sales: 1400 },
    { month: "Dec", sales: 1500 }
  ];

  const medicineData = [
    { name: "Paracetamol", qty: 240 },
    { name: "Vitamin C", qty: 180 },
    { name: "Ibuprofen", qty: 300 },
    { name: "Cough Syrup", qty: 150 },
    { name: "Antibiotic", qty: 220 },
    { name: "Insulin", qty: 90 },
    { name: "Pain Relief", qty: 260 }
  ];

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleDeliveryTeamClick = () => {
    navigate("/delivery-team");
  };

  return (
    <div className="wrapper">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">💊 Pharmacy</h2>

        <p className="section">MAIN MENU</p>
        <button className="active">Dashboard</button>
        <button>Products</button>
        <button>Categories</button>
        <button onClick={handleDeliveryTeamClick}>Delivery Team</button>

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

        {/* Topbar */}
        <div className="topbar">
          <input className="search" placeholder="Search..." />
        </div>

        {/* Delivery Team Stats */}
        <div style={{ marginBottom: "20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "20px", borderRadius: "12px", color: "white" }}>
          <h3 style={{ margin: "0 0 10px 0" }}>📦 Delivery Team Overview</h3>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Total Delivery Partners</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{deliveryPeople?.length || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Active Orders</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{(orders || []).filter(o => o.status?.toLowerCase() !== "delivered").length}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Completed Deliveries</div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{(deliveryPeople || []).reduce((sum, p) => sum + (p.orders || 0), 0)}</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card green">
            <p>Today's Sales</p>
            <h2>$12,450</h2>
          </div>

          <div className="card teal">
            <p>Available Categories</p>
            <h2>24</h2>
          </div>

          <div className="card pink">
            <p>Expired Medicines</p>
            <h2>3</h2>
          </div>

          <div className="card purple">
            <p>Active Deliveries</p>
            <h2>{(orders || []).filter(o => o.status === "Out for Delivery").length}</h2>
          </div>
        </div>

        {/* Graphs */}
        <div className="graph-section">
          {/* Monthly Sales Line Chart */}
          <div className="graph-card">
            <h3>Monthly Sales</h3>
            <div className="scroll-container">
              <div style={{ width: Math.max(salesData.length * 80, 400) }}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#00c49f" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Medicine Sales Bar Chart */}
          <div className="graph-card">
            <h3>Medicine Sales</h3>
            <div className="scroll-container">
              <div style={{ width: Math.max(medicineData.length * 100, 400) }}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={medicineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="qty" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="table-card">
          <h3>Recent Orders</h3>
          <div className="scroll-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Delivery Partner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(orders || []).slice(0, 5).map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.medicine}</td>
                    <td>{order.qty}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.deliveryPartner || "Unassigned"}</td>
                    <td>
                      <span className={`status-badge status-${order.status?.toLowerCase().replace(/\s/g, '-')}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}