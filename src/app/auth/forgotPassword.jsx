import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Container, Link } from "@mui/material";
import { Mail, ArrowLeft } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import loanImage from "../../assets/loan-vector-5.png";
import { AUTH_STYLES } from "./styles";
import { adminForgotPassword } from "../../api/Modules/auth";
import { useSnackbar } from "notistack";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminForgotPassword({
        email: formData.email,
      });

      if (response?.status === 200 || response?.status === 201) {
        enqueueSnackbar(response?.data?.message || "OTP sent to your email successfully", {
          variant: "success",
        });
        setSuccess("Email verified! Please check your email for OTP.");
        
        setTimeout(() => {
          navigate("/otp-verification", { state: { email: formData.email } });
        }, 1500);
      } else {
        enqueueSnackbar(response?.data?.message || "Failed to send OTP", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      enqueueSnackbar(error?.response?.data?.message || "Failed to send OTP. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={AUTH_STYLES.container}>
      <Paper elevation={3} sx={AUTH_STYLES.paper}>
        {/* Right Section - Illustration (Top on mobile) */}
        <Box sx={AUTH_STYLES.rightSection}>
          <img src={loanImage} alt="login" style={{ width: "100%" }} />
        </Box>

        {/* Left Section - Form (Bottom on mobile) */}
        <Box sx={AUTH_STYLES.leftSection}>
          {/* Back to Login */}
          <Link onClick={handleBackToLogin} sx={AUTH_STYLES.backLink}>
            <ArrowLeft size={16} />
            Back to Login
          </Link>

          {/* Title */}
          <Typography variant="h3" sx={AUTH_STYLES.title}>
            Forgot Password?
          </Typography>
          <Typography variant="subtitle2" sx={AUTH_STYLES.subtitle}>
            Don't worry! It happens. Please enter the email address associated
            with your account.
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={AUTH_STYLES.form80}>
            {/* Email Input */}
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="Enter your email address"
              InputStartIcon={<Mail size={20} style={{ color: "#1F3C88" }} />}
              sx={{ mb: 2 }}
            />

            {/* Error Message */}
            {error && (
              <Typography variant="caption" sx={AUTH_STYLES.errorText}>
                {error}
              </Typography>
            )}

            {/* Success Message */}
            {success && (
              <Typography variant="caption" sx={AUTH_STYLES.successText}>
                {success}
              </Typography>
            )}

            {/* Submit Button */}
            <CustomButton
              btnLabel="Send Reset Link"
              handlePressBtn={handleSubmit}
              variant="authbutton"
              width="100%"
              height="50px"
              borderRadius={3}
              btnTextColor="#fff"
              isBorder={"1px solid #fff"}
              disabled={loading}
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
