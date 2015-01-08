Router.route('/stats', {
    fastRender : true,
    name: 'stats',
    controller: 'StatsController'
})


StatsController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
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