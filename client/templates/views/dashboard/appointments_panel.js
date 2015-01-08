var __ = {}
var client = {_id:"",name:""}

Template.appointments_panel.helpers({
    appointments : function(){
        return Appointments.find({
            appointmentDate : {"$gte":moment().startOf('day')._d}
        }, {sort:{'appointmentDate':1}, limit:15})
    },

    autocompleteSettings : function(){
        return {
            position: "bottom",
            limit: 5,
            rules: [
                {
                    collection: Clients,
                    field: "name",
                    template: Template.autocomplete_client_name,
                    matchAll : true,
                    callback : function(doc, el){
                        client = doc
                    }
                }
            ]
        }
    },

    notme : function(){
        return !(Meteor.userId() === this.salesperson._id)
    }
})

Template.appointments_panel.events({
    'submit form#quickadd_appointment' : function(e){
        e.preventDefault()

        var form = $('#quickadd_appointment').serializeObject()
        var appointment = {
            salesperson : {
                _id : Meteor.userId(),
                name : Meteor.user().profile.name
            },
            client : {
                _id : client._id,
                name : client.name
            },
            createdAt : new Date(),
            appointmentDate : __.appointmentDate || new Date(),
            notes : form.notes
        }

        Meteor.call('Appointment_add', appointment, function(err, res){
            if( !err ){
                $('#quickadd_appointment')[0].reset()
            }
        })
    }
})

Template.appointments_panel.rendered = function(){
    Meteor.defer(function(){
        $('.appointment-datepicker').datetimepicker({
            minuteStepping: 15,
            sideBySide: true
        })
            .on('dp.change', function(e){
                __.appointmentDate = e.date._d
                $('.btn-calendar').tooltip('destroy')
            })
            .on('dp.hide', function(e){
                $('.btn-calendar').tooltip({
                    placement : 'top',
                    title : moment(__.appointmentDate).format('ll @ h:mm a')
                })
            })
    })
}

Template.appointments_panel.destroyed = function() {
    __ = {}
    $('.appointment-datepicker').data('DateTimePicker').destroy()
}