import Datastore  from 'nedb-promise'


export class NoteEntry {
    constructor(key, due, title, importence, finished, description, creation){
        this._id = key;
        this.nDue = due;
        this.nTitle = title;
        this.nImportence = importence;
        this.nFinished = finished | false;
        this.nDescription = description;
        this.nCreationDate = creation | JSON.stringify(new Date());
    }
}


export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/noteEntries.db', autoload: true });
    }

    async addEntry(due, title, importence, finished, description) {
        let noteEntry = new NoteEntry(due, title, importence, finished, description);
        return await this.db.insert(noteEntry);    
    }

    async update(id, due, title, importence, finished, description) {
        await this.db.update({_id: id}, {
            $set: {
                "nDue": due,
                "ntitle": title,
                "nImportance": importence,
                "nFinished": finished,
                "nDescription": description
            }});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}


export const noteStore = new NoteStore();