Template.client_list.helpers({
    clients : function(){
        var clients = []
        var ic = Iron.controller()
        if( !ic.clientsSubscription || !ic.clientsSubscription.ready() ){ return clients }

        Clients.find({},{sort:{createdAt:-1,updatedAt:-1}}).forEach(function(client){
            client.className = Config.client.status.className[client.status]
            clients.push(client)
        })

        return clients
    },

    earliestClientLoaded : function(){
        return Clients.findOne({},{sort:{createdAt:1}}).createdAt
    }
})

Template.client_list.events({
    'click .btn-load-more' : function(e){
        e.preventDefault()
        $('.btn-load-more').attr('disabled','disabled')

        Iron.controller().loadMoreClients()
    }
})

Template.client_list.rendered = function(){
    $("#client_list_dataTable").DataTable({
        lengthMenu : [[25,100,200,-1],[25,100,200,'All']],
        order : [2,'desc'],
        responsive : true
    })
}