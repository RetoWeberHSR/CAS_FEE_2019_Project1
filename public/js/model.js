import { styleModel } from './styleSheetModel.js';
import { dataAccess } from './dataAccess.js';
import { appStorage } from './appStorage.js';

const SESSION_NOTE_ENTRY_KEY = "noteAppEntryKey";
const SESSION_ORDERBY_KEY = "noteAppOrderBy"
const SESSION_NOTE_FINISHED = "noteAppFinished"

export class Model {

    constructor(dataAccess, appStorage){
        this.dataAccess = dataAccess;
        this.appStorage = appStorage;
    };

    async getStoredEntries() {
        const entries = await this.dataAccess.getStoredEntries();
        return _sortOrFilterEntries(entries);
    }

    async storeEntry(noteEntry) {
        await this.dataAccess.storeEntry(noteEntry);
    }

    async loadSessionEntryKey() {
        const entryKey = this.appStorage.getSessionItem(SESSION_NOTE_ENTRY_KEY);
        return await this.dataAccess.getEntry(entryKey);
    }

    storeSessionEntryKey(noteKey) {
        this.appStorage.setSessionItem(SESSION_NOTE_ENTRY_KEY, noteKey);
    }

    storeOrderBy(orderBy) {
        this.appStorage.setSessionItem(SESSION_ORDERBY_KEY, orderBy);
    }

    storeNoteFinished(mode) {
        this.appStorage.setSessionItem(SESSION_NOTE_FINISHED, mode);
    }

    getCSSLink(styleSelectBoxId) {
        // default selection value
        return styleModel.getCSSLink(styleSelectBoxId);
    }

    getLastStoredStyleValue(styleSelectBoxId){
        return styleModel.getStyleValue(styleSelectBoxId);
    }
}

function _sortOrFilterEntries(entries) {
    const orderBy = this.appStorage.getSessionItem(SESSION_ORDERBY_KEY); 
    let filteredEntries = _filterEntries(entries);  
    let entriesSorted;
    // sorting
    if (orderBy == 'finished'){
        entriesSorted = filteredEntries;
    }
    else if (orderBy == 'importance'){
        entriesSorted =filteredEntries;
    }
    else {
        // orderBy == 'creation_date'
        entriesSorted = filteredEntries;
    }
    return entriesSorted;
}

function _filterEntries(entries) {
    const filterFinished = this.appStorage.getSessionItem(SESSION_NOTE_FINISHED); 
    if (filterFinished == 'show_finished'){
        return entries.filter(entry => entry.nFinished === true);
    } else {
        // show all
        return entries;
    }
}

export const model = new Model(dataAccess, appStorage);
