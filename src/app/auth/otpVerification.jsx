import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Container,
  Link,
  TextField,
} from "@mui/material";
import { Mail, ArrowLeft } from "lucide-react";
import CustomButton from "../../components/customButton";
import loanImage from "../../assets/loan-vector-5.png";
import { AUTH_STYLES } from "./styles";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    console.log("OTP verification for:", email, "OTP:", otpString);
    navigate("/set-new-password", { state: { email, otp: otpString } });
  };

  const handleResendOTP = () => {
    console.log("Resending OTP to:", email);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <Container maxWidth="lg" sx={AUTH_STYLES.container}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={AUTH_STYLES.paper}>
          {/* Left Section - Form */}
          <Box sx={AUTH_STYLES.leftSection}>
            {/* Back Link */}
            <Link
              onClick={() => navigate("/forgot-password")}
              sx={AUTH_STYLES.backLink}
            >
              <ArrowLeft size={16} />
              Back to Forgot Password
            </Link>

            {/* Title */}
            <Typography variant="h3" sx={AUTH_STYLES.title}>
              Verify OTP
            </Typography>
            <Typography variant="subtitle2" sx={AUTH_STYLES.subtitle}>
              We've sent a verification code to your email address. Please enter
              the 6-digit code below.
            </Typography>

            {/* Email Display */}
            <Box sx={AUTH_STYLES.emailDisplay}>
              <Mail size={16} />
              <Typography
                variant="body2"
                sx={{ color: "#fff", fontWeight: 500 }}
              >
                {email}
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={AUTH_STYLES.form}>
              {/* OTP Input Fields */}
              <Box sx={AUTH_STYLES.otpContainer}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    sx={AUTH_STYLES.otpInput}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    placeholder="-"
                  />
                ))}
              </Box>

              {/* Error Message */}
              {error && (
                <Typography variant="caption" sx={AUTH_STYLES.errorText}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <CustomButton
                btnLabel="Verify OTP"
                handlePressBtn={handleSubmit}
                variant="authbutton"
                width="100%"
                height="50px"
                borderRadius={3}
                btnTextColor="#fff"
                sx={{ my: 2 }}
              />

              {/* Resend OTP Link */}
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Didn't receive the code?{" "}
                <Link onClick={handleResendOTP} sx={AUTH_STYLES.resendLink}>
                  Resend OTP
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Illustration */}
          <Box sx={AUTH_STYLES.rightSection}>
            <img
              src={loanImage}
              alt="otp verification"
              style={{ width: "100%" }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default OTPVerification;
