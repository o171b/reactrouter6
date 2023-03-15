import { Outlet } from 'react-router-dom';
import StyledNavbar from '../components/StyledNavbar';

const Home = () => {
  return (
    <>
    <StyledNavbar/>
      <Outlet />
    </>
  );
};
export default Home;