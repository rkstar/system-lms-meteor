Router.route('/appointments', {
    fastRender : true,
    name: 'appointment_list',
    controller: 'AppointmentController'
})
Router.route('/appointments/add', {
    fastRender : true,
    name : 'appointment_add',
    controller : 'AppointmentController'
})


AppointmentController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
    },

    waitOn : function(){
        // set the current first appointment created
        this.appointmentsSubscription = Meteor.subscribe('appointments', {back_to:this.back_to}, this.updateAppointmentsLoaded)
        return [
            Meteor.subscribe('directory'),
            this.appointmentsSubscription
        ]
    },

    updateAppointmentsLoaded : function(){
        Session.set('appointments_loaded', Appointments.find().count())
    },

    loadMoreAppointments : function(){
        Session.set('appointments_already_loaded', Appointments.find().count())
        this.back_to = moment(new Date(this.back_to)).subtract(this.lookup_interval,'days').startOf('day')._d.getTime()
        this.appointmentsSubscription.stop()
        this.appointmentsSubscription = Meteor.subscribe('appointments', {back_to:this.back_to}, this.updateAppointmentsLoaded)
    },

    appointmentsSubscription : null,
    back_to : moment().startOf('day')._d.getTime(),
    lookup_interval : 7,
    start_of_time : new Date(0)
})