"use strict";

import { datamodel as model } from './dataModel.js';


const Controller = {
    bootstrap: function (view) {
        view.getElementById("style_link").setAttribute("href", model.getCSSLink(null));
        model.getLastStoredStyleValue(view.getElementById("style_box"));

        view.getElementById("style_box").onchange = function() {
            view.getElementById("style_link").setAttribute("href", model.getCSSLink(view.getElementById("style_box")));
        };

        view.body.addEventListener("click", function(event) {
            if (event.target.dataset.entry_key) {
                let noteKey = event.target.dataset.entry_key;
                // load entry to newNoteEntry view for modifing
                model.storeSessionEntryKey(noteKey);
                window.location.replace("newNoteEntry.html");
            }
            if (event.target.dataset.order_by) {
                let orderBy = event.target.dataset.order_by.value;
                if (orderBy == "finished"){

                }
                if (orderBy == "creationdate"){

                }
                if (orderBy == "importance"){

                }
                if (orderBy == "show_finished"){

                }
            }
        });

    },

    getStoredEntries: function () {
         return model.getStoredEntries();
    }
};

export  { Controller }

