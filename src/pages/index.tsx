import {
  GetAllCategories,
  GetAllCategoryProperties,
} from "@/redux/slices/CategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Button, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { z } from "zod";
import { useZod } from "@/Hooks/zod.hook";
import { Controller } from "react-hook-form";

export default function Home() {
  //  hooks
  const dispatch = useAppDispatch();
  const [categOryId, setCategoryId] = useState<string>("");
  //  validation on form with zod

  interface zod {
    categOryId: string;
    subcategOryId: string;
  }

  const initivalue = () => {
    return {
      categOryId: "",
      subcategOryId: "",
    };
  };
  const { control, onSubmit, errors, reset, setValue, watch, getValues } =
    useZod<zod>(
      {
        categOryId: z.string(),
        subcategOryId: z.string(),
      },
      initivalue(),
      (validatedData: { categOryId: string; subcategOryId: string }) => {
        console.log(validatedData);
      }
    );
  //  selectors
  const { categories, catProperties } = useAppSelector(
    (state) => state.categories
  );
  const [subcategOryId, setSubCategoryId] = useState<string>("");

  //  call api to get all categories

  useEffect(() => {
    dispatch(GetAllCategories());
  }, []);
  // useEffect(() => {
  //   if (subcategOryId) {
  //     dispatch(GetAllCategoryProperties({ id: Number(subcategOryId) }));
  //   }
  // }, [subcategOryId]);

  let childs: Category[] = categories?.filter(
    (e) => e.id === Number(getValues("subcategOryId"))
  );

  return (
    <>
      <CssBaseline />
      <Container>
        <GlobalDisplayFlexBox sx={{ width: "60%", mx: "auto" }} as="form">
          <GlobalDisplayFlexColumnBox sx={{ width: "100%" }} gap="15px">
            {/*  categories input */}

            <Controller
              name="categOryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categories
                  </InputLabel>
                  <Select
                    {...field}
                    sx={{ width: "100%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Categories"
                  >
                    {categories?.map((category, index) => (
                      <MenuItem key={index} value={category?.id}>
                        {category?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {/* sub categories input */}

            <Controller
              name="subcategOryId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Sub Categories
                  </InputLabel>
                  <Select
                    {...field}
                    sx={{ width: "100%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sub Categories"
                  >
                    {childs?.length > 0 &&
                      childs[0]?.children?.map((category, index) => (
                        <MenuItem key={index} value={category?.id}>
                          {category?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* options */}
            {/* {catProperties?.map((e, i) => (
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
            ))} */}

            <Button onClick={onSubmit}>Submit</Button>
          </GlobalDisplayFlexColumnBox>
        </GlobalDisplayFlexBox>
      </Container>
    </>
  );
}
