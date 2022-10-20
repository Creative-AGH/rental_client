import { Outlet } from 'react-router-dom';
import Navbar from '../Organisms/Navbar/Navbar';
import Container from 'react-modal-promise';

const UserLayout = () => {
  return (
    <div>
      <Container />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
