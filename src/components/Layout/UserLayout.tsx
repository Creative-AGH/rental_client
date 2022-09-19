import { Outlet } from 'react-router-dom';
import Navbar from '../Organisms/Navbar/Navbar';
import Theme from '../../features/Theme/Theme';


const UserLayout = () => {
  return (
    <div>
      <Theme className='dark' />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
