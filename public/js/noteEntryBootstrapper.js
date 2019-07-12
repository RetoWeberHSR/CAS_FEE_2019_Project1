
import { AppStorage } from './appStorage.js'
import { NoteEntryController } from './noteEntryController.js'
import { Model } from './model.js'
import { RestDataAccess } from './restDataAccess.js'
import { StyleModel } from './styleSheetModel.js'

export class IndexBootstrapper {
    static start() {
        const dataAccess = new RestDataAccess();
        const appStorage = new AppStorage();
        const styleModel = new StyleModel(appStorage);
        const model = new Model(dataAccess, appStorage, styleModel);
        new NoteEntryController(model, document).init();
    }
}

document.addEventListener('DOMContentLoaded', IndexBootstrapper.start());