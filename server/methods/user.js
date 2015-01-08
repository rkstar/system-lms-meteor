Meteor.methods({
    'User_add' : function( user ){

        check(user, Object)

        //
        // do some validation
        //

        if( Meteor.users.find({'emails.address' : {$regex:user.email,$options:'i'}}).count() > 0 ){
            throw new Meteor.Error(500, 'user already exists.')
        }

        var id = Accounts.createUser(_.defaults(user, {
            email : 'asdf@asdf.com',
            password : 'password',
            profile : {
                name : 'unknown name',
                isAdmin : false
            }
        }))
        if( !id ){
            throw new Meteor.Error(500, 'could not add user.')
        }

        return { id:id }
    },

    'User_edit' : function( user ){

        check(user, Object)

        //
        // do some validation
        //

        var id = user._id
        delete user._id

        if( user.password ){
            var passwd = user.password
            delete user.password
            Accounts.setPassword(id, passwd)
        }

        if( user.emails && user.emails[0].address ){
            if( Meteor.users.find({'emails.address' : {$regex:user.emails[0].address,$options:'i'}}).count() > 0 ){
                throw new Meteor.Error(500, 'user already exists.')
            }
        }

        var affected = Meteor.users.update(id, {$set:user})
        if( affected != 1 ){
            throw new Meteor.Error(500, 'somefing else wong')
        }

        return {
            id : id,
            affected : affected
        }
    }
})