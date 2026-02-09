import { Box, Typography, Paper } from "@mui/material";
import DynamicTable from "../../components/dynamicTable";
import EditUserDialog from "./editUserDialog";
import { useState, useEffect } from "react";
import { getUsers } from "../../api/Modules/user";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {
  // State for edit dialog
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // State for users data from API
  const [usersData, setUsersData] = useState([]);

  // Notistack hook for notifications
  const { enqueueSnackbar } = useSnackbar();

  // Updated table headers for API data structure
  const tableHeaders = [
    { id: "id", title: "編號", align: "center" },
    { id: "userInfo", title: "使用者資訊", align: "left" },
    { id: "phone", title: "電話", align: "center" },
    { id: "completeAddress", title: "完整地址", align: "left" },
    { id: "interestRate", title: "利率", align: "center" },
    { id: "status", title: "狀態", align: "center" },
    { id: "createdAt", title: "加入日期", align: "center" },
    { id: "actions", title: "操作", align: "center" },
  ];

  // Updated columns to display
  const displayRows = [
    "id",
    "userInfo",
    "phone",
    "completeAddress",
    "interest",
    "status",
    "createdAt",
    "actions",
  ];

  const fetchAllUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers();
      if (response.status === 200 || response.status === 201) {
        console.log("response.data.data", response.data.data);
        // Transform API data to match table structure
        const transformedData = response.data.data.map((user, index) => ({
          id: index + 1, // Use index as display ID
          _id: user._id, // Keep original ID for operations
          name: user.fullName || user.name || "無資料",
          email: user.email,
          phone: user.phoneNumber || user.contactNumber || "無資料",
          address: user.address || "無資料",
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
          postalCode: user.postalCode || "",
          interest: `${user.interest}%`,
          loanLimit: `${user.loanLimit}`,
          emailVerified: user.emailVerified,
          status: user.status ? "Active" : "Inactive",
          createdAt: user.createdAt,
          // Include all original data for edit functionality
          ...user,
        }));
        setUsersData(transformedData);
        console.log("Users fetched successfully:", transformedData);
      } else {
        console.error("Failed to fetch users:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      enqueueSnackbar("取得使用者資料失敗，請稍後再試。", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Action handlers
  const handleView = (user) => {
    navigate(`/user-history/${user._id}`);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  // Status change handler
  const handleStatusChange = (userId, newStatus) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user._id === userId || user.id === userId
          ? { ...user, status: newStatus }
          : user
      )
    );
    console.log(`User ${userId} status changed to: ${newStatus}`);
  };

  return (
    <Box>
      {/* Simple Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "600" }}>
          使用者管理
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          在這裡管理所有使用者
        </Typography>
      </Box>

      {/* Simple Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={1200}
          tableHeader={tableHeaders}
          tableData={usersData}
          displayRows={displayRows}
          showPagination={true}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewClick={handleView}
          showDelete={true}
          onStatusChange={handleStatusChange}
          onView={handleView}
        />
      </Paper>

      {/* Edit User Dialog */}
      <EditUserDialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onRefresh={fetchAllUsers}
      />
    </Box>
  );
};

export default UsersManagement;
