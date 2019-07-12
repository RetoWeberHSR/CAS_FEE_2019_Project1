import Datastore  from 'nedb-promise'


export class NoteEntry {
    constructor(due, title, importance, description){
        this.nDue = due;
        this.nTitle = title;
        this.nImportance = importance;
        this.nFinished = false;
        this.nFinishedDate = null;
        this.nDescription = description;
        this.nCreationDate = new Date();
    }
}


export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/noteEntries.db', autoload: true });
    }

    async createModifyEntry(noteEntry) {
        if (noteEntry) {
            if ((noteEntry._id) && noteEntry._id !== 0){
                return await this.updateEntry(noteEntry);
            } else {
                const newNote = new NoteEntry(noteEntry.nDue, noteEntry.nTitle, noteEntry.nImportance, noteEntry.nDescription);
                return await this.db.insert(newNote);    
            }
        }
        return '{"error": "No note-entry has been delivert correctly"}';
    }

    async updateEntry(noteEntry) {
        noteEntry = validateFinishedAndSetsDate(noteEntry);
        await this.db.update({_id: noteEntry._id}, {
            $set: {
                "nDue": noteEntry.nDue,
                "nTitle": noteEntry.nTitle,
                "nImportance": noteEntry.nImportance,
                "nFinished": noteEntry.nFinished,
                "nDescription": noteEntry.nDescription,
                "nFinishedDate": noteEntry.nFinishedDate
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

function validateFinishedAndSetsDate(noteEntry){
    if (noteEntry.nFinished && noteEntry.nFinished === true) {
      if (!noteEntry.nFinishedDate) {
        noteEntry.nFinishedDate = new Date();
      }
    } else {
        noteEntry.nCreationDate = null;
    }
    return noteEntry;
}


export const noteStore = new NoteStore();