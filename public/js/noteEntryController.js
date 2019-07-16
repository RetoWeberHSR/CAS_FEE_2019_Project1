const DEFAULT_IMPORTANCE = '3';

export class NoteEntryController {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.formContainer = this.view.getElementById('form-container');
        this.formTemplate = Handlebars.compile(this.view.getElementById('form-template').innerHTML);
    }

    init() {
        this.view.getElementById("style_link").setAttribute("href", this.model.getCSSLink(null));
        this.renderEntryToUI();
        this.initEventHandler();
    }

    async renderEntryToUI() {
        const readNoteEntry = await this.model.getStoredEntryBySessionKey();
        const noteEntry = (readNoteEntry) ? readNoteEntry : new NewNoteEntry();
        this.formContainer.innerHTML = this.formTemplate(Array.of(noteEntry));
    }

    initEventHandler() { 
        this.view.getElementById('form_id').addEventListener('submit', async (event) => {
            event.preventDefault();
            let newEntry = this.mapInputToNoteEntry(event);
            await this.model.storeEntry(newEntry);
            window.location.replace('index.html');
        });
        this.view.getElementById("cancel_button").onclick = () => {
            window.location.replace('index.html');
        };
    }

    mapInputToNoteEntry(event) {
        const formData = new FormData(event.target);
        let newEntry = _mapInputToNoteEntry(formData);
        const finishedCheckbox = this.view.getElementById('nFinished');
        newEntry.nFinished = finishedCheckbox.checked;
        return newEntry;
    }
}

class NewNoteEntry {
    constructor(){
        this._id = null;
        this.nDue = null;
        this.nDescription = '';
        this.nTitle = '';
        this.nImportance = DEFAULT_IMPORTANCE;
        this.nFinished = false;
        this.nFinishedDate = null;
        this.nCreationDate = null; 
    }
}

function _mapInputToNoteEntry(form) {
    let noteEntry = new NewNoteEntry();
    for (const elementPair of form) {
        noteEntry[elementPair[0]] = elementPair[1];
    }
    return noteEntry;
}