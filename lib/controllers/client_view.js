Router.route('/clients/view/:_id', {
    fastRender : true,
    name : 'client_view',
    controller : 'ClientViewController'
})
Router.route('/clients/edit/:_id', {
    fastRender : true,
    name : 'client_edit',
    controller : 'ClientViewController'
})

ClientViewController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
    },

    waitOn : function(){
        return [
            Meteor.subscribe('directory'),
            Meteor.subscribe('callbacks_for_client', this.params._id),
            Meteor.subscribe('appointments_for_client', this.params._id),
            Meteor.subscribe('single_client', this.params._id)
        ]
    },

    data : function(){
        return Clients.findOne({ _id:this.params._id })
    }
})