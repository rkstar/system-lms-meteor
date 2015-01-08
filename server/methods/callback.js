Meteor.methods({
    'Callback_add' : function( callback ){
        check(callback, Object)

        //
        // do some validation
        //

        var id = Callbacks.insert(callback)
        if( !id ){
            throw new Meteor.Error(500, 'uh oh! no callback added.')
        }

        return {id:id}
    },

    'Callback_edit' : function( callback ){
        check(callback, Object)

        //
        // do some validation
        //

        var id = callback._id
        delete callback._id
        var affected = Callbacks.update(id, {$set:callback})
        if( affected == -1 ){
            throw new Meteor.Error(500, 'uh oh! no callback edited.')
        }

        return {
            id : id,
            affected : affected
        }
    }
})