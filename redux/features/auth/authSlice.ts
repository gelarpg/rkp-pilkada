import {  forgotPasswordlApi, loginApi, registerApi, resetPasswordlApi, updateAccountApi, updateEmailApi, updatePasswordApi, updateUsernameApi } from "@/lib/api/authApi"
import { User } from "@/lib/types/userType"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    user: User | null
    username: string
    email: string
    password: string
    password_confirmation: string
    loading: boolean
    error: string | null
    message: any | null
    code: number,
    access_token: string
    token: string
}

const initialState: AuthState = {
    user: null,
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    loading: false,
    error: null,
    message: null,
    code: 0,
    access_token: '',
    token: ''
}

export const registerAuth = createAsyncThunk(
    'auth/registerAuth',
    async (userData: { username: string; email: string; password: string, password_confirmation: string }) => {
        const response = await registerApi(userData)
        return response
    }
)

export const loginAuth = createAsyncThunk(
    'auth/loginAuth',
    async (userData: { username: string; password: string }) => {
        const response = await loginApi(userData)
        return response
    }
)

export const forgotPassword = createAsyncThunk<any, { formData: FormData }>(
    'auth/forgotPassword',
    async ({ formData }) => {
        const response = await forgotPasswordlApi(formData)
        return response
    }
)

export const resetPassword = createAsyncThunk<any, { formData: FormData }>(
    'auth/resetPassword',
    async ({ formData }) => {
        const response = await resetPasswordlApi(formData)
        return response
    }
)

export const updateAccount = createAsyncThunk<any, { formData: FormData }>(
    'auth/updateAccount',
    async ({ formData }) => {
        const response = await updateAccountApi(formData)
        return response
    }
)

export const updateUsername = createAsyncThunk<any, { formData: FormData }>(
    'auth/updateUsername',
    async ({ formData }) => {
        const response = await updateUsernameApi(formData)
        return response
    }
)

export const updateEmail = createAsyncThunk<any, { formData: FormData }>(
    'auth/updateEmail',
    async ({ formData }) => {
        const response = await updateEmailApi(formData)
        return response
    }
)

export const updatePassword = createAsyncThunk<any, { formData: FormData }>(
    'auth/updatePassword',
    async ({ formData }) => {
        const response = await updatePasswordApi(formData)
        return response
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.user = null
            state.username = ''
            state.email = ''
            state.password = ''
            state.loading = false
            state.error = null
            state.message = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(registerAuth.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.username = action.payload.username
                state.email = action.payload.email
                state.password = action.payload.password
                state.password_confirmation = action.payload.password_confirmation
                state.message = action.payload.message
                state.code = action.payload.code
                state.access_token = action.payload.access_token
            })
            .addCase(registerAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed registration'
            })
            .addCase(loginAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(loginAuth.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.username = action.payload.username
                state.password = action.payload.password
                state.message = action.payload.message
                state.code = action.payload.code

                state.user = action.payload.user
                state.access_token = action.payload.access_token
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed login'
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.message = action.payload.message
                state.code = action.payload.code
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed forgot password'
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.token = action.payload.token
                state.email = action.payload.email
                state.password = action.payload.password
                state.password_confirmation = action.payload.password_confirmation
                state.message = action.payload.message
                state.code = action.payload.code
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed reset password'
            })
            .addCase(updateAccount.pending, (state) => {
                state.loading = true
            })
            .addCase(updateAccount.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.username = action.payload.username
                state.email = action.payload.email
                state.message = action.payload.message
                state.code = action.payload.code
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update account'
            })
            .addCase(updateUsername.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUsername.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.username = action.payload.username
                state.code = action.payload.code
                state.message = action.payload.message
            })
            .addCase(updateUsername.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update account'
            })
            .addCase(updateEmail.pending, (state) => {
                state.loading = true
            })
            .addCase(updateEmail.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.email = action.payload.email
                state.code = action.payload.code
                state.message = action.payload.message
            })
            .addCase(updateEmail.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update account'
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true
            })
            .addCase(updatePassword.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.loading = false
                state.message = action.payload.message
                console.log(state.message)
                state.code = action.payload.code
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed update account'
            })
    }
})

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer
