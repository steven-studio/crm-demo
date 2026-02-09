import * as React from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Typography,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Save,
  Home,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "../routes";

const drawerWidth = 240;

export default function MainLayout({ children }) {
  const menuItemStyles = {
    borderRadius: 2,
    my: 0.5,
    px: 2,
    color: "text.primary",
    "&:hover": {
      bgcolor: "primary.light",
      color: "primary.contrastText",
    },
    transition: "all 0.3s ease",
  };

  const logoutItemStyles = {
    ...menuItemStyles,
    color: "error.main",
    "&:hover": {
      bgcolor: "error.light",
      color: "error.contrastText",
    },
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate("/login");
    handleClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const isRouteActive = (routePath) => {
    // Handle exact matches
    if (location.pathname === routePath) return true;

    // Handle root path special case
    if (routePath === "/" && location.pathname === "/") return true;

    // Handle nested routes (e.g., if we're on /users/123, /users should be active)
    if (routePath !== "/" && location.pathname.startsWith(routePath))
      return true;

    // Handle wildcard routes
    if (routePath.includes("*")) {
      const basePath = routePath.split("*")[0];
      if (location.pathname.startsWith(basePath)) return true;
    }

    return false;
  };

  const drawerContent = (
    <Box pt={2} px={0.5} overflow={"auto"}>
      <Toolbar />

      <List>
        {ADMIN_ROUTES.map((route) => {
          if (route.isHideMenu) return null;
          if (route.name === "") return null;

          const isActive = isRouteActive(route.path);

          return (
            <ListItem key={route.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(route.path)}
                sx={{
                  backgroundColor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  borderRadius: "8px",
                  py: 1,
                  "&:hover": {
                    backgroundColor: isActive ? "primary.dark" : "action.hover",
                    transform: "translateX(4px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  {isActive ? route.activeIcon : route.inActiveIcon}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight: isActive ? 500 : 400,
                      fontSize: "14px",
                      color: isActive ? "white" : "text.primary",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #E1E7EF",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            minHeight: "70px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            sx={{ width: "30%", justifyContent: "flex-start" }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ color: "#000" }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 1 : 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                }}
              >
                案件管理儀表板
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            <Avatar
              sx={{
                cursor: "pointer",
                width: 40,
                height: 40,
                border: "2px solid #e2e8f0",
                "&:hover": {
                  border: "2px solid #3b82f6",
                },
              }}
            >
              <User size={20} />
            </Avatar>

            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              管理員
            </Typography>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                minWidth: 220,
                boxShadow:
                  "0px 10px 20px rgba(0, 0, 0, 0.12), 0px 3px 6px rgba(0, 0, 0, 0.08)",
                bgcolor: "background.paper",
                p: 1,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleNavigation("/settings");
                handleClose();
              }}
              sx={menuItemStyles}
            >
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              設定
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem onClick={handleLogout} sx={logoutItemStyles}>
              <ListItemIcon>
                <LogOut fontSize="small" />
              </ListItemIcon>
              登出
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              borderRight: "1px solid #E1E7EF",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#fff",
              borderRight: "1px solid #E1E7EF",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          backgroundColor: "#F8FAFC",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Toolbar sx={{ minHeight: "70px" }} />
        {children}
      </Box>
    </Box>
  );
}
