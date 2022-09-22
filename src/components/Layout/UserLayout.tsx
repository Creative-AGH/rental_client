import { Outlet } from 'react-router-dom';
import Navbar from '../Organisms/Navbar/Navbar';

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
