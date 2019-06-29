// module to manage used styles

const noteAppStyleStoreVal = 'noteAppStyleVal';

const stylemodel = {
    getCSSLink: function (styleSelectBoxId) {
        return _getCSSLink(styleSelectBoxId);

    },
    getStyleValue: function (styleBoxId) {
        return _getLastSelectedStyleValueAndSetItToSelectBox(styleBoxId);
    }
}

function _getCSSLink(styleSelectBoxId){
    // default selection value
    let selectedValue;
    let style;
    if (styleSelectBoxId !== null){
        selectedValue = styleSelectBoxId.options[styleSelectBoxId.selectedIndex].value;
    } else {
        // get previous selected style value if it has already been set.
        selectedValue = _getLastSelectedStyleValueAndSetItToSelectBox(styleSelectBoxId);
    }
    _storeStyleValue(selectedValue);
    return _convertSelectionValueToStyleLink(selectedValue);
}

function _storeStyleValue(styleValue){
    localStorage.setItem(noteAppStyleStoreVal, styleValue);
}

function _getLastStoredStyleValue(){
    return localStorage.getItem(noteAppStyleStoreVal);
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

function _getLastSelectedStyleValueAndSetItToSelectBox(styleBoxId){
    let storedStyle = _getLastStoredStyleValue();
    if (storedStyle !== undefined && storedStyle !== null && storedStyle != ""){
        if (styleBoxId !== null) {
            styleBoxId.value = storedStyle;
        }
        return storedStyle;
    }
    // set default style value
    return "white";
}

/**
 * Exposed API facilities.
 */
export  { stylemodel };