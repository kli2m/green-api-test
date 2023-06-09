import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './reducers/auth-reducer';
import { chatReducer } from './reducers/chat-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
