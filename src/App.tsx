import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
