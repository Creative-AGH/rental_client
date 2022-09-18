import { Outlet } from 'react-router-dom';
import Theme from '../../features/Theme/theme';

const UserLayout = () => {
  return (
    <div>
      <Theme className='dark' />
      <Outlet />
    </div>
  );
};

export default UserLayout;
