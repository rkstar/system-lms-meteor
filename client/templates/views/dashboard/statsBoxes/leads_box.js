Template.leads_box.helpers({
    leads : function(){
        return Clients.find({
            createdAt : {"$gte":moment().startOf('day')._d}
        }).count()
    }
})