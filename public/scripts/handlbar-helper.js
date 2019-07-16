Handlebars.registerHelper("formatDate", function(datetime) {
    if (datetime) {
        const date = getDateFromDateTime(datetime);
        return moment(date).format('DD.MM.YYYY');
    }
    return "";
});

Handlebars.registerHelper("isoDate", function(datetime) {
    if (datetime) {
        return getDateFromDateTime(datetime);
    }
    return "";
});

function getDateFromDateTime(dateTime) {
    return dateTime.toString().split('T', 1)[0];
}

Handlebars.registerHelper("selected", function(value1, value2) {
    if (value1 === value2) {
        return "selected";
    }
    return "";
});

Handlebars.registerHelper("checked", function(booleanValue) {
    if (booleanValue === true) {
        return "checked";
    }
    return "";
});