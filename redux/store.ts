import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import userSlice from './features/user/userSlice'
import provinceSlice from './features/address/provinceSlice'
import districtSlice from './features/address/districtSlice'
import subdistrictSlice from './features/address/subdistrictSlice'
import villageSlice from './features/address/villageSlice'

const store = configureStore({
    reducer: {
        auth:authSlice,
        user:userSlice,
        province: provinceSlice,
        district: districtSlice,
        subdistrict: subdistrictSlice,
        village: villageSlice,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store