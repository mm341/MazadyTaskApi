import {
  GetAllCategories,
  GetAllCategoryProperties,
} from "@/redux/slices/CategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { z } from "zod";

export default function Home() {
  //  hooks
  const dispatch = useAppDispatch();
  const [categOryId, setCategoryId] = useState<number>(1);
  //  selectors
  const { categories, catProperties } = useAppSelector(
    (state) => state.categories
  );
  const [subcategOryId, setSubCategoryId] = useState<number>(
    categories[0]?.children[0]?.id
  );

  //  call api to get all categories

  useEffect(() => {
    dispatch(GetAllCategories());
  }, []);
  useEffect(() => {
    if (subcategOryId) {
      dispatch(GetAllCategoryProperties({ id: subcategOryId }));
    }
  }, [subcategOryId]);

  let childs: Category[] = categories?.filter((e) => e.id === categOryId);

  return (
    <>
      <CssBaseline />
      <Container>
        <GlobalDisplayFlexBox sx={{ width: "60%", mx: "auto" }} as="form">
          <GlobalDisplayFlexColumnBox sx={{ width: "100%" }} gap="15px">
            {/*  categories input */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categOryId}
                label="Categories"
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category?.id}>
                    {category?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* sub categories input */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sub Categories
              </InputLabel>
              <Select
                sx={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcategOryId}
                label="Sub Categories"
                onChange={(e) => setSubCategoryId(Number(e.target.value))}
              >
                {childs?.length > 0 &&
                  childs[0]?.children?.map((category, index) => (
                    <MenuItem key={index} value={category?.id}>
                      {category?.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* options */}
            {catProperties?.map((e, i) => (
              <FormControl key={i} fullWidth>
                <InputLabel id="demo-simple-select-label">{e.name}</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={subcategOryId}
                  label={e?.name}
                  // onChange={(e) => setSubCategoryId(Number(e.target.value))}
                >
                  {e?.options?.length > 0 &&
                    e?.options?.map((el, index) => (
                      <>
                        <MenuItem key={index} value={el?.id}>
                          {el?.name}
                        </MenuItem>
                      </>
                    ))}
                  <MenuItem value={"other"}>{"Other"}</MenuItem>
                </Select>
              </FormControl>
            ))}
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexBox>
      </Container>
    </>
  );
}
