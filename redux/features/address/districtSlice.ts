import { createDistrictApi, deleteDistrictApi, getDistrictApi, updateDistrictApi, getSearchDistrictsApi } from "@/lib/api/districtApi";
import { District } from "@/lib/types/addressType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DistrictState {
    district: District | null;
    districts: District[];
    searchResult: District[];
    loading: boolean;
    error: string | null;
    code: number
}

const initialState: DistrictState = {
    district: null,
    districts: [],
    searchResult: [],
    loading: false,
    error: null,
    code: 0
};


export const getDistricts = createAsyncThunk<District, {provCode:number}>(
    'district/getDistricts',
    async ({provCode}) => {
        const response = await getDistrictApi(provCode);
        return response;
    }
);

export const getSearchDistrict = createAsyncThunk<{data:District[], code:number}, {provCode:number, name:string}>(
    'district/getSearchDistrict',
    async ({provCode, name}) => {
        const response = await getSearchDistrictsApi(provCode, name);
        return response;
    }
);

export const createDistrict = createAsyncThunk<District, {provCode:number, formData: FormData }>(
    'district/createDistrict',
    async ({ provCode, formData }) => {
        const response = await createDistrictApi(provCode, formData);
        return response;
    }
);

export const updateDistrict = createAsyncThunk<District, {provCode:number,  formData: FormData, id: number }>(
    'district/updateDistrict',
    async ({ provCode, id, formData}) => {
        const response = await updateDistrictApi(provCode, id, formData);
        return response;
    }
);

export const deleteDistrict = createAsyncThunk<District, {provCode:number, id: number }>(
    'district/deleteDistrict',
    async ({ provCode, id }) => {
        const response = await deleteDistrictApi(provCode,id);
        return response;
    }
);


const districtSlice = createSlice({
    name: 'district',
    initialState,
    reducers: {
        resetDistrict: (state) => {
            state.district = null;
            state.districts = [];
            state.searchResult = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDistricts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDistricts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.districts = action.payload.data;
            })
            .addCase(getDistricts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch districts';
            })
            .addCase(getSearchDistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchDistrict.fulfilled, (state, action: PayloadAction<{ data: District[], code:number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.searchResult = [...state.searchResult, ...action.payload.data];
            })
            .addCase(getSearchDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search districts';
            })
            .addCase(createDistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDistrict.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.districts.push(action.payload.data);
            })
            .addCase(createDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create district';
            })
            .addCase(updateDistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateDistrict.fulfilled, (state, action:  PayloadAction<any>) => {
                state.loading = false;
                const district = { ...state.districts, ...action.payload.data };
                state.districts = state.districts.map((d) => (d.id === district.id ? district : d));
            })
            .addCase(updateDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update district';
            })
            .addCase(deleteDistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDistrict.fulfilled, (state, action) => {
                state.loading = false;
                state.districts = state.districts.filter((district) => district.id !== action.meta.arg.id);
            })
            .addCase(deleteDistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete district';
            });
    },
});


export const { resetDistrict } = districtSlice.actions;

export const selectDistrict = (state: RootState) => state.district;
export const selectLoading = (state: RootState) => state.district.loading;
export const selectError = (state: RootState) => state.district.error;

export default districtSlice.reducer;