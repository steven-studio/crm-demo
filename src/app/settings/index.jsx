import React from "react";
import { Box } from "@mui/material";
import ProfileSection from "./components/ProfileSection";
import PasswordSection from "./components/PasswordSection";

const SettingsManagement = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", minHeight: "100vh" }}>
      <ProfileSection />
      <PasswordSection />
    </Box>
  );
};

export default SettingsManagement;
