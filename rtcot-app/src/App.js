// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes';
import ModalManager from './features/modals/ModalManager';

function App() {
  return (
    <Provider store={store}>
      <div className="App container">
        <ModalManager />
        <Router>  {/* Wrap your routes inside BrowserRouter */}
          <AppRoutes />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
