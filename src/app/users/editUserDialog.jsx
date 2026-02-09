import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Divider,
  Alert,
  IconButton,
  Grid,
  CircularProgress,
  Stack,
} from "@mui/material";
import { X, User, Mail, Phone, Percent, Banknote } from "lucide-react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import {
  adminUpdateUser,
  adminChangeUserPassword,
  getUsersByUserId,
  adminResetUserPassword,
} from "../../api/Modules/user";
import { useSnackbar } from "notistack";
import {
  vaildateUserResetPasswordForm,
  vaildateUserUpdateForm,
} from "../../utils/validation";

const EditUserDialog = ({ open, onClose, user, onRefresh }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    interest: "",
    loanLimit: "",
  });

  const [resetPasswordErrors, setResetPasswordErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    update: false,
    resetPassword: false,
  });

  const fetchUsersByUserId = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      const response = await getUsersByUserId(user._id);
      if (response.status === 200 || response.status === 201) {
        const data = response.data.data;
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contactNumber: user.contactNumber || user.phoneNumber || "",
          interest: data.interest || "",
          loanLimit: data.loanLimit || "",
        });
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsersByUserId();
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (resetPasswordErrors[field]) {
      setResetPasswordErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      interest: "",
      loanLimit: "",
    });
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setResetPasswordErrors({});
    onClose();
  };

  const handleUpdateUser = async () => {
    if (!vaildateUserUpdateForm(formData, setErrors)) return;

    try {
      setIsLoading((prev) => ({ ...prev, update: true }));
      const response = await adminUpdateUser(user._id, {
        ...formData,
        phoneNumber: formData.contactNumber,
        fullName: formData.name,
      });
      if ([200, 201].includes(response.status)) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        handleClose();
        onRefresh();
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleResetPassword = async () => {
    if (!vaildateUserResetPasswordForm(passwordData, setResetPasswordErrors))
      return;

    try {
      setIsLoading((prev) => ({ ...prev, resetPassword: true }));
      const response = await adminResetUserPassword(user._id, passwordData);
      if ([200, 201].includes(response.status)) {
        enqueueSnackbar(response.data.message, { variant: "success" });
        handleClose();
        onRefresh();
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      {isLoading.fetch ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogTitle
            sx={{
              pb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                "linear-gradient(135deg, #667eea 0%, rgb(23, 4, 81) 100%)",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "rgba(255,255,255,0.2)",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {user.name?.charAt(0) || "U"}
              </Avatar>
              <Typography variant="h6" color="white" sx={{ fontWeight: "600" }}>
                編輯使用者：{user.name}
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <X size={20} />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            {/* User Information Section */}
            <Box sx={{ py: 2 }}>
              <Typography
                variant="h6"
                sx={{ mb: 1, color: "#333", fontWeight: "600" }}
              >
                使用者資料
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    InputStartIcon={<User size={18} color="#666" />}
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    InputStartIcon={<Mail size={18} color="#666" />}
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                    InputStartIcon={<Phone size={18} color="#666" />}
                    fullWidth
                    type="number"
                    error={Boolean(errors.contactNumber)}
                    helperText={errors.contactNumber}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="h6"
                sx={{ mt: 2, mb: 1, color: "#333", fontWeight: "600" }}
              >
                更新利率與額度
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    value={formData.interest}
                    onChange={(e) =>
                      handleInputChange("interest", e.target.valueAsNumber)
                    }
                    InputStartIcon={<Percent size={18} color="#666" />}
                    placeholder="利率"
                    fullWidth
                    type="number"
                    error={Boolean(errors.interest)}
                    helperText={errors.interest}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    value={formData.loanLimit}
                    onChange={(e) =>
                      handleInputChange("loanLimit", e.target.valueAsNumber)
                    }
                    InputStartIcon={<Banknote size={18} color="#666" />}
                    placeholder="貸款額度"
                    fullWidth
                    type="number"
                    error={Boolean(errors.loanLimit)}
                    helperText={errors.loanLimit}
                  />
                </Grid>
              </Grid>
              <Stack alignItems={"flex-end"} my={2}>
                <CustomButton
                  btnLabel={isLoading.update ? "更新中..." : "更新使用者"}
                  handlePressBtn={handleUpdateUser}
                  disabled={isLoading.update}
                  variant={"authbutton"}
                  width="140px"
                  height="40px"
                  btnTextSize="14px"
                  textWeight="500"
                />
              </Stack>
              <Divider />

              {/* Password Change Section */}
              <Typography
                variant="h6"
                sx={{ mt: 2, color: "#333", fontWeight: "600" }}
              >
                重設密碼
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "#666" }}>
                若不需重設密碼，請將密碼欄位留空
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    showLabel="新密碼"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                    showPassIcon={true}
                    fullWidth
                    error={Boolean(resetPasswordErrors.newPassword)}
                    helperText={resetPasswordErrors.newPassword}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    showLabel="確認新密碼"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      handlePasswordChange("confirmPassword", e.target.value)
                    }
                    showPassIcon={true}
                    fullWidth
                    error={Boolean(resetPasswordErrors.confirmPassword)}
                    helperText={resetPasswordErrors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <Stack alignItems={"flex-end"} my={2}>
                <CustomButton
                  btnLabel={
                    isLoading.resetPassword ? "重設中..." : "重設密碼"
                  }
                  handlePressBtn={handleResetPassword}
                  disabled={isLoading.resetPassword}
                  variant={"authbutton"}
                  width="auto"
                  height="40px"
                  btnTextSize="14px"
                  textWeight="500"
                />
              </Stack>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default EditUserDialog;
