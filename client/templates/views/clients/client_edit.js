Template.client_edit.helpers({
    salesperson : function(){
        var list = []
        var self = this
        Meteor.users.find({}, {$sort:{'profile.name':1}}).forEach(function(user){
            user.isSelected = (user._id === self.salesperson._id) ? "selected" : ""
            list.push(user)
        })

        return list
    },

    isDisabled : function(){
        return Meteor.user().profile.isAdmin ? "" : "disabled"
    }
})

Template.client_edit.events({
    'click .btn-save' : function(e){
        e.preventDefault()

        var context = Blaze.getData()
        var form = $('form').serializeObject()
        var client_data = _.extend(form, {
            _id : context._id,
            updatedAt : new Date(),
            signedUp : ((form.status==Config.client.status.sold) && (context.status!=Config.client.status.sold)) ? new Date() : null
        })
        if( Meteor.user().profile.isAdmin ){
            client_data.salesperson = {
                _id : form.salesperson,
                name : Meteor.users.findOne(form.salesperson).profile.name
            }
        }

        Meteor.call('Client_edit', client_data, function(err, res){
            if( err ){
                throw Meteor.Error(err.error, err.reason)
            }
            // we have a result -- let's look at the profile
            Router.go('/clients/view/'+res.id)
        })
    },

    'click .btn-cancel' : function(e){
        e.preventDefault()

        window.history.back()
    }
})