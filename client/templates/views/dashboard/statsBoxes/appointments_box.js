Template.appointments_box.helpers({
    appointmentsToday : function(){
        return Appointments.find({
            appointmentDate : {
                "$gte" : moment().startOf('day')._d,
                "$lte" : moment().endOf('day')._d
            }
        }).count()
    }
})