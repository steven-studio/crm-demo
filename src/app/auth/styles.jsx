// Common styles for all authentication screens using theme
export const AUTH_STYLES = {
  // Container styles
  container: { 
    minHeight: "100vh", 
    py: { xs: 1, sm: 2 },
    px: { xs: 1, sm: 2 },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Main paper container
  paper: {
    width: { xs: "100%", sm: "90%", md: "1000px" },
    height: { xs: "auto", sm: "auto", md: "600px" },
    minHeight: { xs: "100vh", sm: "500px" },
    borderRadius: { xs: 0, sm: 3 },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    overflow: "hidden",
    boxShadow: { xs: "none", sm: "0 10px 30px rgba(0,0,0,0.1)" },
  },
  
  // Left section (form area) - Gradient background
  leftSection: {
    width: { xs: "100%", md: "40%" },
    background: "linear-gradient(135deg, #374061 0%,#324596 100%)",
    p: { xs: 3, sm: 4 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    order: { xs: 2, md: 1 },
    minHeight: { xs: "60vh", sm: "500px" },
  },
  
  // Right section (illustration area) - White background
  rightSection: {
    width: { xs: "100%", md: "60%" },
    height: { xs: "40vh", md: "600px" },
    backgroundColor: "background.paper",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    order: { xs: 1, md: 2 },
    minHeight: { xs: "40vh", sm: "300px" },
  },
  
  // Logo container
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    mb: { xs: 2, sm: 3 },
    mt: { xs: 1, sm: 0 },
  },
  
  // Typography styles using theme variants - White text for gradient background
  title: {
    variant: "h3", // Uses theme.typography.h3
    mb: 1,
    textAlign: { xs: "center", md: "left" },
    color: "white",
  },
  
  welcomeText: {
    variant: "h2", // Uses theme.typography.h2
    textAlign: { xs: "center", md: "left" },
    fontSize: { xs: "32px", sm: "36px", md: "40px" },
    color: "white",
  },
  
  subtitle: {
    variant: "subtitle2", // Uses theme.typography.subtitle2
    mb: 3,
    textAlign: { xs: "center", md: "left" },
    px: { xs: 1, sm: 0 },
    color: "white",
  },
  
  // Navigation links - White text for gradient background
  backLink: {
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2,
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
    justifyContent: { xs: "center", md: "flex-start" },
    "&:hover": {
      textDecoration: "underline",
      opacity: 0.8,
    },
  },
  
  forgotPassword: {
    color: "white",
    textDecoration: "none",
    textAlign: { xs: "center", md: "right" },
    fontWeight: 500,
    fontSize: 14,
    justifyContent: { xs: "center", md: "flex-end" },
    "&:hover": {
      textDecoration: "underline",
      opacity: 0.8,
    },
  },
  
  // Form elements
  form: {
    width: "100%",
    maxWidth: { xs: "100%", sm: "400px" },
    mx: "auto",
  },
  
  form80: {
    width: "100%",
    maxWidth: { xs: "100%", sm: "400px" },
    mx: "auto",
  },
  
  // Email display - White text for gradient background
  emailDisplay: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 3,
    fontSize: 14,
    fontWeight: 500,
    color: "white",
    justifyContent: { xs: "center", md: "flex-start" },
  },
  
  // OTP specific styles
  otpContainer: {
    display: "flex",
    gap: { xs: 1, sm: 2 },
    mb: 3,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  
  otpInput: {
    width: { xs: "40px", sm: "40px" },
    height: { xs: "40px", sm: "40px" },
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      "& fieldset": { 
        borderColor: "rgba(255, 255, 255, 0.3)", 
        borderWidth: 2 
      },
      "&:hover fieldset": { 
        borderColor: "rgba(255, 255, 255, 0.5)" 
      },
      "&.Mui-focused fieldset": { 
        borderColor: "white", 
        borderWidth: 2 
      },
    },
    "& .MuiInputBase-input": {
      textAlign: "center",
      fontSize: { xs: "18px", sm: "20px" },
      fontWeight: "600",
      color: "white",
      "&::placeholder": {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
  
  // Password requirements - White text for gradient background
  passwordRequirements: {
    variant: "caption",
    mb: 2,
    lineHeight: 1.4,
    textAlign: { xs: "center", md: "left" },
    color: "white",
  },
  
  requirementItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.5,
    justifyContent: { xs: "center", md: "flex-start" },
    color: "white",
  },
  
  // Links - White text for gradient background
  resendLink: {
    color: "white",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
    textAlign: "center",
    "&:hover": {
      textDecoration: "underline",
      opacity: 0.8,
    },
  },
  
  // Error and success messages - White text for gradient background
  errorText: {
    color: "#ffcdd2",
    fontSize: 12,
    mb: 2,
    textAlign: "center",
  },
  
  successText: {
    color: "#c8e6c9",
    fontSize: 12,
    mb: 2,
    textAlign: "center",
  },
  
  // Button styles
  button: {
    width: "100%",
    height: "50px",
    borderRadius: 3,
  },
  
  button60: {
    width: "100%",
    height: "50px",
    borderRadius: 3,
  },
  
  // Responsive helper classes
  mobileCenter: {
    textAlign: { xs: "center", md: "left" },
    justifyContent: { xs: "center", md: "flex-start" },
  },
  
  mobileHidden: {
    display: { xs: "none", md: "flex" },
  },
  
  mobileVisible: {
    display: { xs: "flex", md: "none" },
  },
};
