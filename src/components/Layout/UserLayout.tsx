import { Outlet } from 'react-router-dom';
import ItemTilesContainer from '../Organisms/ItemTilesContainer/ItemTilesContainer';
import Navbar from '../Organisms/Navbar/Navbar';

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <ItemTilesContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
