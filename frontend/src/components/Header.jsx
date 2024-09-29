import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../_assets/logo.png';
import { FaBell, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Badge, Button } from "antd";

const Header = ({ notification }) => {
  const dispatch = useDispatch();
  const  {user}  = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(showLoading());
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.post(
          "/api/user/getUserData",
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        dispatch(hideLoading());

        const { data } = response;
        if (data.success) {
          dispatch(setUser(data.data));
        } else {
          throw new Error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.clear();
        dispatch(hideLoading());
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user, dispatch]);

  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <header>
    <Navbar  expand='lg' collapseOnSelect  style={{ backgroundColor: '#560C34',color:"white" }}>
      <Container fluid>
        <LinkContainer to='/'  style={{color:"white",marginRight:"10px", backgroundColor: 'rgb(86, 12, 52)'} }>
          <Navbar.Brand>
            
          <img src={logo} alt="logo" style={{ height: '100px', marginInlineStart: '20px' }} />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto' style={{alignItems: 'center',}}>
            


          <LinkContainer to='/' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',
  marginBottom: '2px',
  

}}>
                  <Nav.Link>
                     Home 
                  </Nav.Link>
                </LinkContainer>

<LinkContainer to='/products' style={{
backgroundColor: '#C07BA0', 
color: 'white', 
borderRadius: '10px', 
padding: '10px 20px',
marginRight: '20px',
marginBottom: '2px',


}}>
        <Nav.Link>
           Products 
        </Nav.Link>
      </LinkContainer>

                <LinkContainer to='/services' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                     Services 
                  </Nav.Link>
                </LinkContainer>


          <LinkContainer to='/about' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                     About Us
                  </Nav.Link>
                </LinkContainer>


                <LinkContainer to='/contact' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                     Contact Us
                  </Nav.Link>


                  
                </LinkContainer>


                <LinkContainer to='/notification'  style={{color:"white",marginRight:"10px", backgroundColor: 'rgb(86, 12, 52)'} }>
              <Nav.Link  style={{color:"white",marginRight:"10px", backgroundColor: 'rgb(86, 12, 52)'} }>
              
                
                <Badge

                count={notification}
                overflowCount={99}
                
              >
              <FaBell style={{color:"white",marginRight:"10px", } }/>
                 
              </Badge></Nav.Link>
                </LinkContainer>

                {isAuthenticated ? <>
                  <>
                <NavDropdown title={user?.name} id='username'  style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
<LinkContainer to='/profile'>
  <NavDropdown.Item>Profile</NavDropdown.Item>
</LinkContainer>
{user?.isAdmin ? 
  <LinkContainer to='/admin/dashboard'>
  <NavDropdown.Item>Admin Panel</NavDropdown.Item>
</LinkContainer>:<LinkContainer to='/user/dashboard'>
  <NavDropdown.Item>User Panel</NavDropdown.Item>
</LinkContainer>
}


                  {/* <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> */}

                  
                  
                    <LinkContainer to='/login' onClick={handleLogout}>
                    <NavDropdown.Item >Logout</NavDropdown.Item>
                    </LinkContainer>
                  
                </NavDropdown>
              </>
                </>:<>
                <LinkContainer to='/login' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
   
              </>}
{/* 
            {user ? (
              <>
                <NavDropdown title={user.name} id='username'  style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to='/login' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register' style={{
  backgroundColor: '#C07BA0', 
  color: 'white', 
  borderRadius: '10px', 
  padding: '10px 20px',
  marginRight: '20px',    marginBottom: '2px',

}}>
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  );
};

export default Header;
