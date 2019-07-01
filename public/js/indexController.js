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
                const noteKey = event.target.dataset.entry_key;
                // load entry to newNoteEntry view for modifing
                model.storeSessionEntryKey(noteKey);
                window.location.replace("newNoteEntry.html");
            }
            if (event.target.dataset.order_by) {
                const orderFlag = event.target.dataset.order_by;
                model.storeOrderBy(orderFlag);
                window.location.replace("index.html");
            }
        });

    },

    getStoredEntries: function () {
         return model.getStoredEntries();
    }

    
};

export  { Controller }

