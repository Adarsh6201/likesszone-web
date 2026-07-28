import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, signupAPI, getProfileAPI, updateProfileAPI } from '../../services/authService';

// ─── Helpers ────────────────────────────────────────────────────────────────

const USER_KEY = 'likesszon_user';
const TOKEN_KEY = 'likesszon_token';
const REFRESH_KEY = 'likesszon_refresh_token';

const normaliseUser = (apiUser) => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  phone: apiUser.phone ?? null,
  role: apiUser.role,
  avatar: apiUser.profilePicture ?? null,
  address: apiUser.address ?? null,
  city: apiUser.city ?? null,
  state: apiUser.state ?? null,
  zipCode: apiUser.zipCode ?? null,
});

const getSavedUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// ─── Thunks ─────────────────────────────────────────────────────────────────

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginAPI(email, password);
      const authData = res.data;
      const user = normaliseUser(authData.user);
      localStorage.setItem(TOKEN_KEY, authData.token);
      if (authData.refreshToken) localStorage.setItem(REFRESH_KEY, authData.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signupAPI(formData);
      const authData = res.data;
      const user = normaliseUser(authData.user);
      localStorage.setItem(TOKEN_KEY, authData.token);
      if (authData.refreshToken) localStorage.setItem(REFRESH_KEY, authData.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

export const fetchProfileThunk = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;
      const res = await getProfileAPI();
      return normaliseUser(res.data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'auth/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await updateProfileAPI(formData);
      const user = normaliseUser(res.data);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.message || 'Update failed');
    }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSavedUser(),
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(USER_KEY);
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const fulfilled = (state, action) => { state.loading = false; state.user = action.payload; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(loginThunk.pending, pending)
      .addCase(loginThunk.fulfilled, fulfilled)
      .addCase(loginThunk.rejected, rejected)
      .addCase(registerThunk.pending, pending)
      .addCase(registerThunk.fulfilled, fulfilled)
      .addCase(registerThunk.rejected, rejected)
      .addCase(fetchProfileThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.user = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state) => {
        state.loading = false;
        // Token is invalid — clear everything
        state.user = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
      })
      .addCase(updateProfileThunk.pending, (state) => { state.loading = true; })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
