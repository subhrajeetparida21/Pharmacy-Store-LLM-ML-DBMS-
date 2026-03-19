import { NavLink } from "react-router-dom";

export default function Navbar({ user, setUser, cart = [] }) {
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) return null;

  // ✅ Total items count
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  return (
    <>
      <style>{`
        .nav-item {
          text-decoration: none;
          color: #2d3748;
          font-weight: 600;
          position: relative;
          padding: 5px;
          transition: 0.3s;
        }

        .nav-item:hover {
          color: #0ea5e9;
        }

        .nav-item.active {
          color: #0ea5e9;
        }

        .cart-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -10px;
          background: red;
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

        .logout-btn {
          margin-left: 18px;
          background: #e0e5ec;
          border: none;
          border-radius: 8px;
          padding: 7px 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #d1d9e6;
        }
      `}</style>

      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2.5rem",
        background: "#f7fafd",
        boxShadow: "0 2px 12px #e0e5ec"
      }}>
        <h2 style={{ color: "#0F4454" }}>PharmaCare</h2>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <NavLink to="/home" className="nav-item">Home</NavLink>
          <NavLink to="/inventory" className="nav-item">Shop</NavLink>

          {/* ✅ CART WITH NUMBER */}
          <NavLink to="/cart" className="nav-item cart-link">
            🛒 Cart
            {totalItems > 0 && (
              <span key={totalItems} className="cart-badge">
                {totalItems}
              </span>
            )}
          </NavLink>

          <NavLink to="/orders" className="nav-item">Orders</NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className="nav-item">Admin</NavLink>
          )}

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}