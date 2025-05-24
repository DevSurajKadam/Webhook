import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5001, () => console.log('Server started on port 5001'));
  })
  .catch(err => console.error(err));
