import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from 'components/private-route/private-route';
import { Loader } from 'components/loader';
import { store } from './redux/redux-store';
import './App.scss';

export const App: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Loader />
        <PrivateRoute />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

export default App;
