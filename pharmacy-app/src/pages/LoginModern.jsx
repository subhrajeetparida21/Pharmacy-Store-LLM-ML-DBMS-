import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function LoginModern({ setUser }) {
  const { role } = useParams();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState("password");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!userId.trim()) {
      newErrors.userId = "Email or phone number is required";
    }
    
    if (loginMethod === "password" && !password) {
      newErrors.password = "Password is required";
    }
    
    if (loginMethod === "otp" && otp.length !== 6) {
      newErrors.otp = "Enter a valid 6-digit OTP";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", userId);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      const user = role === "admin"
        ? {
            role: "admin",
            id: userId,
            name: "Admin User",
            email: userId,
            isAdmin: true,
          }
        : {
            role: "customer",
            id: userId,
            name: userId.split("@")[0] || "Customer",
            email: userId,
          };
      
      localStorage.setItem("user", JSON.stringify(user));
      setUser?.(user);
      
      navigate(role === "admin" ? "/admin" : "/home");
      setIsLoading(false);
    }, 800);
  };
  
  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");
  };
  
  const handleSignUp = () => {
    // Navigate to signup with role parameter to maintain context
    navigate(`/signup/${role}`);
  };
  
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setUserId(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  
  // Styles
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "1rem",
      position: "relative",
      overflow: "hidden",
    },
    card: {
      background: "white",
      borderRadius: "24px",
      padding: "2rem",
      width: "100%",
      maxWidth: "440px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      position: "relative",
      zIndex: 2,
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    iconBox: {
      width: "64px",
      height: "64px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem auto",
      fontSize: "32px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1a202c",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#718096",
      fontSize: "14px",
    },
    formGroup: {
      marginBottom: "1.25rem",
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#4a5568",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      transition: "all 0.2s",
      outline: "none",
      boxSizing: "border-box",
    },
    inputError: {
      borderColor: "#f56565",
    },
    inputWrapper: {
      position: "relative",
    },
    errorText: {
      color: "#f56565",
      fontSize: "12px",
      marginTop: "0.5rem",
    },
    toggleGroup: {
      display: "flex",
      gap: "12px",
      marginBottom: "1.25rem",
      background: "#f7fafc",
      padding: "4px",
      borderRadius: "12px",
    },
    toggleButton: {
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      background: "transparent",
      color: "#4a5568",
    },
    toggleButtonActive: {
      background: "white",
      color: "#667eea",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    checkboxGroup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
    },
    checkboxInput: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
    checkboxLabel: {
      fontSize: "14px",
      color: "#4a5568",
    },
    forgotLink: {
      fontSize: "14px",
      color: "#667eea",
      textDecoration: "none",
    },
    loginButton: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      marginBottom: "1rem",
    },
    loginButtonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
    },
    signupButton: {
      width: "100%",
      padding: "12px",
      background: "transparent",
      color: "#667eea",
      border: "2px solid #667eea",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "0.5rem",
    },
    googleButton: {
      width: "100%",
      padding: "12px",
      background: "white",
      color: "#4a5568",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    googleLogo: {
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      textAlign: "center",
      margin: "1.5rem 0",
      position: "relative",
    },
    dividerLine: {
      borderTop: "1px solid #e2e8f0",
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
    },
    dividerText: {
      background: "white",
      display: "inline-block",
      padding: "0 1rem",
      color: "#a0aec0",
      fontSize: "12px",
      position: "relative",
      zIndex: 1,
    },
    footer: {
      textAlign: "center",
      marginTop: "1.5rem",
      fontSize: "12px",
      color: "#a0aec0",
    },
    footerLink: {
      color: "#667eea",
      textDecoration: "none",
    },
    hintText: {
      fontSize: "12px",
      color: "#a0aec0",
      marginTop: "0.5rem",
    },
    spinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255,255,255,0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      marginRight: "8px",
      verticalAlign: "middle",
    },
    actionButtons: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
  };
  
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          input:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          }
          button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .google-btn:hover {
            background: #f7fafc;
            border-color: #cbd5e0;
            transform: translateY(-2px);
          }
          .signup-btn:hover {
            background: #f3e8ff;
            transform: translateY(-2px);
          }
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconBox}>
            {role === "admin" ? "👨‍💼" : "👤"}
          </div>
          <h2 style={styles.title}>
            {role === "admin" ? "Admin Portal" : "Welcome Back"}
          </h2>
          <p style={styles.subtitle}>
            {role === "admin" 
              ? "Access the admin dashboard" 
              : "Sign in to your customer account"}
          </p>
        </div>
        
        <form onSubmit={handleSignIn}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email or Phone Number</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Enter your email or phone"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (errors.userId) setErrors({ ...errors, userId: "" });
                }}
                style={{
                  ...styles.input,
                  ...(errors.userId ? styles.inputError : {})
                }}
              />
            </div>
            {errors.userId && <div style={styles.errorText}>{errors.userId}</div>}
          </div>
          
          <div style={styles.toggleGroup}>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("password");
                setErrors({});
              }}
              style={{
                ...styles.toggleButton,
                ...(loginMethod === "password" ? styles.toggleButtonActive : {})
              }}
            >
              🔒 Password
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("otp");
                setErrors({});
              }}
              style={{
                ...styles.toggleButton,
                ...(loginMethod === "otp" ? styles.toggleButtonActive : {})
              }}
            >
              📱 OTP
            </button>
          </div>
          
          {loginMethod === "password" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {})
                  }}
                />
              </div>
              {errors.password && <div style={styles.errorText}>{errors.password}</div>}
            </div>
          )}
          
          {loginMethod === "otp" && (
            <div style={styles.formGroup}>
              <label style={styles.label}>One-Time Password</label>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setOtp(value);
                    if (errors.otp) setErrors({ ...errors, otp: "" });
                  }}
                  style={{
                    ...styles.input,
                    ...(errors.otp ? styles.inputError : {}),
                    fontFamily: "monospace",
                    fontSize: "18px",
                    letterSpacing: "2px",
                    textAlign: "center"
                  }}
                />
              </div>
              {errors.otp && <div style={styles.errorText}>{errors.otp}</div>}
              <div style={styles.hintText}>
                A 6-digit OTP will be sent to your registered mobile number
              </div>
            </div>
          )}
          
          <div style={styles.checkboxGroup}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkboxInput}
              />
              <span style={styles.checkboxLabel}>Remember me</span>
            </label>
            
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          
          <div style={styles.actionButtons}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.loginButton,
                ...(isLoading ? styles.loginButtonDisabled : {})
              }}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            
            {/* Sign Up Button - Only for customers, not for admin */}
            {role !== "admin" && (
              <button
                type="button"
                onClick={handleSignUp}
                style={styles.signupButton}
                className="signup-btn"
              >
                ✨ Create New Account
              </button>
            )}
          </div>
        </form>
        
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <div style={styles.dividerText}>Or continue with</div>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          style={styles.googleButton}
          className="google-btn"
        >
          <div style={styles.googleLogo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
          </div>
          Sign in with Google
        </button>
        
        <div style={styles.footer}>
          <span>By signing in, you agree to our </span>
          <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
          <span> and </span>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}