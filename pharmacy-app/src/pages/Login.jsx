import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const login = () => {
    const user = { name, role };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    role === "admin" ? navigate("/admin") : navigate("/");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <select onChange={e=>setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={login}>Login</button>
    </div>
  );
}