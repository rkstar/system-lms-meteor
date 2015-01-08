Router.route('/users', {
    fastRender : true,
    name : 'user_list',
    controller : 'UserController'
})
Router.route('/users/view/:_id', {
    fastRender : true,
    name : 'user_view',
    controller : 'UserController'
})
Router.route('/users/edit/:_id', {
    fastRender : true,
    name : 'user_edit',
    controller : 'UserController'
})
Router.route('/users/add', {
    fastRender : true,
    name : 'user_add',
    controller : 'UserController'
})


UserController = ApplicationController.extend({
    action : function(){
        this.render(Router.current().route.getName())
    },

    data : function(){
        if( this.params._id ){
            return Meteor.users.findOne(this.params._id )
        }
    },

    waitOn : function(){
        return [
            Meteor.subscribe('directory')
        ]
    }
})