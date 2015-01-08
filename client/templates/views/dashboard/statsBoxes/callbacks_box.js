Template.callbacks_box.helpers({
    todaysCallbacks : function(){
        return Callbacks.find({
            callbackDate : {
                "$gte" : moment().startOf('day')._d,
                "$lte" : moment().endOf('day')._d
            }
        }).count()
    }
})