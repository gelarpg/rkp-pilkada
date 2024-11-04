
import { getResidentListApi, createResidentApi, updateResidentApi, deleteResidentApi, getResidentByTpsApi, searchResidentApi, getResidentIdApi } from "@/lib/api/residentApi";
import { Resident } from "@/lib/types/residentType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResidentState {
    resident: Resident | null;
    residents: Resident[];
    searchResult: Resident[];
    loading: boolean;
    message: any | null;
    error: string | null;
    code: number
    page: number;
    limit: number;
    hasMore: boolean;
    current_page: number;
    total_pages: number;
    total_data: number;
    per_page: number

}

const initialState: ResidentState = {
    resident: null,
    residents: [],
    searchResult: [],
    loading: false,
    message: null,
    error: null,
    code: 0,
    page: 1,
    limit: 10,
    hasMore: true,
    current_page: 0,
    total_pages: 0,
    total_data: 0,
    per_page: 0,

};

export const getResidentList = createAsyncThunk<{data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }, { villageCode: number, page: number, limit: number }>(
    'resident/getResidentList',
    async ({villageCode, page, limit}) => {
        const response = await getResidentListApi(villageCode, page, limit);
        return response;
    }
);

export const getResidentByTps = createAsyncThunk<{data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }, { tpsId: number, page: number, limit: number }>(
    'resident/getResidentByTps',
    async ({tpsId, page, limit}) => {
        const response = await getResidentByTpsApi(tpsId, page, limit);
        return response;
    }
);
export const getResidentId = createAsyncThunk<{data: Resident, code: number }, { id:number}>(
    'resident/getResidentId',
    async ({id}) => {
        const response = await getResidentIdApi(id);
        return response;
    }
);

export const searchResident = createAsyncThunk<{data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }, { tpsId: number, fullname:string, page: number, limit: number }>(
    'resident/searchResident',
    async ({tpsId, fullname, page, limit}) => {
        const response = await searchResidentApi(tpsId, fullname, page, limit);
        return response;
    }
);

export const createResident = createAsyncThunk<Resident, { formData: FormData }>(
    'resident/createResident',
    async ({ formData }) => {
        const response = await createResidentApi(formData);
        return response;
    }
);

export const updateResident = createAsyncThunk<Resident, { formData: FormData, id: number }>(
    'resident/updateResident',
    async ({ formData, id }) => {
        const response = await updateResidentApi(formData, id);
        return response;
    }
);

export const deleteResident = createAsyncThunk<Resident, { id: number }>(
    'resident/deleteResident',
    async ({ id }) => {
        const response = await deleteResidentApi(id);
        return response;
    }
);


const residentSlice = createSlice({
    name: 'resident',
    initialState,
    reducers: {
        resetResident: (state) => {
            state.resident = null;
            state.residents = [];
            state.searchResult = [];
            state.loading = false;
            state.error = null;
            state.page = 1;
            state.limit = 10;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResidentList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResidentList.fulfilled, (state, action: PayloadAction<{ data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.residents = [...state.residents, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.residents.length < action.payload.pagination.total_items;
                state.current_page = action.payload.pagination.current_page;
                state.total_pages = action.payload.pagination.total_pages;
                state.per_page = action.payload.pagination.per_page;
            })
            .addCase(getResidentList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch residents';
            })
            .addCase(getResidentByTps.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResidentByTps.fulfilled, (state, action: PayloadAction<{ data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.residents = [...state.residents, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.residents.length < action.payload.pagination.total_items;
                state.current_page = action.payload.pagination.current_page;
                state.total_pages = action.payload.pagination.total_pages;
                state.per_page = action.payload.pagination.per_page;
            })
            .addCase(getResidentByTps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch residents';
            })
            .addCase(getResidentId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResidentId.fulfilled, (state, action: PayloadAction<{ data: Resident, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.resident = action.payload.data;

            })
            .addCase(getResidentId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch residents';
            })

            .addCase(searchResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchResident.fulfilled, (state, action: PayloadAction<{ data: Resident[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.searchResult = [...state.searchResult, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.searchResult.length < action.payload.pagination.total_items;
                state.current_page = action.payload.pagination.current_page;
                state.total_pages = action.payload.pagination.total_pages;
                state.per_page = action.payload.pagination.per_page;
            })
            .addCase(searchResident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch residents';
            })
            .addCase(createResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(createResident.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.residents.push(action.payload.data);
            })
            .addCase(createResident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create role';
            })
            .addCase(updateResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateResident.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const tps = { ...state.residents, ...action.payload.data };
                state.residents = state.residents.map((r) => (r.id === tps.id ? tps : r));
            })
            .addCase(updateResident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update tps';
            })
            .addCase(deleteResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteResident.fulfilled, (state, action) => {
                state.loading = false;
                state.residents = state.residents.filter((tps) => tps.id !== action.meta.arg.id);
            })
            .addCase(deleteResident.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete tps';
            });
    },
});

export const { resetResident } = residentSlice.actions;

export const selectResident = (state: RootState) => state.resident;
export const selectLoading = (state: RootState) => state.resident.loading;
export const selectError = (state: RootState) => state.resident.error;

export default residentSlice.reducer;