import { createTheme, responsiveFontSizes  } from "@mui/material/styles";


let theme = createTheme({
    palette: {
      primary: {
        main: "#3F59A3", // Blue color
        light: "#E6EDFF",
        dark: "#2C4280",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#FF8C00", // Pink color
        light: "#FFF9F2",
        dark: "#E67700",
        contrastText: "#ffffff",
      },
      error: {
        main: "#FF5252",
        light: "#FEEBEE",
        dark: "#C62828",
        contrastText: "#ffffff",
      },
      // warning: {
      //   main: '#00C53C',
      //   light: '#E9FFF0',
      //   dark: '#009D30',
      //   contrastText: '#ffffff',
      // },
  
      customBg: {
        white: "#FFFFFF", // Light version
        // main: "#d0e0ff",  // Main version
        // dark: "#90a4d4",  // Dark version
        secondary: "#F9FAFC",
        lightOrange: "#FFFCF8",
        lightBlue: "#F6F8FF",
        lightGreen: "#DEFFE8",
        contrastText: "#212121", // Text contrast
      },
  
      info: {
        main: "#3F59A3",
      },
      success: {
        main: "#00C53C",
        light: "#E9FFF0",
        dark: "#009D30",
        contrastText: "#ffffff",
      },
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
        secondary: "#A1A1A1",
      },
    },
  
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            borderRadius: "10px", // Set border radius
            border: "1px solid ", // Set border
            fontWeight: "bold", // Set font weight
            textTransform: "none", // Optional: Prevent text from being all uppercase
          },
          root: {
            textTransform: "none", // Disable uppercase transformation for all buttons
            borderRadius: "5px",
            fontWeight: "400",
          },
        },
      },
    },
  
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  theme = responsiveFontSizes(theme);

  export default theme;
