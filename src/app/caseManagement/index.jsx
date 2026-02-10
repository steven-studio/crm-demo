import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCaseRequests, updateCaseStatus } from "../../api/Modules/user";
import { useSnackbar } from "notistack";



// Table headers for case management
const tableHeaders = [
  { id: "createdAt", title: "建立日期", align: "left" },
  { id: "userInfo", title: "客戶", align: "left" },
  { id: "caseAmount", title: "案件金額", align: "left" },

  // 新的 CRM 欄位（先佔位）
  { id: "productInfo", title: "方案/產品", align: "left" },
  { id: "lastUpdated", title: "最後更新", align: "left" },

  { id: "status", title: "狀態", align: "left" },
  { id: "actions", title: "操作", align: "left" },
];

// Display rows configuration
const displayRows = [
  "createdAt",
  "userInfo",
  "caseAmount",     // 你 header 用 caseAmount
  "productInfo",
  "lastUpdated",
  "status",
  "actions",
];

const CaseManagement = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState([]);
  const [statusLoading, setStatusLoading] = useState(false);

  console.log("caseData", caseData);

  const fetchAllCaseRequest = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCaseRequests({});
      if ([200, 201].includes(response?.status)) {
        const rows = (response.data.data.caseRequests || []).map((r) => ({
          ...r,
          productInfo: `${r.interestRate ?? "-"}% / ${r.totalMonths ?? "-"}期`,
          lastUpdated: r.updatedAt || r.createdAt || "-",
        }));
        setCaseData(rows);
      } else {
        enqueueSnackbar(response?.data?.message || "案件資料取得失敗", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "資料取得時發生錯誤", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCaseRequest();
  }, []);

  const handleCaseStatusChange = async (row, status, index) => {
    try {
      setStatusLoading(true);
      const response = await updateCaseStatus(row._id, { status });
      if ([200, 201].includes(response?.status)) {
        fetchAllCaseRequest();
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
      setStatusLoading(false);
    }
  };

  const handleView = (row) => {
    console.log("row", row);
    navigate(`/case-detail/${row._id}/user/${row.userId}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          案件管理
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          管理案件申請並追蹤進度
        </Typography>
      </Box>

      {/* Case Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={"100%"}
          tableHeader={tableHeaders}
          tableData={caseData}
          displayRows={displayRows}
          isLoading={isLoading}
          showPagination={true}
          handleCaseStatusChange={handleCaseStatusChange}
          statusLoading={statusLoading}
          onView={handleView}

          // onEdit={handleEdit}
          // onDelete={handleDelete}
          // onViewClick={handleView}
          // showDelete={true}
          // onStatusChange={handleStatusChange}
        />
      </Paper>
    </Box>
  );
};

export default CaseManagement;
