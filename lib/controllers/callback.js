Router.route('/callbacks', {
    fastRender : true,
    name: 'callback_list',
    controller: 'CallbackController'
})

CallbackController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
    },

    waitOn : function(){
        // set the current first appointment created
        this.callbacksSubscription = Meteor.subscribe('callbacks', {back_to:this.back_to}, this.updateCallbacksLoaded)
        return [
            Meteor.subscribe('directory'),
            this.callbacksSubscription
        ]
    },

    updateCallbacksLoaded : function(){
        Session.set('callbacks_loaded', Callbacks.find().count())
    },

    loadMoreCallbacks : function(){
        Session.set('callbacks_already_loaded', Callbacks.find().count())
        this.back_to = moment(new Date(this.back_to)).subtract(this.lookup_interval,'days').startOf('day')._d.getTime()
        this.callbacksSubscription.stop()
        this.callbacksSubscription = Meteor.subscribe('callbacks', {back_to:this.back_to}, this.updateCallbacksLoaded)
    },

    callbacksSubscription : null,
    back_to : moment().startOf('day')._d.getTime(),
    lookup_interval : 7,
    start_of_time : new Date(0)
})