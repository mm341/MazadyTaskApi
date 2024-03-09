import { CategoriesSliceModel } from "@/models/CategoriesSliceModal";
import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import PublicRequest from "@/utils/PublicRequests";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// GetAllAddons
export const GetAllCategories = createAsyncThunk(
  "categories/GetAllCategories",
  (payload) =>
    PublicRequest.getData("get_all_cats")
      .then((res: any) => {
        if (res) {
          return res;
        }
      })
      .catch((err) => PublicHandelingErrors.onErrorResponse(err))
);

// GetAllCategoryProperties
export const GetAllCategoryProperties = createAsyncThunk(
  "categories/GetAllCategoryProperties",
  (payload: {id: number}) =>
      PublicRequest.getData(`properties?cat=${payload?.id}`)
          .then((res: any) => {
              if (res) {
                  return res;
              }
          })
          .catch(err => PublicHandelingErrors.onErrorResponse(err)),
);

// AddAddon
// export const AddAddon = createAsyncThunk(
//     "addons/AddAddon",
//     (payload: AddonDto) =>
//         PublicRequest.postData(payload, `pos/addons`)
//             .then((res: any) => {
//                 if (res) {
//                     toast.success(res?.message);
//                     return res;
//                 }
//             })
//             .catch(err => PublicHandelingErrors.onErrorResponse(err)),
// );

const initialState: CategoriesSliceModel = {
  isloading: false,
  categories: [],
  catProperties:[],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  GetAllCategories
    builder.addCase(GetAllCategories.pending, (state: CategoriesSliceModel) => {
      state.isloading = true;
      state.categories = [];
    });
    builder.addCase(
      GetAllCategories.fulfilled,
      (state: CategoriesSliceModel, { payload }: any) => {
        
        state.isloading = false;
        state.categories = payload.data.categories;
      }
    );
    builder.addCase(
      GetAllCategories.rejected,
      (state: CategoriesSliceModel) => {
        state.isloading = false;
        state.categories = [];
      }
    );



     //  GetAllCategories
     builder.addCase(GetAllCategoryProperties.pending, (state: CategoriesSliceModel) => {
      state.isloading = true;
      state.catProperties = [];
    });
    builder.addCase(
      GetAllCategoryProperties.fulfilled,
      (state: CategoriesSliceModel, { payload }: any) => {
        
        state.isloading = false;
        state.catProperties = payload.data;
      }
    );
    builder.addCase(
      GetAllCategoryProperties.rejected,
      (state: CategoriesSliceModel) => {
        state.isloading = false;
        state.catProperties = [];
      }
    );
  },
});

export const categoriesReducer = categoriesSlice.reducer;
