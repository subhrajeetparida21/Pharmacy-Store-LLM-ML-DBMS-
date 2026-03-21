import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function LoginModern({ setUser }) {
  const { role } = useParams();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("password");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // UI only: No real authentication
    if (role === "admin") {
      const user = { role: "admin", id: userId };
      localStorage.setItem("user", JSON.stringify(user));
      setUser?.(user);
      navigate("/admin");
    } else {
      const user = { role: "customer", id: userId };
      localStorage.setItem("user", JSON.stringify(user));
      setUser?.(user);
      navigate("/home");
    }
  };

  return (
    <div style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7fa"}}>
      <div style={{background: "#f7fafd", borderRadius: 24, boxShadow: "0 8px 32px #0001", padding: 40, width: 350, maxWidth: "90vw"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24}}>
          <div style={{background: "#fff", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px #0001", marginBottom: 12}}>
            <span style={{fontSize: 32, color: "#b0b8c1"}}>&#128100;</span>
          </div>
          <h2 style={{margin: 0, color: "#2d3748"}}>Welcome back</h2>
          <div style={{color: "#7b8794", fontSize: 14, marginBottom: 8}}>Please sign in to continue</div>
        </div>
        <form onSubmit={handleSignIn}>
          <div style={{marginBottom: 18}}>
            <input
              type="text"
              placeholder="Email address or Mobile number"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15, marginBottom: 8}}
              required
            />
          </div>
          <div style={{marginBottom: 18}}>
            <div style={{display: "flex", gap: 8, marginBottom: 8}}>
              <button type="button" style={{flex: 1, background: loginMethod==="password"?"#e2e8f0":"#fff", border: "none", borderRadius: 8, padding: 8, fontWeight: 600, color: loginMethod==="password"?"#2d3748":"#7b8794"}} onClick={()=>setLoginMethod("password")}>Password</button>
              <button type="button" style={{flex: 1, background: loginMethod==="otp"?"#e2e8f0":"#fff", border: "none", borderRadius: 8, padding: 8, fontWeight: 600, color: loginMethod==="otp"?"#2d3748":"#7b8794"}} onClick={()=>setLoginMethod("otp")}>OTP</button>
            </div>
            {loginMethod === "password" ? (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15}}
                required
              />
            ) : (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={{width: "100%", padding: 12, borderRadius: 12, border: "1px solid #e2e8f0", background: "#f1f5f9", fontSize: 15}}
                required
              />
            )}
          </div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18}}>
            <label style={{fontSize: 14, color: "#7b8794"}}>
              <input type="checkbox" style={{marginRight: 6}} /> Remember me
            </label>
            <Link
              to="/forgot-password"
              onClick={(e) => {
                if (!userId) {
                  e.preventDefault();
                  alert("Please enter Email or Mobile first");
                } else {
                  navigate(`/forgot-password?userId=${userId}`);
                }
              }}
              style={{ fontSize: 14, color: "#7b8794", textDecoration: "underline" }}
            >
              Forgot password?
            </Link>
          </div>
          <button type="submit" style={{width: "100%", padding: 16, borderRadius: 16, background: "#e0e5ec", color: "#2d3748", fontWeight: 700, fontSize: 17, border: "none", boxShadow: "4px 4px 16px #d1d9e6, -4px -4px 16px #fff", marginBottom: 18, transition: 'box-shadow 0.2s'}}>Sign In</button>
        </form>
        <div style={{textAlign: "center", color: "#b0b8c1", fontSize: 13, margin: "16px 0 8px"}}>
          OR CONTINUE WITH
        </div>
        <div style={{display: "flex", justifyContent: "center", gap: 16, marginBottom: 16}}>
          <button style={{background: "#f7fafd", border: "none", borderRadius: 16, boxShadow: "4px 4px 16px #d1d9e6, -4px -4px 16px #fff", padding: 10, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", transition: 'box-shadow 0.2s', cursor: 'pointer'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{width: 28}} />
          </button>
        </div>
        <div style={{textAlign: "center", fontSize: 14, color: "#7b8794"}}>
          Don't have an account? <Link to={role === "admin" ? "/signup/admin" : "/signup/customer"} style={{color: "#2d3748", fontWeight: 600}}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
