import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Container, Link } from "@mui/material";
import { Lock, Mail } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import loanImage from "../../assets/loan-vector-5.png";
import { AUTH_STYLES } from "./styles";
import logo from "../../assets/logo-app.png";
import { adminLogin } from "../../api/Modules/auth";

import { useSnackbar } from "notistack";
import useAdminStore from "../../zustand/useAdminStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setAdminData } = useAdminStore();
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await adminLogin({
        email: formData.email,
        password: formData.password,
      });

      if (response?.status === 200 || response?.status === 201) {
        const adminData = response.data.data.admin;

        localStorage.setItem("token", response.data.data.token);
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
        setAdminData(adminData);
        console.log("Login Success:", adminData);
        navigate("/");
      } else {
        enqueueSnackbar(response?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar(error?.response?.data?.message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={AUTH_STYLES.container}>
      <Paper elevation={3} sx={AUTH_STYLES.paper}>
        {/* Right Section - Illustration (Top on mobile) */}
        <Box sx={AUTH_STYLES.rightSection}>
          <img src={loanImage} alt="login" style={{ width: "100%" }} />
        </Box>

        {/* Left Section - Login Form (Bottom on mobile) */}
        <Box sx={AUTH_STYLES.leftSection}>
          {/* Logo */}
          <Box sx={AUTH_STYLES.logoContainer}>
            <img src={logo} alt="logo" width={100} height={100} />
          </Box>

          {/* Welcome Message */}
          <Typography variant="h2" sx={AUTH_STYLES.welcomeText}>
            Hello,
          </Typography>
          <Typography variant="h2" sx={AUTH_STYLES.welcomeText}>
            Welcome Back
          </Typography>
          <Typography variant="subtitle2" sx={AUTH_STYLES.subtitle}>
            Hey, welcome back to your special place
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={AUTH_STYLES.form80}>
            {/* Email Input */}
            <TextInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="stanley@gmail.com"
              InputStartIcon={<Mail size={20} style={{ color: "#1F3C88" }} />}
              sx={{ mb: 1 }}
            />

            {/* Password Input */}
            <TextInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
              showPassIcon={true}
              InputStartIcon={<Lock size={20} style={{ color: "#1F3C88" }} />}
              sx={{ mb: 1 }}
            />

            {/* Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                alignItems: "center",
                mb: 3,
              }}
            >
              <Link
                onClick={() => navigate("/forgot-password")}
                sx={AUTH_STYLES.forgotPassword}
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <CustomButton
              btnLabel="Sign In"
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

export default Login;
