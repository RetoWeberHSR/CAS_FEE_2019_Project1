"use strict";

import { datamodel as model } from './dataModel.js';
import { NoteEntry } from './dataNoteEntry.js';


const Controller = {
    bootstrap: function (view) {
        view.getElementById("style_link").setAttribute("href", model.getCSSLink(null));
        let entry = model.loadSessionEntryKey();
        renderEntryToUI(view, entry);

        // save
        view.querySelector("form_id").onsubmit = function () {
            //view.getElementById("save_button").onclick = function (
            //const entry = getRenderedEntry(view);
            //model.storeEntry(entry);
            window.location.replace("index.html");
        };
        // cancel
        view.getElementById("cancel_button").onclick = function () {
            window.location.replace("index.html");
        };
    }
};

function getRenderedEntry(view) {
    let entry = new NoteEntry()
    entry._id = view.getElementById("entry_key").value;
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

export { Controller }