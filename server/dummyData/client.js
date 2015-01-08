createDummyClientData = function( userId, userName ){
    signupDate = function( createdAt ){
        var isMember = Boolean((Math.floor(Math.random() * 100) + 1) % 2)
        if( !isMember ){ return null }

        // get a date between our two dates
        var today = new Date()
        return this.getRandomDateBetween(createdAt, today)
        //return new Date(
        //    createdAt.getTime() + (Math.floor(Math.random() * (today.getTime() - createdAt.getTime())))
        //)
    }

    pickAStatus = function( isMember ){
        if( isMember != null ){
            return "sold"
        }
        statuses = ['assigned','not interested']
        return statuses[Math.floor(Math.random()*3)]
    }

    randomEmail = function(){
        alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']
        // create random email address
        i =0
        email = ""
        for( i=0;i<Math.floor(Math.random()*20);i++ ){
            email += alphabet[Math.floor(Math.random()*i)]
        }
        email += "@"
        for( i=0;i<Math.floor(Math.random()*6);i++ ){
            email += alphabet[Math.floor(Math.random()*i)]
        }
        email += ".com"

        return email
    }

    randomAddress = function(){
        addresses = [
            "2835 Thorn Street",
            "2828 North Avenue",
            "4137 Brownton Road",
            "2598 West Street",
            "3632 Edwards Street",
            "3923 Trails End Road",
            "663 Martha Ellen Drive",
            "2990 Edington Drive",
            "2548 Dawson Drive",
            "3692 Forest Avenue"
        ]
        return addresses[Math.floor(Math.random()*addresses.length)]
    }

    randomName = function(){
        var names = [
            'Zeph Drake',
            'Michayla Mallory',
            'Rachel Milton',
            'Laci Joiner',
            'Daffodil Kemp',
            'Magnolia Towner',
            'Thurstan Hayley',
            'Payton Michaelson',
            'Rhonda Phillips',
            'Nannie Aylmer',
            'Damian Kendal',
            'Lisha Bellamy'
        ]
        return names[Math.floor(Math.random()*names.length)]
    }

    randomSource = function(){
        var sources = [
            'WI',
            'TI',
            'BR',
            'CORP',
            'DD',
            'PM',
            'RN',
            'PROMO',
            'FA',
            'FLYR',
            'RD',
            'WEB',
            'TV',
            'O'
        ]
        return sources[Math.floor(Math.random()*(sources.length - 1))]
    }

    randomMembershipNumber = function(){
        return Math.floor(Math.random() * 99999) + 11111
    }

    getRandomDateBetween = function( startDate, endDate ){
        return new Date(
            startDate.getTime() + (Math.floor(Math.random() * (endDate.getTime() - startDate.getTime())))
        )
    }

    buildContactArray = function( startDate ){
        var contacted = [{
            _d : startDate,
            notes : "client toured the gym"
        }]
        var lastDate = this.getRandomDateBetween(startDate, new Date())
        contacted.push({
            _d : lastDate,
            notes : "left voicemail"
        })
        for( var i=0; i<(Math.floor(Math.random()*12)+1); i++ ){
            contacted.push({
                _d : this.getRandomDateBetween(lastDate, new Date()),
                notes : "contacted this client... again"
            })
        }

        return contacted
    }

    createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - (Math.floor(Math.random() * 180)+1))
    signedUp = this.signupDate(createdAt)
    status   = this.pickAStatus(signedUp)
    return {
        createdAt : this.createdAt,
        updatedAt : (status=='sold') ? this.signedUp : this.createdAt,
        signedUp : this.signedUp,
        status : this.status,
        salesperson : {
            _id : userId,
            name : userName,
        },
        contacted : this.buildContactArray(createdAt),
        email : this.randomEmail(),
        name : this.randomName(),
        address : this.randomAddress(),
        city : "Toronto",
        province : "ON",
        postalcode : "h0h0h0",
        phone : "416.555.1212",
        source : this.randomSource(),
        sourceother : '',
        dispo : "some kind of disposition they had.",
        membership : (this.status=='sold') ? this.randomMembershipNumber() : '',
        offer : "39",
        term : "monthly",
        notes : ""
    }
}