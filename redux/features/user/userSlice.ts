import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { User } from '@/lib/types/userType';
import { getUserApi } from '@/lib/api/userApi';

interface UserState {
    user: User | null;
    level: number;
    loading: boolean;
    error: string | null;
    code:number
}

const initialState: UserState = {
    user: null,
    level: 1,
    loading: false,
    error: null,
    code:0
};

export const getUser = createAsyncThunk<{data:User, level:number, code:number}>(
    'user/getUser',
    async () => {
        const response = await getUserApi();
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<{data:User, level:number, code:number}>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.level = action.payload.data?.level;
                state.user = action.payload.data;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
    },
});

export const { resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;

