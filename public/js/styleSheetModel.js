
// module to manage styles
const NOTE_APP_STYLE_STORE_VALUE = 'noteAppStyleVal';

export class StyleModel {

    constructor(appStorage) {
        this.appStorage = appStorage;
    }

    getCSSLink(styleSelectBoxId) {
        let selectedValue;
        if (styleSelectBoxId !== null){
            selectedValue = styleSelectBoxId.options[styleSelectBoxId.selectedIndex].value;
        } else {
            // get previous selected style value if it has already been set.
            selectedValue = this.getStyleValue(styleSelectBoxId);
        }
        this.appStorage.setItem(NOTE_APP_STYLE_STORE_VALUE, selectedValue);
        return _convertSelectionValueToStyleLink(selectedValue);
    }

    getStyleValue(styleBoxId) {
        const storedStyle = this.appStorage.getItem(NOTE_APP_STYLE_STORE_VALUE);
        if (storedStyle !== undefined && storedStyle !== null && storedStyle != ""){
            if (styleBoxId !== null) {
                styleBoxId.value = storedStyle;
            }
            return storedStyle;
        }
        // set default style value
        return 'white';
    }
}

function _convertSelectionValueToStyleLink(selectedValue){
    let style;
    if (selectedValue == 'green') {
        style = 'css/stylesheetGreen.css';
    }
    if (selectedValue == 'white') {
        style = 'css/stylesheetWhite.css';
    }
    return style;
}