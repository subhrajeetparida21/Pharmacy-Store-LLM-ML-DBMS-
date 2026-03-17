import { useState } from "react";

function Login({ setUser }) {
  const [role, setRole] = useState("customer");
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) {
      alert("Enter name");
      return;
    }

    const userData = { name, role };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div className="login_container">
      <h2>Login</h2>

      <input
        className="search-bar"
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="search-bar"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;