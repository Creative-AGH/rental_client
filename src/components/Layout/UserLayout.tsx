import { Outlet } from 'react-router-dom';
import Theme from '../../features/Theme/Theme';

const UserLayout = () => {
  return (
    <div>
      <Theme className='dark' />
      <Outlet />
    </div>
  );
};

export default UserLayout;
