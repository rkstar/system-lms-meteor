Template.client_add.helpers({
    salesperson : function(){
        var list = Meteor.users.find({}, {$sort:{'profile.name':-1}})
        var modList = []
        list.forEach(function(user){
            user.isSelected = (user._id === Meteor.userId()) ? "selected" : ""
            modList.push(user)
        })

        return modList
    },

    isDisabled : function(){
        return Meteor.user().profile.isAdmin ? "" : "disabled"
    }
})

Template.client_add.events({
    'click .btn-save' : function(e){
        e.preventDefault()


        var form = $('form').serializeObject()
        var client_data = _.extend(form, {
            createdAt : new Date(),
            updatedAt : new Date(),
            signedUp : (form.status==Config.client.status.sold) ? new Date() : null,
            salesperson : (Meteor.user().profile.isAdmin)
            ? {
                _id : form.salesperson,
                name : Meteor.users.findOne(form.salesperson).profile.name
            } : {
                _id : Meteor.userId(),
                name : Meteor.user().profile.name
            }
        })

        Meteor.call('Client_add', client_data, function(err, res){
            if( err ){
                throw Meteor.Error(err.error, err.reason)
            }
            // we have a result -- let's look at the profile
            Router.go('/clients/view/'+res.id)
        })
    }
})