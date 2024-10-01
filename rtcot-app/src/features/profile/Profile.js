// src/features/profile/Profile.js
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from './profileSlice';
import { Button, Form } from 'react-bootstrap';

const Profile = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm();
  const userProfile = useSelector((state) => state.profile.user);

  useEffect(() => {
    dispatch(getProfile());  // Fetch the user's profile from the backend
  }, [dispatch]);

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);  // Populate form with fetched profile data
    }
  }, [userProfile, reset]);

  const onSubmit = (data) => {
    dispatch(updateProfile(data));  // Dispatch profile update action
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="text" {...field} />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="email" {...field} />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Controller
          name="bio"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control as="textarea" {...field} />}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">Update Profile</Button>
    </Form>
  );
};

export default Profile;
