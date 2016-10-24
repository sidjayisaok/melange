//script using ES6 and jQuery
//api provided using http://fixer.io/
//exchange rates set by the European Central Bank

//module export d3 chart via Browserify bundle.js
let my_barChart = require('./my_barChart').my_barChart;

//creates a useable date format
const formatDate = (date)=>{
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if(dd < 10) {dd = '0' + dd}
    if(mm < 10) {mm = '0' + mm}
    date = yyyy + '-' + mm + '-' + dd;
    return date;
 }

//pushes date into an array
const LastTenDays = ()=> {
    let result = [];
    for (let i = 0; i < 10; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }
    return(result);
 }

//returns dates as useable array
const loopDate = ()=> {
  let getMyDate = LastTenDays();
  let myArray = [];
  let copied = getMyDate.map((dString)=> "https://api.fixer.io/".concat(dString));
    for (i = 0; i < getMyDate.length; i++){
        myArray.push("https://api.fixer.io/" + getMyDate[i]);
    }
    return(myArray);
}

$("#convert").on('click', function(event){
    event.preventDefault();
    //our basic variables
    let thisCurrency = $('#myCurrency').val();
    let thatCurrency = $('#yourCurrency').val();
    let thisAmount = $('#yourAmount').val();
    //convert to proper format
    let myCurrency = thisCurrency.toUpperCase();
    let yourCurrency = thatCurrency.toUpperCase();
    let yourAmount = parseFloat(thisAmount);
    let myDate = loopDate();

    //API link
    let queryURL = "https://api.fixer.io/latest?base=" + myCurrency + "&rates=" + yourCurrency;
    
    //logic controllers
    if(yourAmount <= 0){
        alertify.alert("Please select an amount greater than zero");
        return;
    }
    else if(isNaN(yourAmount)){
        alertify.alert("Please use numbers for the amount field only");
        return;
    }
    else if(!isNaN(myCurrency) || !isNaN(yourCurrency)){
        alertify.alert("Please use the three digit characters for the currency fields only");
        return;
    }
    //API call
    $.ajax({
        method: 'GET',
        url: queryURL,
        datatype: 'json'
    }).done(function(res){
        $(".currentDate").html(" Rates current as of " + res.date);
        $(".myConversion").html(" You have selected " + res.base);
        $(".myRatio").html(" The current ratio is 1 " + res.base + " to " + res.rates[yourCurrency] + " " + yourCurrency);
        $(".yourConversion").html(" Converting " + yourAmount + " " + myCurrency + " is worth approximately " + (res.rates[yourCurrency]*yourAmount).toFixed(3) + " " + yourCurrency);
    });

//nv.d3.js solution for dynamic graph
const finalChart = (thisData)=>{
    nv.addGraph(function() {
        chart = nv.models.lineChart()
            .options({
                duration: 1000,
                useInteractiveGuideline: true
            });

        chart.xAxis
             .axisLabel("Day")
             .tickFormat(d3.format(',.1f'))
             .staggerLabels(true);

        chart.yAxis
             .axisLabel('Value')
              .tickFormat(function(d) {
                if (d === null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            });

        data = thisData;
        d3.select('.newChart')
          .append('svg')
          .datum(data)
          .call(chart);
            
        nv.utils.windowResize(chart.update);
        return chart;
    });
}


    //History call for the second API
    const loopAJAX = ()=>{
         let newArray = [];
        for (i = 0; i < myDate.length; i++){
            $.ajax({
                method: 'GET',
                url: myDate[i] + "?base=" + myCurrency,
                datatype: 'json',
                async: false
            }).done(function(response){
               newArray.push({x: response.date, y: response.rates[yourCurrency]});
               console.log(newArray);
            })
        } 
            return [{
            values: newArray,
            key: 'Value',
            color: '#ff7f0e',
            area: true
            }];     
        }      
          
   $(".newChart").html(finalChart(loopAJAX()));
}); 

my_barChart("/misc/data.csv");






