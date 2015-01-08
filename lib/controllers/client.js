Router.route('/clients', {
    fastRender : true,
    name : 'client_list',
    controller : 'ClientController'
})
Router.route('/clients/add', {
    fastRender : true,
    name : 'client_add',
    controller : 'ClientController'
})


ClientController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
    },

    waitOn : function(){
        // set the current first client created
        this.clientsSubscription = Meteor.subscribe('clients', {back_to:this.back_to}, this.updateClientsLoaded)
        return [
            Meteor.subscribe('directory'),
            this.clientsSubscription
        ]
    },

    updateClientsLoaded : function(){
        Session.set('clients_loaded', Clients.find().count())
    },

    loadMoreClients : function(){
        Session.set('clients_already_loaded', Clients.find().count())
        this.back_to = moment(new Date(this.back_to)).subtract(this.lookup_interval,'days').startOf('day')._d.getTime()
        this.clientsSubscription.stop()
        this.clientsSubscription = Meteor.subscribe('clients', {back_to:this.back_to}, this.updateClientsLoaded)
    },

    loadAllClients : function(){
        Session.set('clients_already_loaded', Clients.find().count())
        this.clientsSubscription = Meteor.subscribe('clients', {back_to:0}, this.updateClientsLoaded)
    },

    clientsSubscription : null,
    back_to : moment().subtract(45,'days').startOf('day')._d.getTime(),
    lookup_interval : 45,
    start_of_time : new Date(0)
})