// src/services/atendimentoService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AtendimentoService {
  async criar(data: any) {
    const { descricao, petId } = data;

    return prisma.atendimento.create({
      data: {
        descricao,
        petId,
      },
    });
  }

  async listarTodos() {
    return prisma.atendimento.findMany({
      include: {
        pet: true,
      },
    });
  }

  async buscarPorId(id: number) {
    return prisma.atendimento.findUnique({
      where: { id },
      include: {
        pet: true,
      },
    });
  }

  async atualizar(id: number, data: any) {
    const { descricao, petId } = data;
  
    return prisma.atendimento.update({
      where: { id },
      data: {
        descricao,
        petId
      }
    });
  }

  async deletar(id: number) {
    return prisma.atendimento.delete({ where: { id } });
  }
}
