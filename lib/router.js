ClientsSubscription = null
UsersSubscription = null

Router.configure({
    controller : 'ApplicationController',
})

//
// application routes ////////////////////////
//

//// default view is the dashboard
Router.route('/', {name:'login'})
Router.route('/logout', {name:'logout'})