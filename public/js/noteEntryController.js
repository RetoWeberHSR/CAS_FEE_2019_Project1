
export class NoteEntryController {
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    init() {
        this.view.getElementById("style_link").setAttribute("href", this.model.getCSSLink(null));
        let entry = this.model.getStoredEntryBySessionKey();
        renderEntryToUI(this.view, entry);

        // save
        this.view.querySelector("#form_id").onsubmit = function () {
            //view.getElementById("save_button").onclick = function (){
            //const entry = getRenderedEntry(view);
            //model.storeEntry(entry);
            window.location.replace("index.html");
        };
        // cancel
        this.view.getElementById("cancel_button").onclick = function () {
            window.location.replace("index.html");
        };
    }
}

class NoteEntry {
    constructor(key, due, title, importance, finished, finishedDate, description, creation){
        this._id = key;
        this.nDue = due;
        this.nTitle = title;
        this.nImportance = importance;
        this.nFinished = finished | false;
        this.nFinishedDate = finishedDate;
        this.nDescription = description;
        this.nCreationDate = creation | JSON.stringify(new Date());
    }
}

function getRenderedEntry(view) {
    let entry = new NoteEntry();
    const entryId = view.getElementById("entry_key").value;
    if (entryId && entryid !== 0 && entryId != '0') {
        entry._id = view.getElementById("entry_key").value;
    }   
    entry.nDue = view.getElementById("done_until").value;
    entry.nTitle = view.getElementById("title").value;
    entry.nImportence = view.getElementById("importance").value;
    entry.nFinished = view.getElementById("task_finished").value;
    entry.nDescription = view.getElementById("description").value;
    entry.nCreationDate = view.getElementById("creation_date").value;
    return entry;
}

function renderEntryToUI(view, entry){
    if (entry !== undefined){
        view.getElementById("entry_key").value = entry._id;
        view.getElementById("done_until").value = entry.nDue;
        view.getElementById("title").value = entry.nTitle;
        view.getElementById("importance").value = entry.nImportence;
        view.getElementById("task_finished").value = entry.nFinished;
        view.getElementById("description").value = entry.nDescription;
        view.getElementById("creation_date").value = entry.nCreationDate;
    }
}