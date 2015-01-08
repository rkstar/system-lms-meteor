Meteor.methods({
    'Appointment_add' : function( appointment ){
        check(appointment, Object)

        //
        // do some validation
        //

        var id = Appointments.insert(appointment)
        if( !id ){
            throw new Meteor.Error(500, 'uh oh! wha happen?')
        }

        return {id:id}
    },

    'Appointment_edit' : function( appointment ){
        check(appointment, Object)

        //
        // do some validation
        //

        var id = appointment._id
        delete appointment._id
        var affected = Appointments.update(id, {$set:appointment})
        if( affected != 1 ){
            throw new Meteor.Error(500, 'somefing else wong')
        }

        return {
            id : id,
            affected : affected
        }
    }
})