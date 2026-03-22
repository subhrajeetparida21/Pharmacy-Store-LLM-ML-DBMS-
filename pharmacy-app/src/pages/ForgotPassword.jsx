import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialUserId = queryParams.get("userId") || "";

  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(initialUserId);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ⏳ AUTO CLEAR MESSAGE
  useEffect(() => {
    if (message || error) {
      const t = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [message, error]);

  // ⏳ TIMER COUNTDOWN
  useEffect(() => {
    if (step !== 2) return;

    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // 💪 PASSWORD STRENGTH
  const getStrength = () => {
    if (newPassword.length < 6) return "Weak";
    if (
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword) &&
      /[^A-Za-z0-9]/.test(newPassword)
    ) {
      return "Strong";
    }
    return "Medium";
  };

  // 📩 SEND OTP
  const sendOtp = () => {
    setError("");
    setMessage("");

    if (!userId) {
      setError("Please enter Email or Mobile number");
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);

    console.log("OTP:", newOtp); // 🔥 remove in production

    setMessage("OTP sent successfully");
    setStep(2);
    setTimer(30);
    setCanResend(false);
  };

  // 🔁 RESEND OTP
  const resendOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);

    console.log("New OTP:", newOtp);

    setMessage("OTP resent successfully");
    setTimer(30);
    setCanResend(false);
  };

  // 🔐 VERIFY OTP
  const verifyOtp = () => {
    setError("");

    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

    setMessage("OTP verified");
    setStep(3);
  };

  // 🔁 RESET PASSWORD
  const resetPassword = () => {
    setError("");
    setMessage("");

    if (getStrength() === "Weak") {
      setError("Password is too weak");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setMessage("Password reset successfully!");
    setTimeout(() => navigate("/login/customer"), 1500);
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Reset Password</h2>

        {error && <div style={errorMsg}>{error}</div>}
        {message && <div style={successMsg}>{message}</div>}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Email or Mobile"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={input}
            />
            <button style={btn} onClick={sendOtp}>
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={input}
            />

            <button style={btn} onClick={verifyOtp}>
              Verify OTP
            </button>

            <div style={{ textAlign: "center", marginTop: 10 }}>
              {canResend ? (
                <button onClick={resendOtp} style={linkBtn}>
                  Resend OTP
                </button>
              ) : (
                <span style={timerText}>Resend in {timer}s</span>
              )}
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div style={inputWrap}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={input}
              />
              <span style={icon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div style={strengthText(getStrength())}>
              Strength: {getStrength()}
            </div>

            <div style={inputWrap}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={input}
              />
              <span style={icon} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {confirmPassword && newPassword !== confirmPassword && (
              <div style={errorMsgSmall}>Passwords do not match</div>
            )}

            <button style={btn} onClick={resetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#eef4fb",
  padding: "1rem"
};

const card = {
  background: "#ffffff",
  padding: "2rem",
  borderRadius: "1.2rem",
  width: "100%",
  maxWidth: "380px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const title = {
  textAlign: "center",
  marginBottom: "1rem"
};

const input = {
  width: "100%",
  padding: "12px 40px 12px 12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  marginBottom: "12px",
  boxSizing: "border-box"
};

const inputWrap = {
  position: "relative",
  marginBottom: "12px"
};

const icon = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#2b6cb0",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

const linkBtn = {
  border: "none",
  background: "none",
  color: "#2b6cb0",
  cursor: "pointer",
  textDecoration: "underline"
};

const timerText = {
  fontSize: "14px",
  color: "#718096"
};

const errorMsg = {
  background: "#ffe5e5",
  color: "#c53030",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center"
};

const successMsg = {
  background: "#e6fffa",
  color: "#2f855a",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  textAlign: "center"
};

const errorMsgSmall = {
  color: "#c53030",
  fontSize: "13px"
};

const strengthText = (strength) => ({
  fontSize: "13px",
  marginBottom: "10px",
  color:
    strength === "Strong"
      ? "green"
      : strength === "Medium"
      ? "orange"
      : "red"
});