Template.logout.rendered = function(){
    Meteor.logout(function(){
        Router.go('login')
    })
}