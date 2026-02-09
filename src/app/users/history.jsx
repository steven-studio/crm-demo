import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCaseRequests,
  getUsersByUserId,
  updateCaseStatus,
} from "../../api/Modules/user";
import DynamicTable from "../../components/dynamicTable";

// Updated table headers for API data structure
const tableHeaders1 = [
  { id: "createdAt", title: "建立時間", align: "left" },
  { id: "message", title: "訊息", align: "left" },
];

// Updated columns to display
const displayRows1 = ["createdAt", "message"];

// Table headers for case management
const tableHeaders2 = [
  { id: "createdAt", title: "申請日期", align: "left" },
  { id: "userInfo", title: "使用者", align: "left" },
  { id: "requestedAmount", title: "申請金額", align: "left" },
  { id: "interestRate", title: "利率", align: "left" },
  { id: "totalPayableAmount", title: "應付總額", align: "left" },
  { id: "loan_tenure", title: "期數", align: "left" },
  { id: "totalPaidAmount", title: "已繳金額", align: "left" },
  { id: "remainingBalance", title: "剩餘金額", align: "left" },
  { id: "status", title: "狀態", align: "left" },
  { id: "actions", title: "操作", align: "left" },
];

// Display rows configuration
const displayRows2 = [
  "createdAt",
  "userInfo",
  "requestedAmount",
  "interestRate",
  "totalPayableAmount",
  "loan_tenure",
  "totalPaidAmount",
  "remainingBalance",
  "loan_status",
  "actions",
];

const Userhistory = () => {
  const { id: UserId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [loanData, setLoanData] = useState([]);
  const [isLoading, setIsLoading] = useState({
    fetchLoan: false,
    fetchUsers: false,
    updateLoanStatus: false,
  });

  const fetchUsersByUserId = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchUsers: true }));
      const response = await getUsersByUserId(UserId);
      if (response.status === 200 || response.status === 201) {
        setUsersData(response.data.data);
      } else {
        setError(true);
        enqueueSnackbar(response.data.message || "取得使用者資料失敗", {
          variant: "error",
        });
      }
    } catch (error) {
      setError(true);
      enqueueSnackbar(error.response?.data?.message || "取得使用者資料失敗", {
        variant: "error",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchUsers: false }));
    }
  };

  const fetchAllLoanRequest = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, fetchLoan: true }));
      const response = await getAllLoanRequests({ userId: UserId });
      if ([200, 201].includes(response?.status)) {
        setLoanData(response.data.data.loanRequests);
      } else {
        enqueueSnackbar(response?.data?.message || "貸款資料取得失敗", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "貸款資料取得失敗", {
        variant: "error",
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, fetchLoan: false }));
    }
  };

  useEffect(() => {
    if (UserId) {
      fetchAllLoanRequest();
      fetchUsersByUserId();
    }
  }, [UserId]);

  const handleLoanStatusChange = async (row, status, index) => {
    try {
      setIsLoading((prev) => ({ ...prev, updateLoanStatus: true }));
      const response = await updateLoanStatus(row._id, { status });
      if ([200, 201].includes(response?.status)) {
        fetchAllLoanRequest();
        enqueueSnackbar(response?.data?.message || "更新成功", {
          variant: "success",
        });
      } else {
        enqueueSnackbar(response?.data?.message || "更新失敗", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "發生未知錯誤",
        {
          variant: "error",
        }
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, updateLoanStatus: false }));
    }
  };

  const handleView = (row) => {
    navigate(`/loan-detail/${row._id}/user/${row.userId}`);
  };

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: "red" }}>
        取得使用者資料時發生錯誤
      </Typography>
    );
  }

  return (
    <Box>
      {/* Simple Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mr: 2, bgcolor: "#f5f5f5" }}
        >
          <ArrowLeft size={20} />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            使用者歷史紀錄
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            在此查看使用者歷史紀錄
          </Typography>
        </Box>
      </Stack>

      {/* Simple Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={1600}
          tableHeader={tableHeaders2}
          tableData={loanData || []}
          displayRows={displayRows2}
          showPagination={true}
          isLoading={isLoading.fetchLoan}
          statusLoading={isLoading.updateLoanStatus}
          onView={handleView}
          handleLoanStatusChange={handleLoanStatusChange}
        />
      </Paper>

      <Paper elevation={1} sx={{ borderRadius: "8px", mt: 3 }}>
        <DynamicTable
          tableHeader={tableHeaders1}
          tableData={usersData?.history || []}
          displayRows={displayRows1}
          showPagination={true}
          isLoading={isLoading.fetchUsers}
        />
      </Paper>
    </Box>
  );
};

export default Userhistory;
