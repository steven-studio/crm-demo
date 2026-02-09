import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Avatar,
  Chip,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Eye,
  ChartPie,
} from "lucide-react";
import CustomSwitch from "../switch/index.jsx";
import CustomButton from "../customButton/index.jsx";
import CustomSelect from "../customSelect/index.jsx";

const tableStyle = {
  "&.MuiTableContainer-root": {
    borderRadius: 2,
  },

  "&.MuiTableContainer-root .MuiTableHead-root": {
    background: "linear-gradient(135deg, #667eea 0%,rgb(23, 4, 81) 100%)",
  },

  "& .MuiTable-root .MuiTableHead-root .MuiTableRow-root .MuiTableCell-root": {
    padding: "10px",
  },
  "& .MuiTable-root .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root": {
    padding: "10px",
  },

  "& .MuiTablePagination-toolbar": {
    minHeight: "50px",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #f0f0f0",
  },
};

const LOAN_STATUS = [
  {
    label: "待處理",
    value: "pending",
  },
  {
    label: "已核准",
    value: "approved",
  },
  {
    label: "已拒絕",
    value: "rejected",
  },
  {
    label: "已結清",
    value: "completed",
  },
];

export default function PaginatedTable({
  tableWidth,
  tableHeader,
  tableData,
  displayRows,
  isLoading,
  onEdit,
  onDelete,
  onViewClick,
  showPagination = true,
  showDelete = true,
  onStatusChange,
  onView,
  handleLoanStatusChange,
  statusLoading,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderCell = (row, val, index) => {
    switch (val) {
      case "id":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {row.id}
            </Box>
          </TableCell>
        );

      case "userInfo":
        return (
          <TableCell>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: getAvatarColor(row.user?.name || row.name || ""),
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {getInitials(row.user?.name || row.name || "")}
              </Avatar>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "600",
                    color: "#333",
                    mb: 0.5,
                  }}
                >
                  {row.user?.fullName || row.fullName || "無資料"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail size={14} color="#666" />
                  <Typography
                    variant="caption"
                    sx={{ color: "#666", fontSize: "12px" }}
                  >
                    {row.user?.email || row.email || "無資料"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TableCell>
        );

      case "phone":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Phone size={16} color="#666" />
              <Typography
                variant="body2"
                sx={{ color: "#333", fontWeight: "500" }}
              >
                {row.phone || "無資料"}
              </Typography>
            </Box>
          </TableCell>
        );

      case "completeAddress":
        return (
          <TableCell>
            <Box
              sx={{
                textAlign: "left",
                display: "flex",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#333",
                  fontWeight: "300",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  mb: 0.5,
                }}
              >
                {row.address || "無資料"}{" "}
                {[row.city, row.state, row.country].filter(Boolean).join(", ")}
              </Typography>
            </Box>
          </TableCell>
        );

      case "status":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                gap: 1,
              }}
            >
              <CustomSwitch
                checked={row.status}
                onChange={(e) => onStatusChange(row, e.target.checked)}
              />
            </Box>
          </TableCell>
        );

      case "interestRate":
        return (
          <TableCell>
            <Typography
              variant="body2"
              sx={{
                color: "#333",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {row.interestRate || "無資料"}
            </Typography>
          </TableCell>
        );

      case "emailVerified":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chip
                label={row.emailVerified ? "已驗證" : "未驗證"}
                size="small"
                sx={{
                  backgroundColor: row.emailVerified ? "#e8f5e8" : "#ffebee",
                  color: row.emailVerified ? "#2e7d32" : "#d32f2f",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              />
            </Box>
          </TableCell>
        );

      case "createdAt":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Calendar size={16} color="#666" />
              <Typography
                variant="body2"
                sx={{ color: "#333", fontWeight: "500" }}
              >
                {formatDate(row.createdAt || row.joinedDate)}
              </Typography>
            </Box>
          </TableCell>
        );

      case "dueDateAt":
        return <TableCell>{formatDate(row.dueDate)}</TableCell>;

      case "joinedDate":
        return (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Calendar size={16} color="#666" />
              <Typography
                variant="body2"
                sx={{ color: "#333", fontWeight: "500" }}
              >
                {formatDate(row.joinedDate)}
              </Typography>
            </Box>
          </TableCell>
        );

      case "loan_tenure":
        return (
          <TableCell sx={{ textTransform: "capitalize" }}>
            {row?.tenureValue} {row?.tenureType}
          </TableCell>
        );

      case "loan_status":
        return (
          <TableCell sx={{ textTransform: "capitalize" }}>
            <CustomSelect
              value={row?.status}
              icon={
                statusLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <ChartPie size={18} />
                )
              }
              onChange={(e) =>
                handleLoanStatusChange(row, e.target.value, index)
              }
            >
              {LOAN_STATUS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </TableCell>
        );

      case "installment_status":
        return (
          <TableCell sx={{ textTransform: "capitalize" }}>
            {row?.status}
          </TableCell>
        );

      case "installment_paidAt":
        return (
          <TableCell>{row?.paidAt ? formatDate(row.paidAt) : "__"}</TableCell>
        );
      case "installment_slip":
        return (
          <TableCell>
            {row?.slipUrl ? (
              <CustomButton
                btnLabel={"檢視"}
                width="auto"
                handlePressBtn={() => window.open(row.slipUrl)}
              />
            ) : (
              "__"
            )}
          </TableCell>
        );

      case "actions":
        return (
          <TableCell align="center">
            <Box sx={{ display: "flex", gap: 1, }}>
              {/* {onViewClick && (
                <IconButton
                  size="small"
                  onClick={() => onViewClick(row)}
                  sx={{
                    bgcolor: "#e3f2fd",
                    color: "#1976d2",
                    width: 36,
                    height: 36,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#1976d2",
                      color: "white",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                >
              
                </IconButton>
              )} */}

              {onEdit && (
                <IconButton
                  size="small"
                  onClick={() => onEdit(row)}
                  sx={{
                    bgcolor: "#fff3e0",
                    color: "#f57c00",
                    width: 36,
                    height: 36,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#f57c00",
                      color: "white",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(245, 124, 0, 0.4)",
                    },
                  }}
                >
                  <Edit size={18} />
                </IconButton>
              )}
              {onView && (
                <IconButton
                  size="small"
                  onClick={() => onView(row)}
                  sx={{
                    bgcolor: "#fff3e0",
                    color: "brown",
                    width: 36,
                    height: 36,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "brown",
                      color: "white",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(238, 148, 58, 0.4)",
                    },
                  }}
                >
                  <Eye size={18} />
                </IconButton>
              )}

              {/* {showDelete && onDelete && (
                <IconButton
                  size="small"
                  onClick={() => onDelete(row)}
                  sx={{
                    bgcolor: "#ffebee",
                    color: "#d32f2f",
                    width: 36,
                    height: 36,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#d32f2f",
                      color: "white",
                      transform: "scale(1.1)",
                      boxShadow: "0 4px 12px rgba(211, 47, 47, 0.4)",
                    },
                  }}
                >
                  <Trash2 size={18} />
                </IconButton>
              )} */}
            </Box>
          </TableCell>
        );

      case "actionsLoan":
        return (
          <TableCell align="center">
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              {onViewClick && (
                <CustomButton
                  btnLabel="查看詳情"
                  handlePressBtn={() => onViewClick(row)}
                  btnTextColor="#fff"
                  btnBgColor="#1976d2"
                  btnHoverColor="#1976d2"
                  btnTextSize="12px"
                  btnTextTransform="capitalize"
                  btnTextWeight="500"
                  borderRadius="15px"
                  btnBorder="none"
                  btnWidth="120px"
                  btnHeight="30px"
                  sx={{
                    "&:hover": {
                      bgcolor: "#1976d2",
                      color: "white",
                    },
                  }}
                />
              )}
            </Box>
          </TableCell>
        );

      default:
        return (
          <TableCell>
            <Typography
              fontSize="14px"
              sx={{ color: "#333", fontWeight: "500" }}
            >
              {row[val]}
            </Typography>
          </TableCell>
        );
    }
  };

  // Helper functions
  const getAvatarColor = (name) => {
    if (!name || name.length === 0) return "#9E9E9E";

    const colors = [
      "#1976D2",
      "#388E3C",
      "#D32F2F",
      "#7B1FA2",
      "#FF6F00",
      "#C2185B",
      "#303F9F",
      "#00796B",
    ];
    return colors[name.length % colors.length];
  };

  const getInitials = (name) => {
    if (!name || name.length === 0) return "?";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50";
      case "Inactive":
        return "#9E9E9E";
      case "Pending":
        return "#FF9800";
      default:
        return "#9E9E9E";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <TableContainer sx={tableStyle}>
        <Table sx={{ width: tableWidth || "100%" }}>
          <TableHead>
            <TableRow>
              {tableHeader?.map((header) => (
                <TableCell key={header.id} align={header.align || "center"}>
                  <Typography
                    fontWeight={500}
                    fontSize="13px"
                    py={1}
                    sx={{
                      color: "white",
                    }}
                  >
                    {header.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableData
            )?.map((row, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f0f8ff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {displayRows.map((val) => renderCell(row, val, index))}
              </TableRow>
            ))}
            {tableData?.length === 0 && (
              <TableRow>
                <TableCell colSpan={displayRows.length} align="center">
                  <Box sx={{ py: 4, textAlign: "center" }}>
                    <Typography fontSize="16px" sx={{ color: "#666", mb: 1 }}>
                      {isLoading ? "資料載入中..." : "沒有資料"}
                    </Typography>
                    <Typography fontSize="14px" sx={{ color: "#999" }}>
                      {isLoading
                        ? "正在載入資料，請稍候"
                        : "請新增資料以開始使用"}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="每頁筆數"
          sx={{
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontWeight: "500",
                color: "#666",
              },
          }}
        />
      )}
    </div>
  );
}
