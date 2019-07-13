Handlebars.registerHelper("formatDate", function(datetime) {
    if (!datetime) {
        return "";
    } 
    const date = datetime.split('T')[0];
    return moment(date).format('DD.MM.YYYY');
});