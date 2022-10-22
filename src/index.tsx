import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { itemApiSlice } from './features/api/itemApiSlice';

store.dispatch(itemApiSlice.endpoints.getAllItems.initiate());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
