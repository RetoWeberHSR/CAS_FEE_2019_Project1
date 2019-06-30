import {noteStore as store} from "../services/store_noteEntries";

const actor = "somebody";

export class NotesController {
    
    async getNoteEntries(req, res) {
        res.json((await store.allEntries(actor) || []));
    };

    async getNoteEntry(req, res){
        res.json(await store.getEntry(req.params.id, actor));
    };

    async addEntry(req, res) {
        res.json(await store.addEntry(req.body.name, actor));
    };

    async updateEntry(req, res) {
        res.json(await store.updateEntry(req.body.name, actor));
    };
}

export const notesController = new NotesController();