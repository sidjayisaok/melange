//script using ES6 and jQuery
//api provided using http://fixer.io/
//exchange rates set by the European Central Bank

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
    // let historyURL = ;
    
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
        $(".yourConversion").html(" Converting " + yourAmount + " " + myCurrency + " is worth approximately " + (res.rates[yourCurrency]*yourAmount).toFixed(2) + " " + yourCurrency);
    });

    //this function removes duplicates
    const deDuped = (resArray)=>{
        let dateArray = resArray.map((res)=>res.date);
        let dateSet = new Set();
        dateArray.forEach((date)=> dateSet.add(date));
        let noRepeat = [...dateSet]
                        .map((d)=>resArray
                        .find((r)=> r.date === d));
        return noRepeat;
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
                newArray.push({value: response.rates[yourCurrency], name: response.date});
                console.log(newArray);
            })
        }       
    }   
loopAJAX();  
});


const mybarChart = (ourData)=>{
    //our barchart variables
let svg = d3.select("svg"),
margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//data using csv file
d3.csv(ourData, (d)=> {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;
//declare our x and y axes
  x.domain(data.map((d)=> { return d.letter; }));
  y.domain([0, d3.max(data, (d)=> { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");
//render the bar graph
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", (d)=> { return x(d.letter); })
    .attr("y", (d)=> { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("fill", "green")
    .attr("height", (d)=> { return height - y(d.frequency); });
});
}
//display bar chart template
mybarChart("/misc/data.csv");





