Template.client_list_item.helpers({
    lastContact : function(){
        var ret = new Date(0)
        if( this.contacted && (this.contacted.length > 0) ){
            ret = this.contacted.pop()._d
            this.contacted.push(ret)
        }
        return ret
    }
})

Template.client_list_item.events({
    'click tr.show-pointer' : function(e){
        e.preventDefault()

        var clientId = $(e.target).parent().attr('id')
        Router.go('client_view', {_id:clientId})
    }
})