import { createSubdistrictApi, deleteSubdistrictApi, updateSubdistrictApi, getSearchSubDistrictsApi, getSubDistrictsApi  } from "@/lib/api/subdistrictApi";
import { SubDistrict } from "@/lib/types/addressType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubdistrictState {
    subdistrict: SubDistrict | null;
    subdistricts: SubDistrict[];
    searchResult: SubDistrict[];
    loading: boolean;
    error: string | null;
    code: number
}

const initialState: SubdistrictState = {
    subdistrict: null,
    subdistricts: [],
    searchResult: [],
    loading: false,
    error: null,
    code: 0
};


export const getSubdistricts = createAsyncThunk<SubDistrict, {distCode:number}>(
    'subdistrict/getSubdistricts',
    async ({distCode}) => {
        const response = await getSubDistrictsApi(distCode);
        return response;
    }
);

export const getSearchSubdistricts = createAsyncThunk<{data:SubDistrict[], code:number}, {distCode:number, name:string}>(
    'subdistrict/getSearchSubdistricts',
    async ({distCode, name}) => {
        const response = await getSearchSubDistrictsApi(distCode, name);
        return response;
    }
);

export const createSubdistrict = createAsyncThunk<SubDistrict, {distCode:number, formData: FormData }>(
    'subdistrict/createSubdistrict',
    async ({ distCode, formData }) => {
        const response = await createSubdistrictApi(distCode, formData);
        return response;
    }
);

export const updateSubdistrict = createAsyncThunk<SubDistrict, {distCode:number,  formData: FormData, id: number }>(
    'subdistrict/updateSubdistrict',
    async ({ distCode, id, formData}) => {
        const response = await updateSubdistrictApi(distCode, id, formData);
        return response;
    }
);

export const deleteSubdistrict = createAsyncThunk<SubDistrict, {distCode:number, id: number }>(
    'subdistrict/deleteSubdistrict',
    async ({ distCode, id }) => {
        const response = await deleteSubdistrictApi(distCode,id);
        return response;
    }
);


const subdistrictSlice = createSlice({
    name: 'subdistrict',
    initialState,
    reducers: {
        resetSubistrict: (state) => {
            state.subdistrict = null;
            state.subdistricts = [];
            state.searchResult = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubdistricts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSubdistricts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.subdistricts = action.payload.data;
            })
            .addCase(getSubdistricts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch subdistricts';
            })
            .addCase(getSearchSubdistricts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchSubdistricts.fulfilled, (state, action: PayloadAction<{ data: SubDistrict[], code:number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.searchResult = [...state.searchResult, ...action.payload.data];
            })
            .addCase(getSearchSubdistricts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search subdistricts';
            })
            .addCase(createSubdistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSubdistrict.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.subdistricts.push(action.payload.data);
            })
            .addCase(createSubdistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create subdistrict';
            })
            .addCase(updateSubdistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateSubdistrict.fulfilled, (state, action:  PayloadAction<any>) => {
                state.loading = false;
                const subdistrict = { ...state.subdistricts, ...action.payload.data };
                state.subdistricts = state.subdistricts.map((d) => (d.id === subdistrict.id ? subdistrict : d));
            })
            .addCase(updateSubdistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update subdistrict';
            })
            .addCase(deleteSubdistrict.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSubdistrict.fulfilled, (state, action) => {
                state.loading = false;
                state.subdistricts = state.subdistricts.filter((subdistrict) => subdistrict.id !== action.meta.arg.id);
            })
            .addCase(deleteSubdistrict.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete subdistrict';
            });
    },
});


export const { resetSubistrict } = subdistrictSlice.actions;

export const selectDistrict = (state: RootState) => state.subdistrict;
export const selectLoading = (state: RootState) => state.subdistrict.loading;
export const selectError = (state: RootState) => state.subdistrict.error;

export default subdistrictSlice.reducer;