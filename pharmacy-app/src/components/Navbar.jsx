import { Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav>
      <h2>PharmaCare</h2>
      <div>
        {user && <Link to="/">Home</Link>}
        {user && <Link to="/inventory">Shop</Link>}
        {user && <Link to="/cart">Cart</Link>}
        {user && <Link to="/orders">Orders</Link>}
        {user?.role==="admin" && <Link to="/admin">Admin</Link>}
        {!user ? <Link to="/login">Login</Link> :
          <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}