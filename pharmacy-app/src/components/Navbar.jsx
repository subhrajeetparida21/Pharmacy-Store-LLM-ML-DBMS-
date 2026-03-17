import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav>
      <h2>PharmaUI</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/inventory">Medicine</Link>
        <Link to="/cart">Cart</Link>

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;