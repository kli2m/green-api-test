import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { UserContact, UserSettings } from 'interfaces/auth-user';
import { HOST } from '../../constants/api';
import { PostAuthType } from '../../interfaces';

export interface UserAuthState {
  status: string;
  isAuth: boolean;
  error: SerializedError | null;
  statusCode: number | null;
  data: PostAuthType;
  userSettings: UserSettings | {};
  contacts: UserContact[];
  constContacts: UserContact[];
}

const initialState: UserAuthState = {
  status: 'idle',
  isAuth: false,
  error: null,
  statusCode: null,
  data: { idInstance: '', apiTokenInstance: '' },
  userSettings: {},
  contacts: [],
  constContacts: [],
};

export const fetchAuth = createAsyncThunk('auth', async (data: PostAuthType) => {
  let response;
  try {
    response = await axios.get(
      `${HOST}/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

export const getUserSettings = createAsyncThunk('user_settings', async (data: PostAuthType) => {
  let response;
  try {
    response = await axios.get(
      `${HOST}/waInstance${data.idInstance}/getSettings/${data.apiTokenInstance}`,
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

export const getContacts = createAsyncThunk('getContacts', async (data: PostAuthType) => {
  let response;

  try {
    response = await axios.get(
      `${HOST}/waInstance${data.idInstance}/getContacts/${data.apiTokenInstance}`,
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
    setValueRegistration: (state, action: PayloadAction<PostAuthType>) => {
      state.data = action.payload;
    },
    setChangedContacts: (state, action: PayloadAction<string>) => {
      state.contacts = state.constContacts.filter((contact) => {
        if (
          contact.id
            .trim()
            .toLocaleLowerCase()
            .indexOf(action.payload.trim().toLocaleLowerCase()) !== -1 ||
          contact.name
            .trim()
            .toLocaleLowerCase()
            .indexOf(action.payload.trim().toLocaleLowerCase()) !== -1
        ) {
          return true;
        }
        return false;
      });
    },
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
      })
      .addCase(getUserSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserSettings.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.userSettings = action.payload.data;
          state.error = null;
        } else {
          state.error = new Error(tempResponse.error?.message);
        }
        state.status = 'idle';
      })
      .addCase(getUserSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(getContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.contacts = action.payload.data;
          state.constContacts = state.contacts;
          state.error = null;
        } else {
          state.error = new Error(tempResponse.error?.message);
        }
        state.status = 'idle';
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const { setValueRegistration, setChangedContacts } = authSlice.actions;

export const authReducer = authSlice.reducer;
