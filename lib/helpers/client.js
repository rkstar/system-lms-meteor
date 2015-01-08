UI.registerHelper('clientStatusOptions', function(){
    var context = (arguments[0]) ? arguments[0] : ''
    var opts = [{
        value : Config.client.status.sold,
        display : 'sold'
    }, {
        value : Config.client.status.assigned,
        display : 'assigned'
    }, {
        value : Config.client.status.not_interested,
        display : 'not interested'
    }]
    return findSelectedOption(context, opts)
})

UI.registerHelper('clientSourceOptions', function(){
    var context = (arguments[0]) ? arguments[0] : ''
    var keys = _.keys(Config.client.source)
    var opts = []
    _.each(keys, function(key){
        opts.push({
            value : key,
            display : Config.client.source[key]
        })
    })
    return findSelectedOption(context, opts)
})

UI.registerHelper('clientTermOptions', function(){
    var context = (arguments[0]) ? arguments[0] : ''
    var opts = [{
        value : 'monthly',
        display : 'Monthly'
    }, {
        value : 'yearly',
        display : 'Yearly'
    }]
    return findSelectedOption(context, opts)
})

findSelectedOption = function(context, opts){
    var ret = []
    _.each(opts, function(option){
        ret.push(_.defaults({
            isSelected: (context == option.value) ? 'selected' : ''
        }, option))
    })
    return ret

}