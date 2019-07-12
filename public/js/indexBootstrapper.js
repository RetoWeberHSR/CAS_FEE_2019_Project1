
import { AppStorage } from './appStorage.js'
import { IndexController } from './indexController.js'
import { Model } from './model.js'
import { RestDataAccess } from './restDataAccess.js'
import { StyleModel } from './styleSheetModel.js'

export class IndexBootstrapper {
    static start() {
        const dataAccess = new RestDataAccess();
        const appStorage = new AppStorage();
        const styleModel = new StyleModel(appStorage);
        const model = new Model(dataAccess, appStorage, styleModel);
        new IndexController(model, document).init();
    }
}

//document.addEventListener('DOMContentLoaded', async () => await IndexBootstrapper.start());
document.addEventListener('DOMContentLoaded', IndexBootstrapper.start());