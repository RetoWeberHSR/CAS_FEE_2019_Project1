import { model } from './model.js';

export let indexController;
export class IndexController  {
    constructor(view){
        this.view = view;
    }

    static bootstrap(view) {
        indexController = new IndexController(view);

        // sollte das in der Klasse oder im Konstruktor sein?
        // kann ich die async function direkt hier in der static function aufrufen?
        view.getElementById("style_link").setAttribute("href", model.getCSSLink(null));
        model.getLastStoredStyleValue(view.getElementById("style_box"));

        view.getElementById("style_box").onchange = function() {
            view.getElementById("style_link").setAttribute("href", model.getCSSLink(view.getElementById("style_box")));
        };

        view.body.addEventListener("click", function(event) {
            if (event.target.dataset.entry_key) {
                const noteKey = event.target.dataset.entry_key;
                // load entry to newNoteEntry view for modifing
                model.storeSessionEntryKey(noteKey);
                window.location.replace("noteEntry.html");
            }
            if (event.target.dataset.order_by) {
                const orderFlag = event.target.dataset.order_by;
                model.storeOrderBy(orderFlag);
                window.location.replace("index.html");
            }
            if (event.target.dataset.show_finished) {

            }
        });

    }

    async getStoredEntries() {
         return await model.getStoredEntries();
    }

}

document.addEventListener('DOMContentLoaded', IndexController.bootstrap);

