import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/types/auth/authType";
import { User } from "@/types/user/userType";

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Original actions for compatibility
    setCredentials: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
    },
    // New actions for "Mirror" pattern
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
