import {
  GetAllCategories,
  GetAllCategoryProperties,
} from "@/redux/slices/CategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Autocomplete,
  AutocompleteFreeSoloValueMapping,
  AutocompleteValue,
  Box,
  Button,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
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
  //  selectors
  const { categories, catProperties } = useAppSelector(
    (state) => state.categories
  );

  interface SubmittedData {
    Category: string;
    "Sub Category": string | undefined;
    Options: { PropertyName: string; option: string }[];
  }
  let object: SubmittedData = { Category: "", "Sub Category": "", Options: [] };
  const [SubmittedData, setSubmittedData] = useState<SubmittedData>({
    Category: "",
    "Sub Category": "",
    Options: [],
  });
  //  validation on form with zod

  interface zod {
    categOryId: string;
    subcategOryId: string;
    options: { PropertyName: string; option: string }[];
  }

  const initivalue = () => {
    return {
      categOryId: "",
      subcategOryId: "",
      options: [],
    };
  };
  const { control, onSubmit, errors, reset, setValue, watch, getValues } =
    useZod<zod>(
      {
        categOryId: z.string(),
        subcategOryId: z.string(),
        options: z
          .array(
            z
              .object({
                PropertyName: z.string().optional(),
                option: z
                  .object({
                    name: z.string().optional().optional(),
                  })
                  .optional()
                  .or(z.string().optional()),
              })
              .optional()
          )
          .optional(),
      },
      initivalue(),
      (validatedData: {
        categOryId: string;
        subcategOryId: string;
        options: { PropertyName: string; option: string }[];
      }) => {
        object["Category"] = childs[0]?.name;
        object["Sub Category"] = childs[0]?.children?.filter(
          (e) => e?.id === Number(watch("subcategOryId"))
        )[0]?.name;
        object["Options"] = validatedData?.options;

        setSubmittedData(object);
      }
    );

  //  call api to get all categories

  useEffect(() => {
    dispatch(GetAllCategories());
  }, []);
  //  call api to get all properties
  useEffect(() => {
    if (watch("subcategOryId")) {
      dispatch(
        GetAllCategoryProperties({ id: Number(watch("subcategOryId")) })
      );
    }
  }, [watch("subcategOryId")]);

  var childs: Category[] = categories?.filter(
    (e) => e.id === Number(watch("categOryId"))
  );
  console.log(errors);
  return (
    <>
      <CssBaseline />
      <Container>
        <GlobalDisplayFlexColumnBox gap={"30px"}>
          {/*  form */}
          <GlobalDisplayFlexBox sx={{ width: "60%", mx: "auto" }} as="form">
            <GlobalDisplayFlexColumnBox sx={{ width: "100%" }} gap="15px">
              {/*  categories input */}

              {categories?.length > 0 && (
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
                          <MenuItem
                            key={index}
                            value={category?.id?.toString()}
                          >
                            {category?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
              {/* sub categories input */}

              {categories?.length > 0 && childs?.length > 0 && (
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
                            <MenuItem
                              key={index}
                              value={category?.id?.toString()}
                            >
                              {category?.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}

              {/* options */}
              {categories?.length > 0 &&
                childs?.length > 0 &&
                catProperties?.length > 0 &&
                watch("subcategOryId") &&
                catProperties?.map((el, i) => (
                  <Controller
                    key={i}
                    name={`options[${i}]`}
                    control={control}
                    render={({ field }) => (
                      <Autocomplete<option, true, false, true>
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={el?.options}
                        fullWidth
                        getOptionLabel={(
                          option:
                            | option
                            | AutocompleteFreeSoloValueMapping<true>
                        ) => (option as option)?.name}
                        freeSolo
                        onChange={(
                          _: SyntheticEvent,

                          value: AutocompleteValue<option, true, false, true>
                        ) => {
                          setValue(`options[${i}]`, {
                            PropertyName: el?.name,
                            option: value,
                          });
                        }}
                        value={getValues(`options[${i}]`)}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e) => {
                              setValue(`options[${i}]`, {
                                PropertyName: el?.name,
                                option: e?.target.value,
                              });
                            }}
                            variant="outlined"
                            {...params}
                            id="options"
                            label={el?.name}
                          />
                        )}
                      />
                    )}
                  />
                ))}

              <Button onClick={onSubmit}>Submit</Button>
            </GlobalDisplayFlexColumnBox>
          </GlobalDisplayFlexBox>

          {/*  table of data */}

          {Object.values(SubmittedData)?.length > 0 && (
            <TableContainer
              sx={{
                marginTop: "20px",
                backgroundColor: "white",
                maxHeight: 700,
                minHeight: 100,
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {Object.keys(SubmittedData)?.map(
                      (header: string, i: any) => (
                        <TableCell key={`h-${i}`}>
                          {header?.toUpperCase()}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/*Rows*/}

                  <TableRow>
                    <TableCell>{SubmittedData?.Category}</TableCell>
                    <TableCell>{SubmittedData["Sub Category"]}</TableCell>
                    <TableCell>
                      <GlobalDisplayFlexColumnBox gap={"10px"}>
                        {SubmittedData?.Options?.map((e: any, i: number) => (
                          <GlobalDisplayFlexBox key={i}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {(e?.option?.name || e?.option) &&
                                e?.PropertyName &&
                                e?.PropertyName}
                            </Typography>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {e?.option?.name ?? e?.option}
                            </Typography>
                          </GlobalDisplayFlexBox>
                        ))}
                      </GlobalDisplayFlexColumnBox>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </GlobalDisplayFlexColumnBox>
      </Container>
    </>
  );
}
