Template.callback_list.helpers({
    callbacks : function(){
        return Callbacks.find()
    }
})

Template.callback_list.events({
    'click .btn-load-more' : function(e){
        e.preventDefault()
        $('.btn-load-more').attr('disabled','disabled')

        Iron.controller().loadMoreCallbacks()
    }
})

Template.callback_list.rendered = function(){
    var defs = Meteor.user().profile.isAdmin
        ? [
        { targets:3, visible:false },   // appointment date in unix timestamp
        { targets:2, orderData:[3] },   // appointment date in human readable
    ] : [
        { targets:2, visible:false },   // appointment date in unix timestamp
        { targets:1, orderData:[2] },   // appointment date in human readable
    ]
    $("#callback_list_dataTable").DataTable({
        lengthMenu : [[25,100,200,-1],[25,100,200,'All']],
        order : Meteor.user().profile.isAdmin ? [2,'asc'] : [1,'asc'],
        columnDefs : defs
    })
}