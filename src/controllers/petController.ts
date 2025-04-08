import { Request, Response } from 'express';
import { PetService } from '../services/petService';

const service = new PetService();

export class PetController {
  async criar(req: Request, res: Response) {
    try {
      const pet = await service.criar(req.body);
      res.status(201).json(pet);
    } catch (err) {
      res.status(400).json({ erro: err });
    }
  }

  async listarTodos(_: Request, res: Response) {
    const pets = await service.listarTodos();
    res.json(pets);
  }

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const pet = await service.buscarPorId(Number(id));
    pet ? res.json(pet) : res.status(404).json({ mensagem: "Pet não encontrado" });
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
