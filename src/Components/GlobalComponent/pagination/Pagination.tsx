import React from "react";
import { Box, Pagination, Stack } from "@mui/material";

export default function CustomePagination({
  total_size,
  page_limit,
  offset,
  setOffset,
}: {
  total_size: Number|any;
  page_limit:  Number|any;
  offset:  Number|any;
  setOffset: (e:  Number|any) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingBlockStart: "25px",
      }}
      //padding={{xs:"10px 0px 0px 0px",md:'30px 0px 20px 0px'}}
    >
      <Pagination
        count={Math.ceil(total_size / page_limit)}
        onChange={(e, value) => {
          setOffset(value);
          window.scrollTo(0, 0);
        }}
        page={offset}
      />
    </Box>
  );
}
