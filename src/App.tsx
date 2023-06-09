import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from 'components/private-route/private-route';
import { Loader } from 'components/loader';
import { store } from './redux/redux-store';
import './App.scss';

export const App: React.FC = () => (
  <HashRouter basename={process.env.PUBLIC_URL}>
    <React.StrictMode>
      <Provider store={store}>
        <Loader />
        <PrivateRoute />
      </Provider>
    </React.StrictMode>
  </HashRouter>
);

export default App;
