import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


describe('Rotas de Atendimento', () => {
  let tutorId: number;
  let petId: number;
  let atendimentoId: number;

  beforeAll(async () => {
    // limpeza: ordem importa por causa das FK
    await prisma.atendimento.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.tutor.deleteMany();

    const tutor = await request(app).post('/tutores').send({
      nome: 'Tutor Atendimento',
      email: `tutora@${Date.now()}.com`,
      telefone: '81999999999'
    });
    tutorId = tutor.body.id;

    const pet = await request(app).post('/pets').send({
      nome: 'Bob',
      especie: 'Gato',
      raca: 'Siamês',
      idade: 2,
      tutorId: tutorId
    });
    petId = pet.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um atendimento', async () => {
    const response = await request(app)
      .post('/atendimentos')
      .send({ descricao: 'Vacinação anual', petId });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    atendimentoId = response.body.id;
  });

  it('Deve listar todos os atendimentos', async () => {
    const response = await request(app).get('/atendimentos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve buscar atendimento por ID', async () => {
    const response = await request(app).get(`/atendimentos/${atendimentoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', atendimentoId);
  });

  it('Deve atualizar um atendimento', async () => {
    const response = await request(app)
      .put(`/atendimentos/${atendimentoId}`)
      .send({ descricao: 'Consulta de rotina' });

    expect(response.status).toBe(200);
    expect(response.body.descricao).toBe('Consulta de rotina');
  });

  it('Deve deletar um atendimento', async () => {
    const response = await request(app).delete(`/atendimentos/${atendimentoId}`);
    expect(response.status).toBe(204);
  });
});