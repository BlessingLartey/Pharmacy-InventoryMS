import express from 'express';
import  { addDrug, fetchDrugs, fetchDrug, updateDrug, deleteDrug} from '../controller/drugController.js';

const router = express.Router();


router.post('/', addDrug);
router.get('/', fetchDrugs);
router.get('/:id', fetchDrug);
router.put('/:id', updateDrug);
router.delete('/:id', deleteDrug);



fetchDrug

export default router;