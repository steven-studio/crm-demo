import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getSetting, updateSetting } from "../../api/Modules/setting";
import TextInput from "../../components/textInput";
import { useSnackbar } from "notistack";
import CustomButton from "../../components/customButton";
import { ShieldHalf } from "lucide-react";

const AccountNumberPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    update: false,
  });
  const [accountNumber, setAccountNumber] = useState("");
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    fetchSetting();
  }, []);

  const fetchSetting = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      const response = await getSetting({ select: "accountNumber" });
      if (response.data.status === "success") {
        setAccountNumber(response.data.data.accountNumber);
        setObjectId(response.data.data._id);
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleUpdateSetting = async () => {
    if (!accountNumber) {
      setError("請填寫所有欄位");
      return;
    }

    try {
      setIsLoading((prev) => ({ ...prev, update: true }));
      const response = await updateSetting(objectId, {
        accountNumber: accountNumber,
      });
      if (response.data.status === "success") {
        enqueueSnackbar(response.data.message, { variant: "success" });
        fetchSetting();
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
    setError("");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: "600" }}>
        收款帳號
      </Typography>
      <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
        在此管理收款帳號
      </Typography>

      <Grid container spacing={2} alignItems={error ? "center" : "flex-end"}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInput
            name="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            error={Boolean(error)}
            helperText={error}
            InputStartIcon={
              isLoading.fetch ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ShieldHalf />
              )
            }
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomButton
            btnLabel={
              isLoading.update ? "更新中..." : "更新收款帳號"
            }
            handlePressBtn={handleUpdateSetting}
            variant="webbutton"
            width="100%"
            height={"40px"}
            disabled={isLoading.update}
            
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountNumberPage;
