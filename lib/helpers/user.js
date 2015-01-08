UI.registerHelper("isAdmin", function(){
    var u = Meteor.user()
    return u && u.profile.isAdmin
})

UI.registerHelper('userId', function(){
    return Meteor.user().id
})

UI.registerHelper('userAccountTypeOptions', function(){
    var context = (arguments[0])
    var opts = [{
        value : 'manager',
        display : 'Manager',
        isSelected : (context) ? 'selected' : ''    // true, isAdmin && selected
    }, {
        value : 'sales_rep',
        display : 'Sales Rep',
        isSelected : (!context) ? 'selected' : ''   // !true, !isAdmin && selected
    }]

    return opts
})