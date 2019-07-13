
export class IndexController {
    constructor(model, view){
        this.model = model;
        this.view = view;
        this.noteTableContainer = this.view.getElementById("notetable-container");
        this.noteTableTemplate = Handlebars.compile(this.view.getElementById("notetable-template").innerHTML);
    }

    initEventHandler() {
        this.view.body.addEventListener("click", async (event) => {
            if (event.target.dataset.entry_key) {
                const noteKey = event.target.dataset.entry_key;
                // load entry to newNoteEntry view for modifing
                this.model.storeSessionEntryKey(noteKey);
                window.location.replace("noteEntry.html");
            }
            if (event.target.dataset.order_by) {
                const orderFlag = event.target.dataset.order_by;
                this.model.storeFlagOrderBy(orderFlag);
                await this.renderNoteTable();
            }
            if (event.target.dataset.show_finished) {
                const filterFlag = event.target.dataset.show_finished;
                this.model.storeFlagNoteFinished(filterFlag);
                await this.renderNoteTable();
            }
        });
    }

    init() {
        this.initStyle();
        this.initEventHandler();
        this.renderNoteTable();
    }

    initStyle() {
        this.view.getElementById("style_link").setAttribute("href", this.model.getCSSLink(null));
        this.model.getLastStoredStyleValue(this.view.getElementById("style_box"));

        this.view.getElementById("style_box").onchange = () => {
            this.view.getElementById("style_link").setAttribute("href", this.model.getCSSLink(this.view.getElementById("style_box")));
        };
    }

    async renderNoteTable(){
        const noteList = await this.model.getStoredEntries();
        this.noteTableContainer.innerHTML = this.noteTableTemplate(noteList);
    }

}

