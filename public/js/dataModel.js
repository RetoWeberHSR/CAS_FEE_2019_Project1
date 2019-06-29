"use strict";

import { stylemodel } from './StyleSheetModule.js';

const datamodel = {

    getStoredEntries: function() {
        return _getStoredEntries();
    },

    createDataTable: function(entries) {
        return _createDataTable(entries);
    },

    storeEntries: function(listOfEntries) {
        _storeEntries(listOfEntries);
    },

    storeEntry: function(noteEntry) {
        _storeEntry(noteEntry);
    },

    loadSessionEntryKey: function() {
        let entryKey = sessionStorage.getItem("noteAppEntryKey");
        return _getEntryFromList(entryKey);
    },

    storeSessionEntryKey: function(noteKey) {
        sessionStorage.setItem("noteAppEntryKey", noteKey);
    },

    getCSSLink: function(styleSelectBoxId){
        // default selection value
        return stylemodel.getCSSLink(styleSelectBoxId);
    },

    getLastStoredStyleValue: function(styleSelectBoxId){
        return stylemodel.getStyleValue(styleSelectBoxId);
    }
};


function _getStoredEntries(){
    let noteEntryList = localStorage.getItem("noteAppEntries");
    if( !noteEntryList )
    {
        _storeEntries([]);
        noteEntryList = localStorage.getItem("noteAppEntries");
    }
    return JSON.parse(noteEntryList);
}

function _storeEntries(listOfEntries){
    localStorage.setItem("noteAppEntries", JSON.stringify(listOfEntries));
}

function _storeEntry(noteEntry){
    // send entry to the server
    fetch('http:/127.0.0.1.3201/', {
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