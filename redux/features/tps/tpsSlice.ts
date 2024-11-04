
import { createTpsApi, deleteTpsApi, getTpsIdApi, getTpsListApi, updateTpsApi } from "@/lib/api/tpsApi";
import { Tps } from "@/lib/types/TpsType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TpsState {
    tps: Tps | null;
    tps_list: Tps[];
    loading: boolean;
    error: string | null;
    code: number
}

const initialState: TpsState = {
    tps: null,
    tps_list: [],
    loading: false,
    error: null,
    code: 0
};

export const getTpsList = createAsyncThunk<Tps>(
    'tps/getTpsList',
    async () => {
        const response = await getTpsListApi();
        return response;
    }
);

export const getTpsId = createAsyncThunk<Tps, {id:number}>(
    'tps/getTpsId',
    async ({id}) => {
        const response = await getTpsIdApi(id);
        return response;
    }
);

export const createTps = createAsyncThunk<Tps, { formData: FormData }>(
    'tps/createTps',
    async ({ formData }) => {
        const response = await createTpsApi(formData);
        return response;
    }
);

export const updateTps = createAsyncThunk<Tps, { formData: FormData, id: number }>(
    'tps/updateTps',
    async ({ formData, id }) => {
        const response = await updateTpsApi(formData, id);
        return response;
    }
);

export const deleteTps = createAsyncThunk<Tps, { id: number }>(
    'tps/deleteTps',
    async ({ id }) => {
        const response = await deleteTpsApi(id);
        return response;
    }
);


const tpsSlice = createSlice({
    name: 'tps',
    initialState,
    reducers: {
        resettps: (state) => {
            state.tps = null;
            state.tps_list = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTpsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTpsList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tps_list = action.payload.data;
            })
            .addCase(getTpsList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tps_list';
            })
            .addCase(getTpsId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTpsId.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tps = action.payload.data;
            })
            .addCase(getTpsId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tps_list';
            })
            .addCase(createTps.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTps.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.tps_list.push(action.payload.data);
            })
            .addCase(createTps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create role';
            })
            .addCase(updateTps.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTps.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const tps = { ...state.tps_list, ...action.payload.data };
                state.tps_list = state.tps_list.map((r) => (r.id === tps.id ? tps : r));
            })
            .addCase(updateTps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update tps';
            })
            .addCase(deleteTps.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTps.fulfilled, (state, action) => {
                state.loading = false;
                state.tps_list = state.tps_list.filter((tps) => tps.id !== action.meta.arg.id);
            })
            .addCase(deleteTps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete tps';
            });
    },
});

export const selectTps = (state: RootState) => state.tps;
export const selectLoading = (state: RootState) => state.tps.loading;
export const selectError = (state: RootState) => state.tps.error;

export default tpsSlice.reducer;