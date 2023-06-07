import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { HOST } from '../../constants/api';
import { PostAuthType } from '../../interfaces';

export interface UserAuthState {
  status: string;
  isAuth: boolean;
  error: SerializedError | null;
  statusCode: number | null;
}

const initialState: UserAuthState = {
  status: 'idle',
  isAuth: false,
  error: null,
  statusCode: null,
};

export const fetchAuth = createAsyncThunk('auth', async (data: PostAuthType) => {
  let response;
  try {
    response = await await axios.get(
      `${HOST}/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

const authAdapter = createEntityAdapter();

export const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(initialState),
  reducers: {
    //   setValueError: (state, action: PayloadAction<SerializedError | null>) => {
    //     // state.error = action.payload;
    //   },
    //   delResponseErrors: (state) => {
    //     // state.error = null;
    //     // state.statusCode = null;
    //     // state.user = null;
    //     // state.isAuth = false;
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading';
        state.isAuth = false;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loading';
        state.isAuth = false;
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.statusCode = 200;
          state.isAuth = true;
          state.error = null;
        } else if (tempResponse.status === 400) {
          state.statusCode = 400;
          state.error = new Error('Неверный логин или пароль!');
          state.isAuth = false;
        } else {
          state.statusCode = 500;
          state.error = new Error(tempResponse.error?.message);
          state.isAuth = false;
        }
        state.status = 'idle';
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.statusCode = Number(action.payload);
        state.isAuth = false;
      });
  },
});

// export const { setValueError, delResponseErrors } = authSlice.actions;

export const authReducer = authSlice.reducer;
