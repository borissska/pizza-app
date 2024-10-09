import { Outlet } from 'react-router-dom';
import { Header } from '../../features';

const MainLayout = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
