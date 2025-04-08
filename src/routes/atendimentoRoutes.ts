
import { Router } from 'express';
import { AtendimentoController } from '../controllers/atendimentoController';

const router = Router();
const controller = new AtendimentoController();

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export {router as atendimentoRoutes };
