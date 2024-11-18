import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Define the initial state for authentication
interface AuthState {
  userId: string | null;
  isSignedIn: boolean;
  profilePictureUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  provider: string | null;
}

const initialState: AuthState = {
  userId: null,
  isSignedIn: false,
  profilePictureUrl: null,
  firstName: null,
  lastName: null,
  email: null,
  provider: null
};

interface SignInPayload {
  userId: string;
  profilePictureUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
}

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<SignInPayload>) => {
      state.isSignedIn = true;
      state.userId = action.payload.userId;
      state.profilePictureUrl = action.payload.profilePictureUrl;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.provider = action.payload.provider
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userId = null;
      state.profilePictureUrl = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.provider = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };