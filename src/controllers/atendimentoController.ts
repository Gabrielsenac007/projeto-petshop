// src/controllers/atendimentoController.ts
import { Request, Response } from 'express';
import { AtendimentoService } from '../services/atendimentoService';

const service = new AtendimentoService();

export class AtendimentoController {
  async criar(req: Request, res: Response) {
    try {
      const atendimento = await service.criar(req.body);
      res.status(201).json(atendimento);
    } catch (err) {
      res.status(400).json({ erro: err });
    }
  }

  async listarTodos(_: Request, res: Response) {
    const atendimentos = await service.listarTodos();
    res.json(atendimentos);
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const atendimento = await service.buscarPorId(Number(id));
    atendimento
      ? res.json(atendimento)
      : res.status(404).json({ mensagem: 'Atendimento não encontrado' });
  }

  async atualizar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const atualizado = await service.atualizar(Number(id), req.body);
      res.json(atualizado);
    } catch (err) {
      res.status(400).json({ erro: err });
    }
  }

  async deletar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await service.deletar(Number(id));
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ erro: err });
    }
  }
}
