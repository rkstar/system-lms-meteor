Meteor.publish('directory', function(){
    var options = _.defaults({
        fields : { _id:1, emails:1, profile:1, createdAt:1 }
    }, Publications.defaults.query.options)

    return Meteor.users.find({}, options)
})