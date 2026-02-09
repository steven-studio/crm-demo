import {
  CreditCard,
  FileText,
  History,
  LayoutDashboard,
  Settings,
  Users,
  HandCoins,
  TableOfContents,
  Handshake,
  ShieldCheck,
  ShieldHalf,
} from "lucide-react";
import Login from "../app/auth/login";
import ForgotPassword from "../app/auth/forgotPassword";
import OTPVerification from "../app/auth/otpVerification";
import SetNewPassword from "../app/auth/setNewPassword";
import Dashboard from "../app/dashboard";
import UsersManagement from "../app/users";
import CaseManagement from "../app/caseManagement";
import SettingsManagement from "../app/settings";
import CaseDetails from "../app/caseManagement/caseDetail";
import Userhistory from "../app/users/history";
import FaqPage from "../app/faq";
import TermsPage from "../app/terms";
import PrivacyPage from "../app/privacy";
import AccountNumberPage from "../app/accountNumber";
const AUTH_ROUTES = [
  {
    id: 1,
    name: "登入",
    component: <Login />,
    exact: "exact",
    path: "login",
  },
  {
    id: 2,
    name: "忘記密碼",
    component: <ForgotPassword />,
    exact: "exact",
    path: "forgot-password",
  },
  {
    id: 3,
    name: "驗證碼確認",
    component: <OTPVerification />,
    exact: "exact",
    path: "otp-verification",
  },
  {
    id: 4,
    name: "重設密碼",
    component: <SetNewPassword />,
    exact: "exact",
    path: "set-new-password",
  },
];

const ADMIN_ROUTES = [
  {
    id: 1,
    name: "總覽",
    component: <Dashboard />,
    exact: "exact",
    path: "/",
    activeIcon: <LayoutDashboard size={20} color="#ffffff" />,
    inActiveIcon: <LayoutDashboard size={20} color="#64748b" />,
  },

  {
    id: 2,
    name: "客戶管理",
    component: <UsersManagement />,
    exact: "exact",
    path: "/users",
    activeIcon: <Users size={20} color="#ffffff" />,
    inActiveIcon: <Users size={20} color="#64748b" />,
  },
  {
    id: 3,
    name: "案件管理",
    component: <CaseManagement />,
    exact: "exact",
    path: "/case-management",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
  },
  {
    id: 4,
    name: "收款設定",
    component: <AccountNumberPage />,
    exact: "exact",
    path: "/account-number",
    activeIcon: <ShieldHalf size={20} color="#ffffff" />,
    inActiveIcon: <ShieldHalf size={20} color="#64748b" />,
  },
  {
    id: 5,
    name: "常見問題",
    component: <FaqPage />,
    exact: "exact",
    path: "/faq",
    activeIcon: <TableOfContents size={20} color="#ffffff" />,
    inActiveIcon: <TableOfContents size={20} color="#64748b" />,
  },
  // {
  //   id: 6,
  //   name: "服務條款",
  //   component: <TermsPage />,
  //   exact: "exact",
  //   path: "/terms-conditions",
  //   activeIcon: <Handshake size={20} color="#ffffff" />,
  //   inActiveIcon: <Handshake size={20} color="#64748b" />,
  // },
  // {
  //   id: 7,
  //   name: "隱私政策",
  //   component: <PrivacyPage />,
  //   exact: "exact",
  //   path: "/privacy-policy",
  //   activeIcon: <ShieldCheck size={20} color="#ffffff" />,
  //   inActiveIcon: <ShieldCheck size={20} color="#64748b" />,
  // },
  {
    id: 8,
    name: "系統設定",
    component: <SettingsManagement />,
    exact: "exact",
    path: "/settings",
    activeIcon: <Settings size={20} color="#ffffff" />,
    inActiveIcon: <Settings size={20} color="#64748b" />,
  },
  {
    id: 9,
    name: "案件詳情",
    component: <CaseDetails />,
    exact: "exact",
    path: "/case-detail/:id/user/:userId",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
    isHideMenu: true,
  },
  {
    id: 10,
    name: "客戶歷程",
    component: <Userhistory />,
    exact: "exact",
    path: "/user-history/:id",
    activeIcon: <HandCoins size={20} color="#ffffff" />,
    inActiveIcon: <HandCoins size={20} color="#64748b" />,
    isHideMenu: true,
  },
];

export { ADMIN_ROUTES, AUTH_ROUTES };
