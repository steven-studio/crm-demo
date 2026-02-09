import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F3C88",
      maintwo: "#34A853",
      text: "#67768B",
      light: "#1F3C88AD",
      dark: "#1F3C88",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6a1b9a",
      light: "#868E96",
      dark: "#38006b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fff",
      paper: "#ffffff",
    },
    gradient: {
      primary: "linear-gradient(to right, #1F3C88, #1F3C88AD)",
      secondary: "linear-gradient(90deg, #1F3C88 0%, #6a1b9a 100%)",
      card: "linear-gradient(135deg, rgba(150, 13, 177, 0.82) 0%, rgba(197, 8, 197, 0.81) 100%)",
      auth: "linear-gradient(135deg, #374061 0%,#324596 100%)",
    },
    text: {
      primary: "#000000",
      secondary: "#67768B",
      disabled: "#9E9E9E",
      white: "#ffffff",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: 48,
      fontWeight: 700,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    h4: {
      fontSize: 28,
      fontWeight: 600,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    h5: {
      fontSize: 24,
      fontWeight: 600,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: "#000000",
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      color: "#67768B",
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      fontSize: 16,
      fontWeight: 500,
      color: "#ffffff",
      fontFamily: '"Poppins", sans-serif',
      textTransform: "none",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: "all 0.3s ease",
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background:
              "linear-gradient(135deg, rgba(150, 13, 177, 0.82) 0%, rgba(197, 8, 197, 0.81) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 400,
          fontFamily: '"Poppins", sans-serif',
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: {
            background: "linear-gradient(90deg, #1F3C88, #6a1b9a)",
            color: "#ffffff",
            padding: "12px",
            fontSize: "16px",
            "&:hover": {
              background: "linear-gradient(90deg, #6a1b9a, #1F3C88)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "authbutton" },
          style: {
            background: "linear-gradient(90deg, #1F3C88 0%, #1F3C88AD 100%)",
            color: "#fff",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #eee",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(90deg, #1F3C88 0%, #1F3C88AD 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "socail" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            padding: "5px 26px",
            color: "#ffffff",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          },
        },
        {
          props: { variant: "webbutton" },
          style: {
            background: "#1F3C88",
            color: "#ffffff",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "12px",
            fontWeight: 500,
            "&:hover": {
              background: "#1F3C88",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "errorbtn" },
          style: {
            background: "linear-gradient(to top, #FDA1A1, #FF0000)",
            color: "#ffff",
            padding: "30px 30px",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: 500,
            "&:hover": {
              background: "linear-gradient(to top, #FDA1A1, #FF0000)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            },
          },
        },
        {
          props: { variant: "customGrey" },
          style: {
            backgroundColor: "#F8FAFC",
            fontSize: 12,
            height: 34,
            width: 80,
            textTransform: "none",
            border: "1px solid",
            borderColor: "#E5E7EB",
            color: "#374151",
            "&:hover": {
              backgroundColor: "#f1f5f9",
            },
          },
        },
        {
          props: { variant: "customOutlined" },
          style: {
            backgroundColor: "#F8FAFC",
            fontSize: 12,
            height: 34,
            width: 150,
            textTransform: "none",
            border: "1px solid",
            borderColor: "#1F3C88",
            color: "#1F3C88",
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.1)",
        },
        bar: {
          borderRadius: 4,
          background: "linear-gradient(90deg, #1F3C88 0%, #1F3C88AD 100%)",
        },
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: "authBox" },
          style: {
            backgroundColor: "#f4f4f4",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      variants: [
        {
          props: { variant: "softInput" },
          style: {
            backgroundColor: "#eaf3eb",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "15px",
              background: "#eaf3eb",
              "& fieldset": {
                borderColor: "transparent",
                borderRadius: "15px",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
                borderRadius: "15px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffff",
                borderRadius: "15px",
              },
            },
            "& .MuiInputBase-input": {
              padding: "10px 14px",
              borderRadius: "15px",
            },
          },
        },
        {
          props: { variant: "customInput" },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "15px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", sans-serif',
        },
      },
    },
  },
});

export default theme;
