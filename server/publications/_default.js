Publications = {
    defaults : {
        recent : {
            value : 45,
            interval : 'days'
        },
        query : {
            options : {
                $sort : {
                    createdAt : -1,
                    updatedAt : -1
                }
            }
        }
    }
}
var _d = moment().subtract(Publications.defaults.recent.value, Publications.defaults.recent.interval).startOf('day')._d
Publications.defaults.back_to = {
    _d : _d,
    _ms : _d.getTime()
}
Publications.defaults.query.base = {
    createdAt : {
        "$gte" : Publications.defaults.back_to._d
    }
}

sanitizeQueryOptions = function() {
    // create a query based on arguments passed by the publish
    // functions
    var defs = {back_to : Publications.defaults.back_to._ms}
    var args = (arguments[0]) ? _.defaults(arguments[0],defs) : defs

    // create a base query and delete the argument so we can use it for
    // query options
    var query = (args.back_to > 0) ? {createdAt:{"$gte":new Date(args.back_to)}} : {}
    delete args.back_to

    var options = _.defaults(args, Publications.defaults.query.options)

    return {
        query : query,
        options : options
    }
}