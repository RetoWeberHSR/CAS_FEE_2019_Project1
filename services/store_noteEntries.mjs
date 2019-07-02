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

    async createModifyEntry(noteEntry) {
        console.log(noteEntry);
        if (noteEntry) {
            if ((noteEntry._id) && noteEntry._id !== 0){
                console.log(`update ${noteEntry}`);
                return await this.updateEntry(noteEntry);
            } else {
                console.log(`create ${noteEntry}`);
                return await this.db.insert(noteEntry);    
            }
        }
        return '{"error": "No note-entry has been delivert"}';
    }

    async updateEntry(noteEntry) {
        await this.db.update({_id: noteEntry._id}, {
            $set: {
                "nDue": noteEntry.nDue,
                "nTitle": noteEntry.nTitle,
                "nImportance": noteEntry.nImportence,
                "nFinished": noteEntry.nFinished,
                "nDescription": noteEntry.nDescription
            }});
        return await this.getEntry(noteEntry._id);
    }

    async getEntry(entryId) {
        return await this.db.findOne({_id: entryId});
    }

    async allEntries() {
        return await this.db.find({});
    }
}


export const noteStore = new NoteStore();