// make sure we always have at least one user!
if( Meteor.users.find().count() === 0 ) {
    var userId = Accounts.createUser({
        email: 'rkstar@mac.com',
        password: 'password',
        profile: {
            name: '[root]',
            isAdmin: true
        }
    })
}
//
//    var misterId = Accounts.createUser({
//        email : 'mister@eos.com',
//        password : 'password',
//        profile : {
//            name : 'Mister Eos',
//            isAdmin : false
//        }
//    })
//
//    var missId = Accounts.createUser({
//        email : 'miss@terry.com',
//        password : 'password',
//        profile : {
//            name : 'Miss Terry',
//            isAdmin : false
//        }
//    })
//
//    var ids = [
//        { userId:userId, name:'David F' },
//        { userId:missId, name:'Miss Terry' },
//        { userId:misterId, name:'Mister Eos' }
//    ]
//
//    // make sure we have dummy client data!
//    if( Clients.find().count() === 0 ){
//        var i,rand
//        for( i=0;i<(Math.floor(Math.random()*10000)+1000); i++ ){
//            rand = Math.floor(Math.random() * ids.length)
//            Clients.insert(createDummyClientData(ids[rand].userId, ids[rand].name))
//        }
//    }
//}