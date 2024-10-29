import { createProvinceApi, deleteProvinceApi, getProvinceApi, updateProvinceApi, getSearchProvincesApi } from "@/lib/api/provinceApi";
import { Province } from "@/lib/types/addressType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProvinceState {
    province: Province | null;
    provinces: Province[];
    searchResult: Province[];
    loading: boolean;
    error: string | null;
    code: number
}

const initialState: ProvinceState = {
    province: null,
    provinces: [],
    searchResult: [],
    loading: false,
    error: null,
    code: 0
};


export const getProvinces = createAsyncThunk<Province>(
    'province/getProvinces',
    async () => {
        const response = await getProvinceApi();
        return response;
    }
);

export const getSearchProvince = createAsyncThunk<{ data: Province[], code:number }, { name: string }>(
    'province/getSearchProvince',
    async ({name}) => {
        const response = await getSearchProvincesApi(name);
        return response;
    }
);

export const createProvince = createAsyncThunk<Province, { formData: FormData }>(
    'province/createProvince',
    async ({ formData }) => {
        const response = await createProvinceApi(formData);
        return response;
    }
);

export const updateProvince = createAsyncThunk<Province, { formData: FormData, id: number }>(
    'province/updateProvince',
    async ({ id, formData }) => {
        const response = await updateProvinceApi(id, formData);
        return response;
    }
);

export const deleteProvince = createAsyncThunk<Province, { id: number }>(
    'province/deleteProvince',
    async ({ id }) => {
        const response = await deleteProvinceApi(id);
        return response;
    }
);


const provinceSlice = createSlice({
    name: 'province',
    initialState,
    reducers: {
        resetProvince: (state) => {
            state.province = null;
            state.provinces = [];
            state.searchResult=[];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProvinces.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProvinces.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.provinces = action.payload.data;
            })
            .addCase(getProvinces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch provinces';
            })
            .addCase(getSearchProvince.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchProvince.fulfilled, (state, action: PayloadAction<{ data: Province[], code:number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.searchResult = [...state.searchResult, ...action.payload.data];
            })
            .addCase(getSearchProvince.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search articles';
            })
            .addCase(createProvince.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProvince.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.provinces.push(action.payload.data);
            })
            .addCase(createProvince.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create province';
            })
            .addCase(updateProvince.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProvince.fulfilled, (state, action:  PayloadAction<any>) => {
                state.loading = false;
                const province = { ...state.provinces, ...action.payload.data };
                state.provinces = state.provinces.map((p) => (p.id === province.id ? province : p));
            })
            .addCase(updateProvince.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update province';
            })
            .addCase(deleteProvince.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProvince.fulfilled, (state, action) => {
                state.loading = false;
                state.provinces = state.provinces.filter((province) => province.id !== action.meta.arg.id);
            })
            .addCase(deleteProvince.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete province';
            });
    },
});

export const { resetProvince } = provinceSlice.actions;

export const selectProvince = (state: RootState) => state.province;
export const selectLoading = (state: RootState) => state.province.loading;
export const selectError = (state: RootState) => state.province.error;

export default provinceSlice.reducer;