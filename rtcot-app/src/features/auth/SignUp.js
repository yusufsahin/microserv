// src/features/auth/SignUp.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUp } from './authSlice';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../modals/modalSlice';

const SignUp = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signUp(data))
      .then(() => {
        dispatch(openModal(<div>Sign up successful! Welcome aboard!</div>));
        navigate('/tasks');  // Redirect to tasks page after successful sign-up
      })
      .catch((error) => dispatch(openModal(<div>Sign up failed: {error.message}</div>)));
  };

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
        <Form.Label>Email</Form.Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="email" {...field} required />}
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
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUp;

