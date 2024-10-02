import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  BrowserRouter
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './_components/PrivateRoute.jsx';


import Appointment from './_Pages/Appointment';
import ContactUs from './_Pages/ContactUs';
import Services from './_Pages/Services';
import AboutUs from './_Pages/AboutUs';
import Products from './_Pages/Products';


import ProtectedRoute from "./components/ProtectedRoute.jsx";

import HomePage from "./pages/HomePage";

import Login from "./pages/Login";

import Register from "./pages/Register.jsx";
import MessageSent from './_Pages/MessageSent.jsx';
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/user/Dashboard';

import Users from "./pages/admin/Users";
import Service from "./pages/admin/Service";
import AddService from "./pages/AddService.jsx";
import AddProduct from "./pages/AddProduct.jsx";

import BookingPage from "./pages/BookingPage";
import NotificationPage from "./pages/NotificationPage";
import ServiceAppointments from "./pages/service/ServiceAppointments";

import Appointments from "./pages/Appointments";
import UploadImage from './pages/UploadImages.jsx';
import Product from './pages/admin/Product.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<App />}>
      {/* <Route index={true} path='/' element={<HomeScreen />} /> */}
      
      
      <Route
              path="/"
               index={true} 
              element={
                // <ProtectedRoute>
                  <HomePage />
              }
            />
            <Route
                    path="/admin/dashboard"
                     index={true} 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                        </ProtectedRoute>
                    }
                  />


<Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <Service />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <Product />
                </ProtectedRoute>
              }
            />
            <Route
  path="/admin/add-service"
  element={
    <ProtectedRoute>
      <AddService />
    </ProtectedRoute>
  }
/>
                        <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute>
                  <AddProduct/>
                </ProtectedRoute>
              }
            />

<Route
              path="/admin/appointments"
              element={
                <ProtectedRoute>
                  <ServiceAppointments />
                </ProtectedRoute>
              }
            />
            <Route
                          path="/user/appointments"
                          element={
                            <ProtectedRoute>
                              <Appointments />
                            </ProtectedRoute>
                          }
                        />
<Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />


<Route
              path="/service/book-appointment/:serviceId"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/service-appointments"
              element={
                <ProtectedRoute>
                  <ServiceAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadImage />
                </ProtectedRoute>
              }
            />

                  <Route
                          path="/user/dashboard"
                           index={true} 
                          element={
                            <ProtectedRoute>
                              <Dashboard />
                              </ProtectedRoute>
                          }
                        />
      




      <Route path='/contact/sent' element={<MessageSent />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
