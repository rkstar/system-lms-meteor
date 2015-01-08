Template.login.events({
    'click .close' : function(e){
        e.preventDefault()
        $('#login_error').hide()
    },

    'submit form' : function(e){
        e.preventDefault()

        var email = $('#email').val().trim(),
            passwd = $('#password').val().trim()

        // simple validation checks
        if( !Tools.valid.email(email) || (passwd.length < 4) ){
            $("#login_error").show()
            return false
        }

        Meteor.loginWithPassword(email, passwd, function(err){
            if( err ){
                $('#login_error_msg').html(err.reason)
                $('#login_error').show()
            } else {
                Router.go('dashboard')
            }
        })

        return false
    }
})