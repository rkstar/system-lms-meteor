Meteor.methods({
    'Client_add' : function( client ) {
        check(client, Object)

        // now do some validation

        var id = Clients.insert(client)
        if( !id ){
            throw new Meteor.Error(500, 'somefing wong.')
        }

        return {
            id : id
        }
    },

    'Client_edit' : function( client ){
        check(client, Object)

        //
        // do some validation
        //

        var id = client._id
        delete client._id
        var affected = Clients.update(id, {$set:client})
        if( affected != 1 ){
            throw new Meteor.Error(500, 'somefing else wong')
        }

        return {
            id : id,
            affected : affected
        }
    },

    'Client_remove' : function( id ){
        check(id, String)

        return Clients.remove(id)
    },

    'Client_addContactLog' : function( contact ){
        check(contact, Object)

        //
        // do some validation
        //

        var id = contact._id
        delete contact._id
        var affected = Clients.update(id, {$push:{contacted:contact}})
        if( affected != 1 ){
            throw new Meteor.Error(500, 'somefing went wong.')
        }

        return {
            id : id,
            affected : affected
        }
    }
})