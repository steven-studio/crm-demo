import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Paper, Typography, Container, Link } from "@mui/material";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import loanImage from "../../assets/loan-vector-5.png";
import { AUTH_STYLES } from "./styles";
import { adminResetPassword } from "../../api/Modules/auth";
import { useSnackbar } from "notistack";

const SetNewPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (location.state?.email && location.state?.otp) {
      setEmail(location.state.email);
      setOtp(location.state.otp);
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    return requirements;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRequirements = validatePassword(formData.newPassword);
    const allRequirementsMet =
      Object.values(passwordRequirements).every(Boolean);

    if (!allRequirementsMet) {
      setError("Password does not meet all requirements");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminResetPassword({
        email: email,
        otp: otp,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmPassword,
      });

      if (response?.status === 200 || response?.status === 201) {
        enqueueSnackbar(response?.data?.message || "Password reset successfully", {
          variant: "success",
        });
        setSuccess("Password successfully reset! Redirecting to login...");
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        enqueueSnackbar(response?.data?.message || "Failed to reset password", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Reset password error:", error);
      enqueueSnackbar(error?.response?.data?.message || "Failed to reset password. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    navigate("/forgot-password");
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
          {/* Back to Forgot Password */}
          <Link onClick={handleBackToForgotPassword} sx={AUTH_STYLES.backLink}>
            <ArrowLeft size={16} />
            Back to Forgot Password
          </Link>

          {/* Title */}
          <Typography variant="h3" sx={AUTH_STYLES.title}>
            Set New Password
          </Typography>
          <Typography variant="subtitle2" sx={AUTH_STYLES.subtitle}>
            Create a strong password for your account. Make sure it's secure and
            easy to remember.
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={AUTH_STYLES.form}>
            {/* New Password Input */}
            <TextInput
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="Enter new password"
              InputStartIcon={<Lock size={20} style={{ color: "#1F3C88" }} />}
              InputEndIcon={
                <Box
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </Box>
              }
              sx={{ mb: 2 }}
            />

            {/* Confirm Password Input */}
            <TextInput
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm new password"
              InputStartIcon={<Lock size={20} style={{ color: "#1F3C88" }} />}
              InputEndIcon={
                <Box
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </Box>
              }
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
              btnLabel="Reset Password"
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

export default SetNewPassword;
