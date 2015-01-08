// document structure for an "appointment" in the Appointments collection
var Appointment = {
    _id : "lkj2lkfjkl2jfd",
    createdAt : new Date(),
    appointmentDate : new Date(),
    salesperson : {
        _id : 'salesperson _id',
        name : 'Sales Person'
    },
    client : {
        _id : 'client _id',
        name : 'Client Name'
    },
    outcome : "sold, re-book, no-show, not interested",
    notes : "some notes"
}