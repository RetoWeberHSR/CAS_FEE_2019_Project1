import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/rest/", notesController.getNoteEntries.bind(notesController));
router.post("/rest/", notesController.addEntry.bind(notesController));
router.get("/rest/:id/", notesController.getNoteEntry.bind(notesController));
router.put("/rest/:id/", notesController.updateEntry.bind(notesController));


export const notesRoutes = router;