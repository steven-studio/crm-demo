import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { X, User, Mail } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import TextInput from "../../components/textInput";
import CustomButton from "../../components/customButton";
import { createFaq, getFaqById, updateFaq } from "../../api/Modules/faq";
import { vaildateFaqForm } from "../../utils/validation";

const FaqDialog = forwardRef(({ onRefresh }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order: 0,
  });
  const [isLoading, setIsLoading] = useState({
    fetch: false,
    update: false,
  });
  const [dialogData, setDialogData] = useState(null);

  // Expose methods to parent component through ref
  useImperativeHandle(ref, () => ({
    openDialog: (faqData) => {
      setOpen(true);
      setDialogData(faqData);
      if (faqData?.type === "edit") {
        fetchFaqById(faqData?.data);
      }
    },
    closeDialog: () => {
      setOpen(false);
    },
  }));

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

  const fetchFaqById = async (data) => {
    try {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      const response = await getFaqById(data._id);
      if (response.status === 200 || response.status === 201) {
        const data = response.data.data;
        setFormData({
          question: data.question || data?.question,
          answer: data.answer || data?.answer,
          order: data.order || data?.order,
        });
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleAddEditFAQ = async () => {
    if (!vaildateFaqForm(formData, setErrors, dialogData?.type)) return;

    try {
      setIsLoading((prev) => ({ ...prev, update: true }));

      let payload = {
        question: formData.question,
        answer: formData.answer,
        ...(dialogData?.type === "edit" && { order: formData.order }),
      };

      const api =
        dialogData?.type === "edit"
          ? await updateFaq(dialogData?.data?._id, payload)
          : await createFaq(payload);

      const response = await api;
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

  const handleClose = () => {
    setFormData({
      question: "",
      answer: "",
      order: 0,
    });
    setErrors({});
    setDialogData(null);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
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
          <Typography variant="h6" color="white" sx={{ fontWeight: "600" }}>
            {dialogData?.type === "edit" ? "Edit FAQ" : "Create New FAQ"}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      {isLoading.fetch ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DialogContent sx={{ p: 3 }} dividers>
            <Box>
              <Grid container spacing={2}>
                {dialogData?.type === "edit" && (
                  <Grid size={12}>
                    <TextInput
                      showLabel={"Order"}
                      value={formData.order}
                      onChange={(e) =>
                        handleInputChange("order", e.target.value)
                      }
                      fullWidth
                      error={Boolean(errors.order)}
                      helperText={errors.order}
                    />
                  </Grid>
                )}
                <Grid size={12}>
                  <TextInput
                    showLabel={"Question"}
                    value={formData.question}
                    onChange={(e) =>
                      handleInputChange("question", e.target.value)
                    }
                    fullWidth
                    error={Boolean(errors.question)}
                    helperText={errors.question}
                  />
                </Grid>

                <Grid size={12}>
                  <TextInput
                    showLabel={"Answer"}
                    type="text"
                    value={formData.answer}
                    onChange={(e) =>
                      handleInputChange("answer", e.target.value)
                    }
                    fullWidth
                    error={Boolean(errors.answer)}
                    helperText={errors.answer}
                    multiline={true}
                    rows={4}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <CustomButton
              btnLabel={"Cancel"}
              handlePressBtn={handleClose}
              disabled={isLoading.update}
              variant={"authbutton"}
            />
            <CustomButton
              btnLabel={
                isLoading.update
                  ? "Loading..."
                  : dialogData?.type === "edit"
                  ? "Update FAQ"
                  : "Create FAQ"
              }
              handlePressBtn={handleAddEditFAQ}
              disabled={isLoading.update}
              variant={"authbutton"}
            />
          </DialogActions>
        </>
      )}
    </Dialog>
  );
});

FaqDialog.displayName = "FaqDialog";

export default FaqDialog;
