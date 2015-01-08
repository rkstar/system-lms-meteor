$.fn.serializeObject = function(){
    var formObject = {}
    if( !this.is('form') ){ return formObject }

    _.each(this.serializeArray(), function( field ){
        formObject[field.name] = field.value
    })

    return formObject
}