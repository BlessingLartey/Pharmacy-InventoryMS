
import express from 'express'
import { addLab, fetchLabs, fetchLab, updateLab, deleteLab } from "../controller/labController.js";

// inilializing your route
const router = express.Router()

router.post('/addlab', addLab);
router.get('/', fetchLabs);
router.get('/:id', fetchLab);
// router.get('/unitofprice', getUnitOfPrice);
router.put('/:id', updateLab);
router.delete('/:id', deleteLab);

export default router;