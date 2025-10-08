import React from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";

const LoadingState: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <Stack alignItems="center" spacing={2}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading posts...
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingState;