Router.route('/dashboard', {
    fastRender : true,
    name : 'dashboard',
    controller : 'DashboardController'
})

DashboardController = ApplicationController.extend({
    action : function(){
        this.render()
    },

    subscriptions : function(){
        return [
            Meteor.subscribe('directory'),
            Meteor.subscribe('clients'),
            Meteor.subscribe('callbacks'),
            Meteor.subscribe('appointments')
        ]
    }
})