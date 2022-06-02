import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from 'pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" index exact element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
