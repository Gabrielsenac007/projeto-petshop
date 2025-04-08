import { Router } from 'express';
import { PetController } from '../controllers/petController';

const router = Router();
const controller = new PetController();

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export { router as petRoutes };
