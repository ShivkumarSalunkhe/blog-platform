import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface LoadingSpinnerProps {
  size?: number;
  thickness?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  thickness = 4,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
};

export default LoadingSpinner;
