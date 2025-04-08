import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


describe('Rotas de Pet', () => {
  let tutorId: number;
  let petId: number;


  beforeAll(async () => {
    await prisma.atendimento.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.tutor.deleteMany();

    const tutor = await request(app).post('/tutores').send({
      nome: 'Tutor do Pet',
      email: `tutorp@${Date.now()}.com`,
      telefone: '81912345678'
    });
    tutorId = tutor.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Deve criar um novo pet', async () => {
    const response = await request(app)
      .post('/pets')
      .send({
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'Labrador',
        idade: 3,
        tutorId: tutorId
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    petId = response.body.id;
  });

  it('Deve listar todos os pets', async () => {
    const response = await request(app).get('/pets');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve buscar pet por ID', async () => {
    const response = await request(app).get(`/pets/${petId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', petId);
  });

  it('Deve atualizar um pet', async () => {
    const response = await request(app)
      .put(`/pets/${petId}`)
      .send({ idade: 4 });

    expect(response.status).toBe(200);
    expect(response.body.idade).toBe(4);
  });

  it('Deve deletar um pet', async () => {
    const response = await request(app).delete(`/pets/${petId}`);
    expect(response.status).toBe(204);
  });
});