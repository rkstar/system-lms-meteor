Meteor.publish('appointments', function(){
    var sanitized = sanitizeQueryOptions(arguments)

    var query = !Meteor.users.findOne(this.userId).profile.isAdmin
        ? _.defaults(sanitized.query, {'salesperson._id':this.userId})
        : sanitized.query

    return Appointments.find(query, sanitized.options)
})

Meteor.publish('appointments_for_client', function( _id ){
    check(_id, String)

    return Appointments.find({
        'client._id' : _id
    })
})