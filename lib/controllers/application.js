ApplicationController = RouteController.extend({
    fastRender : true,  // we are using FastRender !

    layoutTemplate : 'layout',               // default layout for all templates
    loadingTemplate : 'loading',             // a loading template with spinner
    notFoundTemplate : 'not_found',          // a 404 page
    accessDeniedTemplate : 'access_denied',  // access denied page

    onBeforeAction : function(){
        switch( Router.current().route.getName() ){
            case 'login':
            case 'logout':
                break

            default:
                if( !Meteor.user() ){
                    if( !Meteor.loggingIn() ){
                        Router.go('login')
                    } else {
                        this.render(this.loadingTemplate)
                    }
                }

            case 'users':
            case 'users_view':
            case 'users_edit':
            case 'users_add':
            case 'stats':
                if( !Meteor.user().profile.isAdmin ){
                    this.render(this.accessDeniedTemplate)
                }
                break
        }

        this.next()
    },

    action : function(){
        this.render()
    }
})