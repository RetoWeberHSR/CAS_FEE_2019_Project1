const HEADERS = new Headers({'Content-Type': 'application/json'})

class DataAccess {
   
    async getStoredEntries() {
        console.log('start fetching entries');
        return await ajaxCall('GET', '', undefined);
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
            headers: HEADERS
            (bodyData) ? `, body: JSON.stringify(${bodyData})`: ''
        }).then(response => {
            return response.json();
        });
    }

}

export const dataAccess = new DataAccess();