import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/", notesController.getNoteEntries.bind(notesController));
router.post("/", notesController.addEntry.bind(notesController));
router.get("/:id/", notesController.getNoteEntry.bind(notesController));
router.put("/:id", notesController.updateEntry.bind(notesController));


export const notesRoutes = router;