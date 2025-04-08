import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TutorService {
    async criar(data: any) {
        const { nome, email, telefone } = data;
      
        return prisma.tutor.create({
          data: {
            nome,
            email,
            telefone
          }
        });
      }
      
  async listarTodos() {
    return prisma.tutor.findMany();
  }

  async buscarPorId(id: number) {
    return prisma.tutor.findUnique({ where: { id } });
  }

  async atualizar(id: number, data: any) {
    const { nome, email, telefone } = data;
  
    return prisma.tutor.update({
      where: { id },
      data: {
        nome,
        email,
        telefone
      }
    });
  }

  async deletar(id: number) {
    return prisma.tutor.delete({ where: { id } });
  }
}
