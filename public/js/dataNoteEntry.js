"use strict";

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
