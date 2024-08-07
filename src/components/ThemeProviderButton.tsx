import React from "react";
import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

interface ThemeProviderButtonProps {
  toggleTheme: () => void;
}

const ThemeProviderButton: React.FC<ThemeProviderButtonProps> = ({
  toggleTheme,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          backgroundColor: "background.paper",
          "&:hover": {
            backgroundColor: "background.default",
          },
          boxShadow: 3,
        }}
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeProviderButton;
