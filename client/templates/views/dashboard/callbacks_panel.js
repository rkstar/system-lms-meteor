var __ = {}
var client = {_id:"",name:""}

Template.callbacks_panel.helpers({
    callbacks : function(){
        return Callbacks.find({
            callbackDate : {"$gte":moment().startOf('day')._d}
        }, {sort:{'callbackDate':1}, limit:15})
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

Template.callbacks_panel.events({
    'submit form#quickadd_callback' : function(e){
        e.preventDefault()

        var form = $('#quickadd_callback').serializeObject()
        var callback = {
            salesperson : {
                _id : Meteor.userId(),
                name : Meteor.user().profile.name
            },
            client : {
                _id : client._id,
                name : client.name
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
    }
})

Template.callbacks_panel.rendered = function(){
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
    })
}

Template.callbacks_panel.destroyed = function() {
    __ = {}
    $('.callback-datepicker').data('DateTimePicker').destroy()
}