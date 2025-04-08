import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


describe('Rotas de Tutor', () => {
  let tutorId: number;

  beforeAll(async () => {
    // se quiser garantir que o banco comece limpo
    await prisma.tutor.deleteMany(); 
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um novo tutor', async () => {
    const response = await request(app)
      .post('/tutores')
      .send({
        nome: 'João Teste',
        email: `joao${Date.now()}@email.com`,
        telefone: '81988887777'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    tutorId = response.body.id;
  });

  it('Deve listar todos os tutores', async () => {
    const response = await request(app).get('/tutores');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve buscar tutor por ID', async () => {
    const response = await request(app).get(`/tutores/${tutorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', tutorId);
  });

  it('Deve atualizar um tutor', async () => {
    const response = await request(app)
      .put(`/tutores/${tutorId}`)
      .send({ nome: 'João Atualizado' });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('João Atualizado');
  });

  it('Deve deletar um tutor', async () => {
    const response = await request(app).delete(`/tutores/${tutorId}`);
    expect(response.status).toBe(204);
  });
});