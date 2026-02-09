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
          response?.data?.message || "總覽資料取得失敗",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "總覽資料取得失敗",
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
      title: "成交金額",
      value: dashboardData?.totalLoansAmount || 0,
      subtitle: "已成交案件的總金額",
      icon: <Banknote />,
    },
    {
      title: "進行中案件",
      value: dashboardData?.totalBursedAmount || 0,
      subtitle: "已成立但尚未結案的案件",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "本月回款",
      value: dashboardData?.currentMonthRepayments || 0,
      subtitle: "本月回款金額",
      icon: <BanknoteArrowUp />,
    },
    {
      title: "待處理案件",
      value: dashboardData?.pendingLoans || 0,
      subtitle: "待審核／待跟進的案件數",
      icon: <BanknoteArrowDown />,
    },
    {
      title: "拒絕案件",
      value: dashboardData?.rejectedLoans || 0,
      subtitle: "已拒絕的案件數",
      icon: <BanknoteX />,
    },
    {
      title: "客戶總數",
      value: dashboardData?.totalUsers || 0,
      subtitle: "客戶總數",
      icon: <Users />,
    },
    {
      title: "活躍客戶",
      value: dashboardData?.activeUsers || 0,
      subtitle: "近 N 日有互動的客戶數",
      icon: <UserCheck />,
    },
    {
      title: "非活躍客戶",
      value: dashboardData?.inactiveUsers || 0,
      subtitle: "近 N 日無互動的客戶數",
      icon: <UserX />,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 4, fontWeight: "bold", color: "text.primary" }}
      >
        總覽
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
