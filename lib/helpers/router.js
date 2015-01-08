// highlight the correct sidebar nav option...
UI.registerHelper("activePage", function(pid){
    var route = Router.current().route.getName()
    switch( route ){
        case 'user_list':
        case 'user_view':
        case 'user_edit':
            route = 'users'
            break

        case 'client_list':
        case 'client_view':
        case 'client_edit':
            route = 'clients'
            break

        case 'appointment_list':
        case 'appointment_new':
            route = 'appointments'
            break;
    }

    return (route == pid) ? "active" : ""
})