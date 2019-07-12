import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/rest/", notesController.getNoteEntries.bind(notesController));
router.post("/rest/", notesController.createModifyEntry.bind(notesController));
router.get("/rest/finished", notesController.getFinished.bind(notesController));
router.get("/rest/:id/", notesController.getNoteEntry.bind(notesController));


export const notesRoutes = router;