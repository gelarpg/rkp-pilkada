
import { createVillageApi, deletePremiumVillageApi, deleteVillageApi, getPremiumVillagesApi, searchPremiumVillageApi, updatePremiumVillageApi, updateVillageApi, getSearchVillagesApi, getVillagesApi } from "@/lib/api/villageApi";
import { Village } from "@/lib/types/addressType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VillageState {
    village: Village | null;
    villages: Village[];
    villageSearch: Village[];
    loading: boolean;
    error: string | null;
    total_data: number;
    limit: number;
    page: number;
    hasMore: boolean;
    code: number;
}

const initialState: VillageState = {
    village: null,
    villages: [],
    villageSearch: [],
    loading: false,
    error: null,
    total_data: 0,
    limit: 4,
    page: 1,
    hasMore: true,
    code: 0,
};


export const getVillages = createAsyncThunk<Village, { subdistCode: number }>(
    'village/getVillages',
    async ({ subdistCode }) => {
        const response = await getVillagesApi(subdistCode);
        return response;
    }
);

export const getSearchVillages = createAsyncThunk<{ data: Village[], code: number }, { subdistCode: number, name: string }>(
    'village/getSearchVillages',
    async ({ subdistCode, name }) => {
        const response = await getSearchVillagesApi(subdistCode, name);
        return response;
    }
);

export const createVillage = createAsyncThunk<Village, { subdistCode: number, formData: FormData }>(
    'village/createVillage',
    async ({ subdistCode, formData }) => {
        const response = await createVillageApi(subdistCode, formData);
        return response;
    }
);

export const updateVillage = createAsyncThunk<Village, { subdistCode: number, formData: FormData, id: number }>(
    'village/updateVillage',
    async ({ subdistCode, id, formData }) => {
        const response = await updateVillageApi(subdistCode, id, formData);
        return response;
    }
);

export const deleteVillage = createAsyncThunk<Village, { subdistCode: number, id: number }>(
    'village/deleteVillage',
    async ({ subdistCode, id }) => {
        const response = await deleteVillageApi(subdistCode, id);
        return response;
    }
);


const villageSlice = createSlice({
    name: 'village',
    initialState,
    reducers: {
        resetVillage: (state) => {
            state.village = null;
            state.villages = [];
            state.villageSearch = [];
            state.loading = false
            state.error = null
            state.page = 1
            state.total_data = 0
            state.hasMore = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVillages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getVillages.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.villages = action.payload.data;
            })
            .addCase(getVillages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch villages';
            })
            .addCase(getSearchVillages.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchVillages.fulfilled, (state, action: PayloadAction<{ data: Village[], code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.villageSearch = [...state.villageSearch, ...action.payload.data];
            })
            .addCase(getSearchVillages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search village';
            })
            .addCase(createVillage.pending, (state) => {
                state.loading = true;
            })
            .addCase(createVillage.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.villages.push(action.payload.data);
            })
            .addCase(createVillage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create village';
            })
            .addCase(updateVillage.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateVillage.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const village = { ...state.villages, ...action.payload.data };
                state.villages = state.villages.map((d) => (d.id === village.id ? village : d));
            })
            .addCase(updateVillage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update village';
            })
            .addCase(deleteVillage.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteVillage.fulfilled, (state, action) => {
                state.loading = false;
                state.villages = state.villages.filter((village) => village.id !== action.meta.arg.id);
            })
            .addCase(deleteVillage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete village';
            })
    },
});


export const { resetVillage } = villageSlice.actions;

export const selectDistrict = (state: RootState) => state.village;
export const selectLoading = (state: RootState) => state.village.loading;
export const selectError = (state: RootState) => state.village.error;

export default villageSlice.reducer;