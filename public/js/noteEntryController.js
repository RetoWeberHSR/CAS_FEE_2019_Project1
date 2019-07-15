
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
        this.view.getElementById('form_id').onsubmit = function () {
            //view.getElementById("save_button").onclick = function (){
            //const entry = getRenderedEntry(view);
            //model.storeEntry(entry);
            window.location.replace('index.html');
        };
        this.view.getElementById("cancel_button").onclick = function () {
            window.location.replace('index.html');
        };
    }
}

class NewNoteEntry {
    constructor(){
        this.nDue = '';
        this.nTitle = '';
        this.nImportance = '3';
        this.nFinished = false;
        this.nFinishedDate = '';
        this.nDescription = '';   
    }
}