Template.conversions_chart.events({
    'click .timeperiod-change' : function(e){
        e.preventDefault()

        // get the number from the button value
        var html = $(e.target).html()
        var duration = Number(html.substr(5,2)) || 0

        // this should trigger a reactive update of the area chart
        Session.set("dashboardConversionChartDataPeriod", {duration:duration,type:'days'})
    }
})

Template.conversions_chart.helpers({
    chartDataPeriodDisplay : function(){
        var period = Session.get("dashboardConversionChartDataPeriod") || {duration:7,type:'days'}
        return "Last "+period.duration+" Days"
    }
})

var dashboardConversionChart = null
Template.conversions_chart.rendered = function(){
    dashboardConversionChart = Morris.Area({
        element : 'morris-area-chart',
        data : Session.get("dashboardConversionChartData"),
        xkey : 'formattedDate',
        ykeys : ['tours','conversions'],
        labels : ['tours','conversions'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true,
        fillOpacity:.5
    })

    this.autorun(function(){
        // create a reactive datasource for our conversion chart data
        var period = Session.get("dashboardConversionChartDataPeriod") || {duration:7,type:'days'}
        var mo = moment().subtract(period.duration,period.type).startOf('day')

        // get the clients for the period in question
        var clients = Clients.find({createdAt:{"$gte":mo._d}}, {sort:{createdAt:-1}})

        // create a date array so that we can extract info from the clients
        var dateArray = {}
        var today = new Date()
        var mod   = new Date(mo._d.getTime())
        while( today >= mod ){
            // add the date to the array and increment the mo-ment
            dateArray[moment(mod).format('YYYYMMDD')] = {
                tours : 0,
                conversions : 0,
                _d : new Date(mod.getTime()),
                formattedDate : moment(mod).format('YYYY-MM-DD')
            }
            mod.setDate(mod.getDate() + 1)
        }

        // cycle through clients and determine data by associating to our date array
        clients.forEach(function(client){
            var createdAt = moment(client.createdAt).format('YYYYMMDD')
            var signedUp  = (client.signedUp) ? moment(client.signedUp).format('YYYYMMDD') : null

            if( dateArray[createdAt] ){
                dateArray[createdAt].tours++
            }
            if( signedUp && dateArray[signedUp] ){
                dateArray[signedUp].conversions++
            }
        })

        // now that we have all of our data we need to convert it from an object to an array
        var chartData = []
        mod = new Date(mo._d.getTime())
        while( today >= mod ){
            chartData.push(dateArray[moment(mod).format('YYYYMMDD')])
            mod.setDate(mod.getDate() + 1)
        }

        Session.set("dashboardConversionChartData", chartData)
        if( dashboardConversionChart ){
            dashboardConversionChart.setData(chartData)
        }
    })
}