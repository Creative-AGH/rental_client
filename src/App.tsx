import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
