import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../modals/modalSlice';

const SignIn = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogon = useSelector((state) => state.auth.isLogon);

  const onSubmit = (data) => {
    dispatch(login(data))
      .then(() => {
        dispatch(openModal('Login successful! Welcome back!'));
        navigate('/tasks');  // Navigate after successful login
      })
      .catch((error) => dispatch(openModal(`Login failed: ${error.message}`)));
  };

  // Use useEffect for conditional navigation after login
  useEffect(() => {
    if (isLogon) {
      navigate('/tasks');  // Move navigation into useEffect to avoid rendering conflicts
    }
  }, [isLogon, navigate]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="text" {...field} required />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="password" {...field} required />}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Sign In
      </Button>
    </Form>
  );
};

export default SignIn;
