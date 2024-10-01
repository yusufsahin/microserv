// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import TasksList from '../features/tasks/TasksList';
import Profile from '../features/profile/Profile';
import VideoChat from '../features/videochat/VideoChat';
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route
      path="/tasks"
      element={
        <ProtectedRoute>
          <TasksList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/videochat"
      element={
        <ProtectedRoute>
          <VideoChat />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;  // Correct export

