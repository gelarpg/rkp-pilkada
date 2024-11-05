import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { User } from '@/lib/types/userType';
import { changeEmailApi, changeFullnameApi, changePasswordApi, changeRoleApi, changeUsernameApi, createUserApi, deleteUserApi, getUserApi, getUserByIdApi, getUserByTeamApi, getUsersApi, searchUserApi, updateUserApi } from '@/lib/api/userApi';

interface UserState {
    user: User | null;
    users: User[];
    searchResult: User[];
    fullname: string
    username: string
    email: string
    password: string
    role: number;
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

const initialState: UserState = {
    user: null,
    users: [],
    searchResult: [],
    role: 0,
    fullname: '',
    username: '',
    email: '',
    password: '',
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

export const getUser = createAsyncThunk<{ data: User, code: number }>(
    'user/getUser',
    async () => {
        const response = await getUserApi();
        return response;
    }
);

export const getUsers = createAsyncThunk<{ data: User[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }, { role: number, page: number, limit: number }>(
    'user/getUsers',
    async ({ role, page, limit }) => {
        const response = await getUsersApi(role, page, limit);
        return response;
    }
);

export const getUserById = createAsyncThunk<User, { id: number }>(
    'user/getUserById',
    async ({ id }) => {
        const response = await getUserByIdApi(id);
        return response;
    }
);

export const getUserByTeam = createAsyncThunk<{ data: User[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }, { team_id: number, page: number, limit: number }>(
    'user/getUserByTeam',
    async ({ team_id, page, limit }) => {
        const response = await getUserByTeamApi(team_id, page, limit);
        return response;
    }
);

export const searchUser = createAsyncThunk<{ data: User[], pagination: { total_items: number }, code: number }, { username: string, team_id: number, page: number, limit: number }>(
    'user/searchUser',
    async ({ username, team_id, page, limit }) => {
        const response = await searchUserApi(username, team_id, page, limit);
        return response;
    }
);

export const createUser = createAsyncThunk<User, { formData: FormData }>(
    'user/createUser',
    async ({ formData }) => {
        const response = await createUserApi(formData);
        return response;
    }
);

export const updateUser = createAsyncThunk<User, { formData: FormData, id: number }>(
    'user/updateUser',
    async ({ id, formData }) => {
        const response = await updateUserApi(id, formData);
        return response;
    }
);

export const changeFullname = createAsyncThunk<any, { formData: FormData, id: number }>(
    'user/changeFullname',
    async ({ formData, id }) => {
        const response = await changeFullnameApi(formData, id)
        return response
    }
)

export const changeUsername = createAsyncThunk<any, { formData: FormData, id: number }>(
    'user/changeUsername',
    async ({ formData, id }) => {
        const response = await changeUsernameApi(formData, id)
        return response
    }
)

export const changeEmail = createAsyncThunk<any, { formData: FormData, id: number }>(
    'user/changeEmail',
    async ({ formData, id }) => {
        const response = await changeEmailApi(formData, id)
        return response
    }
)

export const changeRole = createAsyncThunk<any, { formData: FormData, id: number }>(
    'user/changeRole',
    async ({ formData, id }) => {
        const response = await changeRoleApi(formData, id)
        return response
    }
)

export const changePassword = createAsyncThunk<any, { formData: FormData, id: number }>(
    'user/changePassword',
    async ({ formData, id }) => {
        const response = await changePasswordApi(formData, id)
        return response
    }
)

export const deleteUser = createAsyncThunk<User, { user_id: number }>(
    'user/deleteUser',
    async ({ user_id }) => {
        const response = await deleteUserApi(user_id);
        return response;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser(state) {
            state.user = null;
            state.users = [];
            state.searchResult = [];
            state.fullname = ''
            state.username = ''
            state.email = ''
            state.password = ''
            state.loading = false;
            state.error = null;
            state.page = 1;
            state.limit = 10;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<{ data: User, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.role = action.payload.data?.role;
                state.user = action.payload.data;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<{ data: User[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.users = [...state.users, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.users.length < action.payload.pagination.total_items;
                state.current_page = action.payload.pagination.current_page;
                state.total_pages = action.payload.pagination.total_pages;
                state.per_page = action.payload.pagination.per_page;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            }).addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            .addCase(getUserByTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByTeam.fulfilled, (state, action: PayloadAction<{ data: User[], pagination: { total_items: number, current_page: number, total_pages: number, per_page: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.users = [...state.users, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.users.length < action.payload.pagination.total_items;
                state.current_page = action.payload.pagination.current_page;
                state.total_pages = action.payload.pagination.total_pages;
                state.per_page = action.payload.pagination.per_page;
            })
            .addCase(getUserByTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            .addCase(searchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUser.fulfilled, (state, action: PayloadAction<{ data: User[], pagination: { total_items: number }, code: number }>) => {
                state.loading = false;
                state.code = action.payload.code;
                state.searchResult = [...state.searchResult, ...action.payload.data];
                state.total_data = action.payload.pagination.total_items;
                state.page += 1;
                state.hasMore = state.searchResult.length < action.payload.pagination.total_items;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user';
            })
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.users.unshift(action.payload.data);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create user';
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.users = state.users.map((user) => user.id === action.payload.data.id ? action
                    .payload.data : user);
                state.users = [...state.users];
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: any) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.meta.arg.user_id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            })
            .addCase(changeFullname.pending, (state) => {
                state.loading = true
            })
            .addCase(changeFullname.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                const user = { ...state.users, ...action.payload.data };
                state.users = state.users.map((u) => (u.id === user.id ? user : u));
                state.username = action.payload.username
                state.code = action.payload.code
                state.message = action.payload.message
            })
            .addCase(changeFullname.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update username'
            })
            .addCase(changeUsername.pending, (state) => {
                state.loading = true
            })
            .addCase(changeUsername.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                const user = { ...state.users, ...action.payload.data };
                state.users = state.users.map((u) => (u.id === user.id ? user : u));
                state.username = action.payload.username
                state.code = action.payload.code
                state.message = action.payload.message
            })
            .addCase(changeUsername.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update username'
            })
            .addCase(changeEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(changeEmail.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                const user = { ...state.users, ...action.payload.data };
                state.users = state.users.map((u) => (u.id === user.id ? user : u));
                state.email = action.payload.email
                state.code = action.payload.code
                state.message = action.payload.message
            })
            .addCase(changeEmail.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update email'
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true
            })
            .addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.code = action.payload.code
                state.message = action.payload.message
                console.log(state.message);
                const user = { ...state.users, ...action.payload.data };
                state.users = state.users.map((u) => (u.id === user.id ? user : u));
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update password'
            })
            .addCase(changeRole.pending, (state) => {
                state.loading = true
            })
            .addCase(changeRole.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                const user = { ...state.users, ...action.payload.data };
                state.users = state.users.map((u) => (u.id === user.id ? user : u));
                state.message = action.payload.message
                state.code = action.payload.code
            })
            .addCase(changeRole.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update level'
            })
    },
});

export const { resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;

