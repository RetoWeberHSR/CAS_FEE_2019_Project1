
export class IndexController {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.noteTableContainer = this.view.getElementById('notetable-container');
        this.noteTableTemplate = Handlebars.compile(this.view.getElementById('notetable-template').innerHTML);
    }

    initEventHandler() {
        this.view.body.addEventListener('click', async (event) => {
            if (event.target.dataset.entry_key) {
                const noteKey = event.target.dataset.entry_key;
                // load entry to newNoteEntry view for modifing
                this.model.storeSessionEntryKey(noteKey);
                window.location.replace('noteEntry.html');
            }
            if (event.target.dataset.order_by) {
                const orderFlag = event.target.dataset.order_by;
                this.model.storeFlagOrderBy(orderFlag);
                this.setButtonStates();
                await this.renderNoteTable();
            }
            if (event.target.dataset.show_finished) {
                this.model.toggleFlagFinished();
                this.setButtonStates();
                await this.renderNoteTable();
            }
        });
    }

    init() {
        this.initStyle();
        this.initEventHandler();
        this.renderNoteTable();
        this.setButtonStates();
    }

    initStyle() {
        this.view.getElementById('style_link').setAttribute('href', this.model.getCSSLink(null));
        this.model.getLastStoredStyleValue(this.view.getElementById('style_box'));

        this.view.getElementById('style_box').onchange = () => {
            this.view.getElementById('style_link').setAttribute('href', this.model.getCSSLink(this.view.getElementById('style_box')));
        };
    }

    setButtonStates() {
        const orderByFlag = this.model.getStoredFlagOrderBy();
        this.orderByStateHandling(orderByFlag);
        
        const finishedFlag = this.model.getStoredFlagFinished();
        const showFinishedButton = this.view.querySelector('[data-show_finished]');
        if (finishedFlag === 'finished') {
            showFinishedButton.classList.add('selected');
        } else {
            showFinishedButton.classList.remove('selected');
        }
    }

    orderByStateHandling(orderFlag) {
        const btnFinished = this.view.querySelector('[data-order_by="finished"]');
        const btnCreationDate = this.view.querySelector('[data-order_by="creation_date"]');
        const btnImportance = this.view.querySelector('[data-order_by="importance"]');
        if (orderFlag === 'finished') {
            btnFinished.classList.add('selected');
        } else {
            btnFinished.classList.remove('selected');
        }
        if (orderFlag === 'creation_date') {
            btnCreationDate.classList.add('selected');
        } else {
            btnCreationDate.classList.remove('selected');
        }
        if (orderFlag === 'importance') {
            btnImportance.classList.add('selected');
        } else {
            btnImportance.classList.remove('selected');
        }
    }



    async renderNoteTable() {
        const noteList = await this.model.getStoredEntries();
        this.noteTableContainer.innerHTML = this.noteTableTemplate(noteList);
    }

}

