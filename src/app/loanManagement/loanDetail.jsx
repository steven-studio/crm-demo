import { Box, IconButton, Paper, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoanInstallment } from "../../api/Modules/user";
import DynamicTable from "../../components/dynamicTable";

// Table headers for loan details
const tableHeaders = [
  { id: "dueDate", title: "Due Date", align: "left" },
  {
    id: "amount",
    title: "Amount",
    align: "left",
  },
  {
    id: "status",
    title: "Status",
    align: "left",
  },
  {
    id: "paidAt",
    title: "Paid At",
    align: "left",
  },
  {
    id: "slip",
    title: "Slip",
    align: "left",
  },
];

// Display rows configuration
const displayRows = [
  "dueDateAt",
  "amount",
  "installment_status",
  "installment_paidAt",
  "installment_slip",
];

const LoanDetail = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id, userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [installmentData, setInstallmentData] = useState([]);

  const fetchAllLoanRequest = async () => {
    try {
      setIsLoading(true);
      const response = await getLoanInstallment(id, userId);
      if ([200, 201].includes(response?.status)) {
        setInstallmentData(response.data.data);
      } else {
        enqueueSnackbar(response?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error", error);
      enqueueSnackbar(
        error?.response?.data?.message || "Something went wrong",
        {
          variant: "error",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLoanRequest();
  }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mr: 2, bgcolor: "#f5f5f5" }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          Loan Installments
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableHeader={tableHeaders}
          tableData={installmentData}
          displayRows={displayRows}
          isLoading={isLoading}
        />
      </Paper>
    </Box>
  );
};

export default LoanDetail;
