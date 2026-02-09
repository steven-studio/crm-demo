import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { PersonOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import TextInput from "../../../components/textInput";
import CustomButton from "../../../components/customButton";
import { adminDetail, adminUpdate } from "../../../api/Modules/auth";

const ProfileSection = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Fetch admin details on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        setFetchingData(true);
        const response = await adminDetail();
        if (response.status === 200 || response.status === 201) {
          setProfileData({
            name: response.data.data.name || "",
            email: response.data.data.email || "",
          });
        } else {
          enqueueSnackbar("取得管理員資料失敗", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
        enqueueSnackbar("取得管理員資料失敗", {
          variant: "error",
        });
      } finally {
        setFetchingData(false);
      }
    };

    fetchAdminDetails();
  }, [enqueueSnackbar]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async () => {
    if (!profileData.name) {
      enqueueSnackbar("請填寫姓名欄位", {
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await adminUpdate({
        name: profileData.name,
      });

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("個人資料更新成功！", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(
          response.message || "更新個人資料失敗",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      enqueueSnackbar("更新個人資料失敗", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={3}
      maxWidth={1200}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "primary.main",
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
              boxShadow: 2,
            }}
          >
            <PersonOutlined sx={{ fontSize: 35 }} />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              mb: 1,
            }}
          >
            個人資訊
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            更新您的個人資料
          </Typography>
        </Box>
      </Box>

        {fetchingData ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <TextInput
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="輸入姓名"
                InputStartIcon={<PersonOutlined />}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                name="email"
                value={profileData.email}
                placeholder="電子郵件（僅供檢視）"
                type="email"
                InputStartIcon={<PersonOutlined />}
                fullWidth={true}
                disabled={true}
              />
            </Grid>
          </Grid>
        )}

        <Box sx={{ mt: 4 }}>
          <CustomButton
            btnLabel={loading ? "更新中..." : "更新個人資料"}
            handlePressBtn={handleProfileUpdate}
            btnBgColor="primary.main"
            btnTextColor="white"
            btnHoverColor="secondary.dark"
            width="100%"
            height="50px"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <PersonOutlined />
              )
            }
            disabled={loading || fetchingData}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
