import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  SerializedError,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { HistoryMessage, PostCheckPhone } from 'interfaces/chat-queries';
import { UserContact } from 'interfaces/auth-user';
import { HOST } from '../../constants/api';

export interface ChatState {
  status: string;
  error: SerializedError | null;
  statusCode: number | null;
  existsWhatsapp: boolean;
  newContact: string | null;
  clickedContact: boolean;
  curContact: UserContact | null;
  curHistory: HistoryMessage[];
  textMessage: string;
}

const initialState: ChatState = {
  status: 'idle',
  error: null,
  statusCode: null,
  existsWhatsapp: false,
  newContact: null,
  clickedContact: false,
  curContact: null,
  curHistory: [],
  textMessage: '',
};

export const checkNumberPhone = createAsyncThunk('chat', async (data: PostCheckPhone) => {
  let response;
  try {
    response = await axios.post(
      `${HOST}/waInstance${data.idInstance}/checkWhatsapp/${data.apiTokenInstance}`,
      { phoneNumber: data.phoneNumber },
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

export const createGroup = createAsyncThunk('createGroup', async (data: any) => {
  let response;

  try {
    response = await axios.post(
      `${HOST}/waInstance${data.idInstance}/createGroup/${data.apiTokenInstance}`,
      {
        groupName: '1',
        chatIds: [`${data.newContact}@c.us`, data.userSettings.wid],
      },
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

export const getHistory = createAsyncThunk('getHistory', async (data: any) => {
  let response;
  try {
    response = await axios.post(
      `${HOST}/waInstance${data.idInstance}/getChatHistory/${data.apiTokenInstance}`,
      {
        chatId: data.id,
      },
    );

    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

export const sendMessage = createAsyncThunk('sendMessage', async (data: any) => {
  let response;
  try {
    response = await axios.post(
      `${HOST}/waInstance${data.idInstance}/sendMessage/${data.apiTokenInstance}`,
      {
        chatId: data.id,
        message: data.text,
      },
    );
    return response;
  } catch (error: any) {
    response = error.message;
  }

  return response;
});

const chatAdapter = createEntityAdapter();

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState(initialState),
  reducers: {
    setNewContact: (state, action: PayloadAction<string>) => {
      state.newContact = action.payload;
    },
    setClickContact: (state, action: PayloadAction<UserContact>) => {
      state.clickedContact = true;
      state.curContact = action.payload;
    },
    setTypedTextMessage: (state, action: PayloadAction<string>) => {
      state.textMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkNumberPhone.pending, (state) => {
        state.status = 'loading';
        state.existsWhatsapp = false;
      })
      .addCase(checkNumberPhone.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.statusCode = 200;
          state.error = null;
          state.existsWhatsapp = true;
        } else if (tempResponse.status === 400) {
          state.statusCode = 400;
          state.error = new Error('Error');
          state.existsWhatsapp = false;
        } else {
          state.statusCode = 500;
          state.error = new Error(tempResponse.error?.message);
          state.existsWhatsapp = false;
        }
        state.status = 'idle';
      })
      .addCase(checkNumberPhone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        state.statusCode = Number(action.payload);
        state.existsWhatsapp = false;
      })
      .addCase(createGroup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.error = null;
        } else if (tempResponse.status === 400) {
          state.error = new Error('Error');
        } else {
          state.error = new Error(tempResponse.error?.message);
        }
        state.status = 'idle';
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.error = null;
        } else if (tempResponse.status === 400) {
          state.error = new Error('Error');
        } else {
          state.error = new Error(tempResponse.error?.message);
        }
        state.status = 'idle';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(getHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.status = 'loading';
        state.error = null;
        const tempResponse = action.payload;
        if (tempResponse.status === 200) {
          state.error = null;
          state.curHistory = action.payload.data;
        } else if (tempResponse.status === 400) {
          state.error = new Error('Error');
        } else {
          state.error = new Error(tempResponse.error?.message);
        }
        state.status = 'idle';
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});
export const { setNewContact, setClickContact, setTypedTextMessage } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
