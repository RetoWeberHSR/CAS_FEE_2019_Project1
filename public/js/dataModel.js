"use strict";

import { stylemodel } from './StyleSheetModule.js';

const sessionNoteEntryKey = "noteAppEntryKey";
const sessionOrderByKey = "noteAppOrderBy"

const datamodel = {

    getStoredEntries: function() {
        return _getStoredEntries();
    },

    storeEntry: function(noteEntry) {
        _storeEntry(noteEntry);
    },

    loadSessionEntryKey: function() {
        let entryKey = sessionStorage.getItem(sessionNoteEntryKey);
        return _getEntryFromList(entryKey);
    },

    storeSessionEntryKey: function(noteKey) {
        sessionStorage.setItem(sessionNoteEntryKey, noteKey);
    },

    storeOrderBy: function(orderBy) {
        sessionStorage.setItem(sessionOrderByKey, orderBy);
    },

    getCSSLink: function(styleSelectBoxId){
        // default selection value
        return stylemodel.getCSSLink(styleSelectBoxId);
    },

    getLastStoredStyleValue: function(styleSelectBoxId){
        return stylemodel.getStyleValue(styleSelectBoxId);
    }
};


function _getStoredEntries(entries){
    return fetch('./rest/', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(function(response) {
        return _sortOrFilterEntries(response.json());
    });
}

function _sortOrFilterEntries(entries) {
    const orderBy = sessionStorage.getItem(sessionOrderByKey);
    let entriesSorted;
    // TODO catch error => JSON.parse etc.
    if (orderBy == 'finished'){
        entriesSorted = entries;
    }
    else if (orderBy == 'importance'){
        entriesSorted = entries;
    }
    else if (orderBy == 'show_finished'){
        entriesSorted = entries.filter(entry => entry.nFinished === true);
    } else {
        // orderBy == 'creation_date'
        entriesSorted = entries;
    }
    return entriesSorted;
}

function _storeEntry(noteEntry){
    // send entry to the server
    fetch('./rest/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(noteEntry)
    }).then(function(res) {
        console.log(res);
    });
}

function _getEntryFromList(searchKey) {
    let noteEntries = _getStoredEntries();
    if (searchKey !== undefined && searchKey > 0){
        for (let i = 0; i < noteEntries.length; i++){
            let entryKey = noteEntries[i]._id;
            if (searchKey == entryKey){
                return noteEntries[i];
            }
        }
    }
}

export { datamodel }