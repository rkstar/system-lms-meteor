Template.appointment_list.helpers({
    appointments : function(){
        return Appointments.find()
    }
})

Template.appointment_list.events({
    'click .btn-load-more' : function(e){
        e.preventDefault()
        $('.btn-load-more').attr('disabled','disabled')

        Iron.controller().loadMoreAppointments()
    }
})

Template.appointment_list.rendered = function(){
    var defs = Meteor.user().profile.isAdmin
        ? [
        { targets:3, visible:false },   // appointment date in unix timestamp
        { targets:2, orderData:[3] },   // appointment date in human readable
    ] : [
        { targets:2, visible:false },   // appointment date in unix timestamp
        { targets:1, orderData:[2] },   // appointment date in human readable
    ]
    $("#appointment_list_dataTable").DataTable({
        lengthMenu : [[25,100,200,-1],[25,100,200,'All']],
        order : Meteor.user().profile.isAdmin ? [2,'asc'] : [1,'asc'],
        columnDefs : defs
    })
}