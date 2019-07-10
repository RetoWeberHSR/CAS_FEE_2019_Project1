class AppStorage {

    getSessionItem(key) {
        return sessionStorage.getItem(key);
    }

    setSessionItem(key, value) {
        sessionStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

    setItem(key, value) {
        localStorage.setItem(key, value);
    }
        
}

export const appStorage = new AppStorage();