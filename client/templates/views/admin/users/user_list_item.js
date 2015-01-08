Template.user_list_item.helpers({
    isAdminYesOrNo : function(){
        return this.profile.isAdmin ? "YES" : "NO"
    }
})

Template.user_list_item.events({
    'click tr.show-pointer' : function(e){
        e.preventDefault()

        var userId = $(e.target).parent().attr('id')
        Router.go('user_view', {_id:userId})
    }
})