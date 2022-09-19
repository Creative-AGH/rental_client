import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import ItemSearch from './pages/ItemSearch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<ItemSearch />} />
        <Route path="user" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
