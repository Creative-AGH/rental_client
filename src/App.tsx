import { Suspense, lazy } from 'react';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
const ItemSearch = lazy(() => import('./pages/ItemSearch'));
const ItemHistory = lazy(() => import('./pages/ItemHistory'));
const MapSearch = lazy(() => import('./features/Map/MapSearch/MapSearch'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ItemSearch />
            </Suspense>
          }
        />
        <Route
          path="user"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path="/user/history"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ItemHistory />
            </Suspense>
          }
        />
        <Route
          path="/mapSearch/:itemid"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MapSearch />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
