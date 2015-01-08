Template.sold_box.helpers({
    sold : function(){
        return Clients.find({
            signedUp : {"$gte":moment().startOf('day')._d},
            status : "sold"
        }).count()
    }
})