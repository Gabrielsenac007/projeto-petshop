import { Request, Response } from 'express';
import { TutorService } from '../services/tutorService';

const service = new TutorService();

export class TutorController {
  async criar(req: Request, res: Response) {
    try {
      const tutor = await service.criar(req.body);
      res.status(201).json(tutor);
    } catch (err) {
      res.status(400).json({ erro: err });
    }
  }

  async listarTodos(_: Request, res: Response) {
    const tutores = await service.listarTodos();
    res.json(tutores);
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const tutor = await service.buscarPorId(Number(id));
    tutor ? res.json(tutor) : res.status(404).json({ mensagem: "Tutor não encontrado" });
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
