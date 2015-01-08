Template.user_edit.helpers({
    primaryEmail : function(){
        return this.emails[0].address
    },

    isDisabled : function(){
        return Meteor.user().profile.isAdmin ? '' : 'disabled'
    }
})

Template.user_edit.events({
    'submit form' : function(e, template){
        e.preventDefault()

        var data = template.data
        var form = $('form').serializeObject()
        var user_data = {
            _id: template.data._id
        }
        if( form.email && (form.email != data.emails[0].address) ) {
            user_data.emails = [{
                address : form.email
            }]
        }
        if( form.name && (form.name != data.profile.name) ) {
            user_data['profile.name'] = form.name
        }
        var acct_type = (data.profile.isAdmin) ? 'manager' : 'sales_rep'
        if( form.account_type && (form.account_type != acct_type) ) {
            user_data['profile.isAdmin'] = (form.account_type=='manager')
        }
        if( form.password && form.confirm_password
        && (form.password.length > 0)
        && (form.password == form.confirm_password) ) {
            user_data.password = form.password
        }

        Meteor.call('User_edit', user_data, function(err, res){
            if( !err ){
                Router.go('/users/view/'+res.id)
            }
        })
    }
})