// src/app.ts
import express from 'express';
import { tutorRoutes } from './routes/tutorRoutes';
import { petRoutes } from './routes/petRoutes';
import { atendimentoRoutes } from './routes/atendimentoRoutes';

const app = express();

app.use(express.json());
app.use('/tutores', tutorRoutes);
app.use('/pets', petRoutes);
app.use('/atendimentos', atendimentoRoutes);

export default app;
