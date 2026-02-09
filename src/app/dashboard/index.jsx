import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ use this in v7
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  BanknoteX,
  CalendarCheck,
  CircleDollarSign,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { StatsCard } from "../../components/cards";
import { getDashboard } from "../../api/Modules/dashboard";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ApexBarChart from "./barChart";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboard();
      if ([200, 201].includes(response?.status)) {
        setDashboardData(response.data.data);
      } else {
        enqueueSnackbar(
          response?.data?.message || "儀表板資料取得失敗",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "儀表板資料取得失敗",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: "貸款總額",
      value: dashboardData?.totalLoansAmount || 0,
      subtitle: "已核發的貸款總額",
      icon: <Banknote />,
    },
    {
      title: "已撥款貸款",
      value: dashboardData?.totalBursedAmount || 0,
      subtitle: "已撥款但待結案的貸款數",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "本月回收金額",
      value: dashboardData?.currentMonthRepayments || 0,
      subtitle: "本月應收回款金額",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "待處理貸款",
      value: dashboardData?.pendingLoans || 0,
      subtitle: "待審核貸款筆數",
      icon: <BanknoteArrowDown />,
    },
    {
      title: "已拒絕貸款",
      value: dashboardData?.rejectedLoans || 0,
      subtitle: "已拒件的貸款筆數",
      icon: <BanknoteX />,
    },
    {
      title: "使用者數",
      value: dashboardData?.totalUsers || 0,
      subtitle: "系統使用者總數",
      icon: <Users />,
    },
    {
      title: "活躍使用者",
      value: dashboardData?.activeUsers || 0,
      subtitle: "活躍使用者數量",
      icon: <UserCheck />,
    },
    {
      title: "非活躍使用者",
      value: dashboardData?.inactiveUsers || 0,
      subtitle: "未活躍使用者數量",
      icon: <UserX />,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
      >
        儀表板
      </Typography>

      <Grid container spacing={1}>
        {dashboardStats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard {...stat} isLoading={loading} />
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2, mt: 2 }}>
        {dashboardData?.barChartData && (
          <ApexBarChart barChartData={dashboardData?.barChartData} />
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
