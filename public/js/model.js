
const SESSION_NOTE_ENTRY_KEY = 'noteAppEntryKey';
const SESSION_ORDERBY_KEY = 'noteAppOrderBy'
const SESSION_NOTE_FINISHED = 'noteAppFinished'

export class Model {

    constructor(dataAccess, appStorage, styleModel){
        this.dataAccess = dataAccess;
        this.appStorage = appStorage;
        this.styleModel = styleModel;
    };

    async getStoredEntries() {
        const allOrFinished = this.getStoredFlagFinished();
        const entries = await this.dataAccess.getStoredEntries(allOrFinished);
        const orderBySetting = this.getStoredFlagOrderBy();
        return _sortEntries(entries, orderBySetting);
    }

    async storeEntry(noteEntry) {
        await this.dataAccess.storeEntry(noteEntry);
    }

    async getStoredEntryBySessionKey() {
        const entryKey = this.appStorage.getSessionItem(SESSION_NOTE_ENTRY_KEY);
        return await this.dataAccess.getEntry(entryKey);
    }

    storeSessionEntryKey(noteKey) {
        this.appStorage.setSessionItem(SESSION_NOTE_ENTRY_KEY, noteKey);
    }

    storeFlagOrderBy(orderBy) {
        this.appStorage.setSessionItem(SESSION_ORDERBY_KEY, orderBy);
    }

    getStoredFlagOrderBy() {
        const orderByFlag = this.appStorage.getSessionItem(SESSION_ORDERBY_KEY);
        return (orderByFlag) ? orderByFlag : 'creation_date';
    }    

    getStoredFlagFinished() {
        return this.appStorage.getSessionItem(SESSION_NOTE_FINISHED);
    }

    toggleFlagFinished() {
        const storedFlag = this.getStoredFlagFinished();
        const isAlreadyActivated = ((storedFlag) && (storedFlag === 'finished'));
        const allOrFinished = (isAlreadyActivated) ? 'all' : 'finished';
        this.appStorage.setSessionItem(SESSION_NOTE_FINISHED, allOrFinished);
    }

    getCSSLink(styleSelectBoxId) {
        return this.styleModel.getCSSLink(styleSelectBoxId);
    }

    getLastStoredStyleValue(styleSelectBoxId){
        return this.styleModel.getStyleValue(styleSelectBoxId);
    }
}

function _sortEntries(entries, orderBy) { 
    if (orderBy == 'finished') {
        // sort only finished with finished dates descending.
        const finishedNotes = entries.filter(entry => entry.nFinished === true);
        const notFinished = entries.filter(entry => entry.nFinished !== true);
        return finishedNotes.sort((a, b) => (a.nFinishedDate > b.nFinishedDate) ? -1 : 0).concat(notFinished);
    }
    else if (orderBy == 'importance'){
        // sort descending
        return entries.sort((a, b) => (a.nImportance > b.nImportance) ?  -1 : 0);
    }
    else {
        // orderBy == 'creation_date'
        return entries.sort((a, b) => (a.nCreationDate < b.nCreationDate) ? -1 : 0) ;
    }
}
