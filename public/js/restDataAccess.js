const HEADERS = new Headers({'Content-Type': 'application/json'})

export class RestDataAccess {
   
    async getStoredEntries(allOrFinished) {
        const urlParam = (allOrFinished && allOrFinished === 'Finished') ? 'finished' : '';
        return await ajaxCall('GET', urlParam, undefined);
    }

    async storeEntry(noteEntry) {
        // send entry to the server
        return await ajaxCall('POST', '', noteEntry); 
    }

    async getEntry(entryId) {
        return await ajaxCall('GET', entryId, undefined); 
    }
    
    ajaxCall(method, urlParam, bodyData) {
        return fetch(`./rest/${urlParam}`, {
            method: method,
            headers: HEADERS,
            body: (bodyData) ?  `JSON.stringify(${bodyData})`: null
        }).then(response => {
            return response.json();
        });
    }

}