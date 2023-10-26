import { createTheme } from "@mui/material";

export const zooTheme = createTheme({
  palette: {
    primary: {
      main: "#A1CA42",
    },
    secondary: {
      main: "#CCE875",
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          sx: {
            "&:not(.Mui-focused):not(.MuiFormLabel-filled)": {
              fontSize: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              left: "14px",
            },
            transition: ".2s",
          },
        },
        InputProps: {
          sx: {
            borderRadius: "18px",
          },
        },
        size: "small",
      },
    },
  },
});
