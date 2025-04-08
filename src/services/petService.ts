import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export class PetService {
    async criar(data: any) {
        const { nome, especie, raca, idade, tutorId } = data;
      
        return prisma.pet.create({
          data: {
            nome,
            especie,
            raca,
            idade,
            tutorId
          }
        });
    }

  async listarTodos() {
    return prisma.pet.findMany({
      include: { tutor: true }
    });
  }

  async buscarPorId(id: number) {
    return prisma.pet.findUnique({
      where: { id },
      include: { tutor: true }
    });
  }

  async atualizar(id: number, data: any) {
    const { nome, especie, raca, idade, tutorId } = data;
  
    return prisma.pet.update({
      where: { id },
      data: {
        nome,
        especie,
        raca,
        idade,
        tutorId
      }
    });
  }

  async deletar(id: number) {
    return prisma.pet.delete({
      where: { id }
    });
  }
}
