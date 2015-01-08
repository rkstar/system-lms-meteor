Template.user_list.helpers({
    users : function(){
        var opts = {$sort:{createdAt:-1,'profile.name':1}}
        var users = Meteor.users.find({}, opts)

        return users
    }
})

Template.client_list.events({
    'click .btn-load-more' : function(e, template){
        e.preventDefault()

    },

    'click .btn-load-all' : function(e){

    }
})

Template.user_list.rendered = function(){
    $('#user_list_dataTable').DataTable()
}