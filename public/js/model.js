
const SESSION_NOTE_ENTRY_KEY = "noteAppEntryKey";
const SESSION_ORDERBY_KEY = "noteAppOrderBy"
const SESSION_NOTE_FINISHED = "noteAppFinished"

export class Model {

    constructor(dataAccess, appStorage, styleModel){
        this.dataAccess = dataAccess;
        this.appStorage = appStorage;
        this.styleModel = styleModel;
    };

    async getStoredEntries() {
        const allOrFinished = this.appStorage.getSessionItem(SESSION_NOTE_FINISHED);
        const entries = await this.dataAccess.getStoredEntries(allOrFinished);
        return _sortEntries(entries);
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

    storeFlagOrderBy(orderBy) {
        this.appStorage.setSessionItem(SESSION_ORDERBY_KEY, orderBy);
    }

    storeFlagNoteFinished(allOrFinished) {
        this.appStorage.setSessionItem(SESSION_NOTE_FINISHED, allOrFinished);
    }

    getCSSLink(styleSelectBoxId) {
        return this.styleModel.getCSSLink(styleSelectBoxId);
    }

    getLastStoredStyleValue(styleSelectBoxId){
        return this.styleModel.getStyleValue(styleSelectBoxId);
    }
}

function _sortEntries(entries) {
    const orderBy = this.appStorage.getSessionItem(SESSION_ORDERBY_KEY); 
    let entriesSorted;
    if (orderBy == 'finished'){
        // sort only finished with finished dates ascending.
        entriesSorted = entries.filter(entry => entry.nfinished === true).sort((a, b) => (a.nfinishedDate < b.nfinishedDate) ? 1 : 0);
    }
    else if (orderBy == 'importance'){
        // sort desending
        entriesSorted = entries.sort((a, b) => (a.nImportance < b.nImportance) ?  -1 : 0);
    }
    else {
        // orderBy == 'creation_date'
        entriesSorted =entries.sort((a, b) => (a.nCreationDate < b.nCreationDate) ? -1 : 0) ;
    }
    return entriesSorted;
}

