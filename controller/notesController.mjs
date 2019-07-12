import { noteStore as store } from "../services/store_noteEntries";

export class NotesController {
    
    async getNoteEntries(req, res) {
        res.json((await store.allEntries() || []));
    };
    
    async getFinished(req, res){
        const entries = (await store.allEntries() || []);
        res.json(entries.filter(entry => entry.nFinished === true));
    };

    async getNoteEntry(req, res){
        res.json(await store.getEntry(req.params.id));
    };

    async createModifyEntry(req, res) {
        res.json(await store.createModifyEntry(req.body));
    };

}

export const notesController = new NotesController();