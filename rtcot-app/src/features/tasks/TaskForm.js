import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createTask } from './tasksSlice';
import { Button, Form } from 'react-bootstrap';

const TaskForm = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createTask(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control type="text" {...field} />}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control as="textarea" {...field} />}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Create Task</Button>
    </Form>
  );
};

export default TaskForm;
