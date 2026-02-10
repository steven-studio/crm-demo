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
    { id: "id", title: "客戶編號", align: "left" },
    { id: "name", title: "客戶名稱", align: "left" },
    { id: "taxId", title: "客戶統編", align: "left" },
    { id: "owner", title: "業務窗口", align: "left" },
    { id: "phone", title: "客戶電話", align: "left" },
    { id: "contactPerson", title: "聯絡人", align: "left" },
    { id: "address", title: "地址", align: "left" },
  ];

  // Updated columns to display
  const displayRows = [
    "id",
    "name",
    "taxId",
    "owner",
    "phone",
    "contactPerson",
    "address",
  ];

  const fetchAllUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers();
      if (response.status === 200 || response.status === 201) {
        console.log("response.data.data", response.data.data);
        // Transform API data to match table structure
        const transformedData = response.data.data.map((user, index) => ({
          ...user,

          id: index + 1,
          _id: user._id,

          customerInfo: user.fullName || user.name || "無資料",   // ✅ 對齊 table
          phone: user.phoneNumber || user.contactNumber || "無資料",
          address: user.address || "無資料",

          source: user.source || "-",                             // ✅ 先佔位
          lastInteraction: user.lastInteraction || user.updatedAt || "-", // ✅ 沒有就用 updatedAt

          status: user.status ? "Active" : "Inactive",
          createdAt: user.createdAt || "-",
        }));
        setUsersData(transformedData);
        console.log("Users fetched successfully:", transformedData);
      } else {
        console.error("Failed to fetch users:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      enqueueSnackbar("取得客戶資料失敗，請稍後再試。", {
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
          客戶管理
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          在這裡管理所有客戶
        </Typography>
      </Box>

      {/* Simple Table */}
      <Paper elevation={1} sx={{ borderRadius: "8px" }}>
        <DynamicTable
          tableWidth={"100%"}
          tableHeader={tableHeaders}
          tableData={usersData}
          displayRows={displayRows}
          showPagination={true}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
