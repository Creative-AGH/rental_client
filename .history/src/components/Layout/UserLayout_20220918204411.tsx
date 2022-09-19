import React from 'react';
import { Outlet } from 'react-router-dom';
import Theme from '../../features/Theme/theme';

const UserLayout = () => {
  return (
    <div>
      <Theme className='dark' />
      <main><Outlet /></main>

    </div>
  );
};

export default UserLayout;
