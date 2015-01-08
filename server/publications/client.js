Meteor.publish('clients', function(){
    var sanitized = sanitizeQueryOptions(arguments)

    var query = !Meteor.users.findOne(this.userId).profile.isAdmin
        ? _.defaults(sanitized.query, {'salesperson._id':this.userId})
        : sanitized.query

    return Clients.find(query, sanitized.options)
})

Meteor.publish('single_client', function( id ){
    check(id, String)

    return Clients.find(id)
})