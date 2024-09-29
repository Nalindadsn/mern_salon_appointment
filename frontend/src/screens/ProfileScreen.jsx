import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../_components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../_components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Layout from '../components/Layout';

const ProfileScreen = () => {
  
  return (
    <Layout>
    <FormContainer>
      <h1>Update Profile</h1>

      
    </FormContainer></Layout>
  );
};

export default ProfileScreen;
