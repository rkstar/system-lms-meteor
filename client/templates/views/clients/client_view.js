var __ = {}

Template.client_view.helpers({
    readableSource : function(){
        return Config.client.source[this.source]
    },

    callbacks : function(){
        return Callbacks.find({},{
            sort : {callbackDate:1}
        })
    },

    appointments : function(){
        return Appointments.find({},{
            sort : {appointmentDate:-1}
        })
    },

    labelClassName : function(){
        return Config.client.status.className[this.status]
    },

    statusClassName : function(){
        return Config.client.status.className[this.status]
    },

    invertContactLog : function(){
        if( this.contacted ){
            this.contacted.reverse()
        }
    }
})

Template.client_view.events({
    'click .btn-edit' : function(e){
        e.preventDefault()

        Router.go('/clients/edit/'+Blaze.getData()._id)
    },

    'submit form#quickadd_contactnote' : function(e){
        e.preventDefault()

        var form = $("#quickadd_contactnote").serializeObject()
        var contact_data = {
            _id : Blaze.getData()._id,
            _d : new Date(),
            notes : form.notes
        }

        Meteor.call('Client_addContactLog', contact_data, function(err, res){
            if( !err ){
                template.find('input#contact_notes').value = ''
            }
        })
    },

    'submit form#quickadd_callback' : function(e){
        e.preventDefault()

        var form = $('#quickadd_callback').serializeObject()
        var context = Blaze.getData()
        var callback = {
            salesperson : {
                _id : Meteor.userId(),
                name : Meteor.user().profile.name
            },
            client : {
                _id : context._id,
                name : context.name
            },
            createdAt : new Date(),
            callbackDate : __.callbackDate || new Date(),
            notes : form.notes
        }

        Meteor.call('Callback_add', callback, function(err, res){
            if( !err ){
                $('#quickadd_callback')[0].reset()
            }
        })
    },

    'submit form#quickadd_appointment' : function(e){
        e.preventDefault()

        var form = $('#quickadd_appointment').serializeObject()
        var context = Blaze.getData()
        var appointment = {
            salesperson : {
                _id : Meteor.userId(),
                name : Meteor.user().profile.name
            },
            client : {
                _id : context._id,
                name : context.name
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

Template.client_view.rendered = function(){
    Meteor.defer(function(){
        $('.callback-datepicker').datetimepicker({
            minuteStepping: 15,
            sideBySide: true
        })
            .on('dp.change', function(e){
                __.callbackDate = e.date._d
                $('.btn-calendar').tooltip('destroy')
            })
            .on('dp.hide', function(e){
                $('.btn-calendar').tooltip({
                    placement : 'top',
                    title : moment(__.callbackDate).format('ll @ h:mm a')
                })
            })

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

Template.client_view.destroyed = function(){
    __ = {}
    $('.callback-datepicker').data('DateTimePicker').destroy()
    $('.appointment-datepicker').data('DateTimePicker').destroy()
}