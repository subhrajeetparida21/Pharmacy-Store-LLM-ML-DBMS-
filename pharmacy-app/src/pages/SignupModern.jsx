import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function SignupModern() {
  const { role } = useParams();
  const navigate = useNavigate();
  // Customer: name, email, mobile, password
  // Admin: name, email, mobile, password, business name, business address, verification doc
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    businessName: "",
    businessAddress: "",
    verification: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = e => {
    e.preventDefault();
    // UI only: No real signup
    if (role === "admin") navigate("/login/admin");
    else navigate("/login/customer");
  };

  return (
    <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7fa"}}>
      <div style={{background: "#f7fafd", borderRadius: 24, boxShadow: "0 8px 32px #0001", padding: 40, width: 400, maxWidth: "95vw"}}>
        <h2 style={{textAlign: "center", color: "#2d3748", marginBottom: 8}}>{role === "admin" ? "Admin Sign Up" : "Customer Sign Up"}</h2>
        <form onSubmit={handleSignup}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
          <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
          {role === "admin" && (
            <>
              <input name="businessName" placeholder="Business Name" value={form.businessName} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
              <input name="businessAddress" placeholder="Business Address" value={form.businessAddress} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
              <input name="verification" placeholder="Verification Document URL" value={form.verification} onChange={handleChange} required style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 12}} />
            </>
          )}
          <button type="submit" style={{width: "100%", padding: 14, borderRadius: 12, background: "#e2e8f0", color: "#2d3748", fontWeight: 700, fontSize: 16, border: "none", boxShadow: "0 2px 8px #0001", marginBottom: 16}}>Sign Up</button>
        </form>
        <div style={{textAlign: "center", fontSize: 14, color: "#7b8794"}}>
          Already have an account? <Link to={role === "admin" ? "/login/admin" : "/login/customer"} style={{color: "#2d3748", fontWeight: 600}}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
