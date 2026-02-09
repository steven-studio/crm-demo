import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { getSetting, updateSetting } from "../../api/Modules/setting";
import { useSnackbar } from "notistack";
import CustomButton from "../../components/customButton";
import { Paper, Stack, Typography, CircularProgress, Box } from "@mui/material";


const PrivacyPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    update: false,
  });
  const [setting, setSetting] = useState("");
  const [objectId, setObjectId] = useState("");

  useEffect(() => {
    fetchSetting();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const fetchSetting = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      const response = await getSetting({ select: "privacy" });
      if (response.data.status === "success") {
        setSetting(response.data.data.privacy);
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
    try {
      setIsLoading((prev) => ({ ...prev, update: true }));
      const response = await updateSetting(objectId, {
        privacy: setting,
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
  
  return (
    <Paper sx={{ height: "80vh", p: 2, borderRadius: 3 }}>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" fontWeight={600}>隱私權政策</Typography>
          {isLoading.fetch && <CircularProgress size={20} />}
        </Box>

        <CustomButton
          variant="webbutton"
          btnLabel={isLoading.update ? "更新中..." : "更新"}
          handlePressBtn={handleUpdateSetting}
          disabled={isLoading.update}
          width="auto"
        />
      </Stack>
      <ReactQuill
        theme="snow"
        value={setting}
        onChange={setSetting}
        modules={modules}
        style={{ height: "calc(80vh - 120px)" }}
      />
    </Paper>
  );
};

export default PrivacyPage;
