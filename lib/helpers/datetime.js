UI.registerHelper('lastWeek', function( formatted ){
    var d = moment().subtract(7,'days')
    return (formatted) ? moment(d).format('ll') : d
})

UI.registerHelper('today', function( formatted ){
    var d = new Date()
    d.setHours(0,0,0,0)
    return (formatted) ? moment().format('ll') : d
})

UI.registerHelper('tomorrow', function( formatted ){
    var d = moment().add(1,'day')
    return (formatted) ? moment(d).format('ll') : d
})

UI.registerHelper('formatDate', function( d ){
    var fmt = arguments[1] && (arguments[1].length > 0) ? arguments[1] : 'll'
    return (d && (d.getTime() > 0)) ? moment(d).format(fmt) : 'never'
})