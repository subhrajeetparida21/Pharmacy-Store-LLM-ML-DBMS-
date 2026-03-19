import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginModern from "./pages/LoginModern";
import SignupModern from "./pages/SignupModern";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

function AppContent() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", price: 20, stock: 5 }
  ]);

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState([]);

  const [deliveryPeople, setDeliveryPeople] = useState([
    { id: 1, name: "Ravi", orders: 0, phone: "9876543210" }
  ]);

  // Sync user across tabs
  useEffect(() => {
    const onStorage = () => {
      const u = localStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Ensure user updates instantly in same tab
  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  // Add to cart
  const addToCart = (m) => {
    const idx = cart.findIndex(item => item.id === m.id);
    let updated;

    if (idx !== -1) {
      updated = cart.map((item, i) =>
        i === idx ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
    } else {
      updated = [...cart, { ...m, qty: 1 }];
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Remove from cart
  const removeFromCart = (id) => {
    let updated = cart
      .map(item =>
        item.id === id
          ? { ...item, qty: (item.qty || 1) - 1 }
          : item
      )
      .filter(item => (item.qty || 1) > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Keep cart synced
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const location = useLocation();

  // ✅ FIXED NAVBAR LOGIC
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup");

  return (
    <>
     {user && !hideNavbar && (
  <Navbar user={user} setUser={setUser} cart={cart} />
)}

      <Routes>
        <Route path="/login" element={<Navigate to="/login/customer" replace />} />
        <Route path="/login/:role" element={<LoginModern />} />
        <Route path="/signup/:role" element={<SignupModern />} />
        <Route path="/" element={<Landing />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home cart={cart} addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute user={user}>
              <Inventory medicines={medicines} addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart
                cart={cart}
                setCart={setCart}
                medicines={medicines}
                setMedicines={setMedicines}
                setOrders={setOrders}
                deliveryPeople={deliveryPeople}
                setDeliveryPeople={setDeliveryPeople}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders orders={orders} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin">
              <AdminDashboard
                medicines={medicines}
                setMedicines={setMedicines}
                deliveryPeople={deliveryPeople}
                setDeliveryPeople={setDeliveryPeople}
                orders={orders}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}