import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import ItemSearch from './pages/ItemSearch';
import ItemHistory from './pages/ItemHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<ItemSearch />} />
        <Route path="user" element={<LandingPage />} />
        <Route path="/user/history" element={<ItemHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
