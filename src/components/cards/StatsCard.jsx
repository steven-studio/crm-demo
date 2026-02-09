import {
  Avatar,
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";

const useStyle = {
  card: {
    borderRadius: 2,
    height: "100%",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    },
  },
  cardContent: {
    p: 2,
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxContent: {
    minWidth: 0,
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    flexShrink: 0,
    bgcolor: "primary.main",
    color: "white",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "rotate(10deg) scale(1.1)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
  },
};

const StatsCard = ({ title, value, subtitle, icon, isLoading }) => {
  return (
    <Card sx={useStyle.card}>
      <CardContent sx={useStyle.cardContent}>
        <Box sx={useStyle.box}>
          {/* Left side content */}
          <Box sx={useStyle.boxContent}>
            <Typography
              fontSize={18}
              fontWeight={500}
              color="text.secondary"
              noWrap
            >
              {title}
            </Typography>

            {isLoading ? (
              <Skeleton variant="text" animation="wave" width={80} height={38} />
            ) : (
              <Typography fontSize={26} fontWeight={700}>
                {value}
              </Typography>
            )}
            <Typography
              fontSize={14}
              fontWeight={400}
              color="text.secondary"
              noWrap
            >
              {subtitle}
            </Typography>
          </Box>

          {/* Right side icon */}
          <Avatar sx={{ ...useStyle.avatar }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
