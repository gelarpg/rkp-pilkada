import { getProfessionListApi, createProfessionApi, updateProfessionApi, deleteProfessionApi } from "@/lib/api/professionApi";
import { Profession } from "@/lib/types/professionType";
import { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfessionState {
    profession: Profession | null;
    professions: Profession[];
    loading: boolean;
    error: string | null;
    code: number
}

const initialState: ProfessionState = {
    profession: null,
    professions: [],
    loading: false,
    error: null,
    code: 0
};

export const getProfessionList = createAsyncThunk<Profession>(
    'profession/getProfessionList',
    async () => {
        const response = await getProfessionListApi();
        return response;
    }
);

export const createProfession = createAsyncThunk<Profession, { formData: FormData }>(
    'profession/createProfession',
    async ({ formData }) => {
        const response = await createProfessionApi(formData);
        return response;
    }
);

export const updateProfession = createAsyncThunk<Profession, { formData: FormData, id: number }>(
    'profession/updateProfession',
    async ({ formData, id }) => {
        const response = await updateProfessionApi(formData, id);
        return response;
    }
);

export const deleteProfession = createAsyncThunk<Profession, { id: number }>(
    'profession/deleteProfession',
    async ({ id }) => {
        const response = await deleteProfessionApi(id);
        return response;
    }
);


const professionSlice = createSlice({
    name: 'profession',
    initialState,
    reducers: {
        resetProfession: (state) => {
            state.profession = null;
            state.professions = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfessionList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfessionList.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.professions = action.payload.data;
            })
            .addCase(getProfessionList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch professions';
            })
            .addCase(createProfession.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProfession.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.professions.push(action.payload.data);
            })
            .addCase(createProfession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create role';
            })
            .addCase(updateProfession.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfession.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                const tps = { ...state.professions, ...action.payload.data };
                state.professions = state.professions.map((r) => (r.id === tps.id ? tps : r));
            })
            .addCase(updateProfession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update tps';
            })
            .addCase(deleteProfession.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProfession.fulfilled, (state, action) => {
                state.loading = false;
                state.professions = state.professions.filter((tps) => tps.id !== action.meta.arg.id);
            })
            .addCase(deleteProfession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete tps';
            });
    },
});

export const { resetProfession } = professionSlice.actions;

export const selectProfession = (state: RootState) => state.profession;
export const selectLoading = (state: RootState) => state.profession.loading;
export const selectError = (state: RootState) => state.profession.error;

export default professionSlice.reducer;