import {noteStore as store} from "../services/store_noteEntries";

const actor = "somebody";

export class NotesController {
    
    async getNoteEntries(req, res) {
        res.json((await store.all(actor) || []));
    };

    async getNoteEntry(req, res){
        res.json(await store.get(req.params.id, actor));
    };

    async addEntry(req, res) {
        res.json(await store.add(req.body.name, actor));
    };

    async updateEntry(req, res) {
        res.json(await store.update(req.body.name, actor));
    };
}

export const notesController = new NotesController();