import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const CustomDivider = () => {
  //  hooks
  const theme = useTheme();
  const Sm = useMediaQuery(theme.breakpoints.down("md"));
  return (
    !Sm && (
      <Box
        sx={{
          width: "2px",
          height: "30px",
          background: theme.palette.background.default,
        }}
      ></Box>
    )
  );
};

export default CustomDivider;
