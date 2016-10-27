//script using ES6 and jQuery
//api provided using http://fixer.io/
//exchange rates set by the European Central Bank

//module export d3 chart via Browserify bundle.js
let my_barChart = require('./my_barChart').my_barChart;

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
}); 

my_barChart("/misc/data.csv");






