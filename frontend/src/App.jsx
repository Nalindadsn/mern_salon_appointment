import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './_components/Header';
import MyNavbar from './_components/MyNavbar';
import './index.css';
import { useSelector } from 'react-redux';



const App = () => {
  const  loading  = useSelector((state) => state.alerts);

  return (
    <>
    {/* <MyNavbar/> */}
      <Header />
      <ToastContainer />
      <Container className=' m-0 p-0' fluid>
      
        <Outlet />
      </Container>
    </>
  );
};

export default App;
