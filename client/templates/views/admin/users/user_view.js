Template.user_view.helpers({
    primaryEmail : function(){
        return this.emails[0].address
    },

    labelClassName : function(){
        return (this.profile.isAdmin)
            ? 'success'
            : 'default'
    },

    labelText : function(){
        return (this.profile.isAdmin)
            ? 'manager'
            : 'sales rep'
    }
})

Template.user_view.events({
    'click .btn-edit' : function(e, template){
        e.preventDefault()

        Router.go('/users/edit/'+template.data._id)
    }
})