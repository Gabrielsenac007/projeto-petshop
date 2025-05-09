import { Router } from 'express';
import { TutorController } from '../controllers/tutorController';

const router = Router();
const controller = new TutorController();

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export {router as tutorRoutes}