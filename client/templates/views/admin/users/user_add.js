Template.user_add.helpers({
    primaryEmail : function(){
        return this.emails[0].address
    },

    isDisabled : function(){
        return Meteor.user().profile.isAdmin ? '' : 'disabled'
    }
})

Template.user_add.events({
    'submit form' : function(e){
        e.preventDefault()

        var form = $('form').serializeObject()
        if( !form.name || (form.name.length < 1) ){
            alert("You must enter a name.")
            return
        }

        if( !form.email || !Tools.valid.email(form.email) ) {
            alert("You must enter a valid email address.")
            return
        }

        if( !form.password || !form.confirm_password ){
            alert("You must choose a password and enter it correctly in both password fields.")
            return
        }
        if( form.password.length < 4 ){
            alert("Passwords must be at least 4 characters long.")
            return
        }
        if( form.password != form.confirm_password ){
            alert("Passwords must match.")
            return
        }

        var user_data = {
            email : form.email,
            password : form.password,
            profile : {
                name : form.name,
                isAdmin : (form.account_type === 'manager')
            }
        }

        Meteor.call('User_add', user_data, function(err, res){
            if( !err ){
                Router.go('/users/view/'+res.id)
            }
        })
    }
})