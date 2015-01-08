Template.appointment_list_item.helpers({
    editing : function(){
        return Session.equals('editing_appointment_id', this._id)
    }
})

Template.appointment_list_item.events({
    'click .btn-edit' : function(e, template){
        e.preventDefault()

        Session.set('editing_appointment_id', template.data._id)
    },

    'click .btn-save' : function(e, template){
        e.preventDefault()

        var $tr = $(e.target).parents('tr:first')
        var appointment = {
            '_id' : template.data._id,
            'client.name' : $tr.find('#client').val() || '',
            appointmentDate : template.data._appointmentDate || template.data.appointmentDate,
            notes : $tr.find('#notes').val() || ''
        }

        Meteor.call('Appointment_edit', appointment, function(err, res){
            if( err ) {
                console.log(err)
            } else {
                // reset our data....
                delete template.data._appointmentDate
                $('.datepicker').data('DateTimePicker').destroy()
                Session.set('editing_appointment_id', '')
                Session.set('editing_now', false)
            }
        })
    }
})

Template.appointment_list_item.rendered = function(){

    var template = this

    this.autorun(function(){
        if( Session.equals('editing_appointment_id', template.data._id) ){
            Meteor.defer(function(){
                $('.datepicker').datetimepicker({
                    defaultDate : template.data.appointmentDate,
                    minuteStepping : 15,
                    sideBySide : true
                })
                    .on('dp.change', function(e){
                        template.data._appointmentDate = e.date._d
                    })
            })
        }
   })
}