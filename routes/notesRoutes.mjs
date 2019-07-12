import express from 'express';
const router = express.Router();
import {notesController} from '../controller/notesController';


router.get("/", notesController.getNoteEntries.bind(notesController));
router.post("/", notesController.createModifyEntry.bind(notesController));
router.get("/finished", notesController.getFinished.bind(notesController));
router.get("/:id/", notesController.getNoteEntry.bind(notesController));


export const notesRoutes = router;