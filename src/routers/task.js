import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/task.js';

router.post('/tasks', auth, createTask);

router.get('/tasks', auth, getTasks);

router.get('/tasks/:id', auth, getTask);

router.patch('/tasks/:id', auth, updateTask);

router.delete('/tasks/:id', auth, deleteTask);

export default router;