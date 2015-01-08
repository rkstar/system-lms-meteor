Meteor.publish('callbacks', function(){
    var sanitized = sanitizeQueryOptions(arguments)

    var query = !Meteor.users.findOne(this.userId).profile.isAdmin
        ? _.defaults(sanitized.query, {'salesperson._id':this.userId})
        : sanitized.query

    return Callbacks.find(query, sanitized.options)
})

Meteor.publish('callbacks_for_client', function( _id ){
    check(_id, String)

    return Callbacks.find({
        'client._id' : _id
    })
})