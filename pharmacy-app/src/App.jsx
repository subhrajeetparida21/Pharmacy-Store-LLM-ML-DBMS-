import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const addToCart = (med) => {
    if (med.stock <= 0) {
      alert("Out of stock!");
      return;
    }

    setCart([...cart, med]);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>

        <Route path="/Login" element={<Login setUser={setUser} />} />

        <Route path="/" element={
          <ProtectedRoute user={user}>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/Inventory" element={
          <ProtectedRoute user={user}>
            <Inventory addToCart={addToCart} />
          </ProtectedRoute>
        } />

        <Route path="/Cart" element={
          <ProtectedRoute user={user}>
            <Cart cart={cart} />
          </ProtectedRoute>
        } />

        <Route path="/AdminDashboard" element={
          <ProtectedRoute user={user} role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;