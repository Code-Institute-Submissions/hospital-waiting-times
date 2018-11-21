queue() 
    .defer(d3.csv, "static/dataset/NIHospitalWaitingTimes.csv")
    .await(makeGraphs);
    
function makeGraphs(error, timeData) {
    var ndx = crossfilter(timeData);
    
    timeData.forEach(function(d) {
        d.Total_sum = parseInt(d["Total_sum"]);
        d.FourAndUnder_sum = parseInt(d["FourAndUnder_sum"]);
        d.FiveToTwelve_sum = parseInt(d["FiveToTwelve_sum"]);
        d.OverTwelve_sum = parseInt(d["OverTwelve_sum"]);
        
    });
    
    trust_selector(ndx);
    wait_per_month(ndx);
    longest_wait(ndx);
    
    
    dc.renderAll();
}

function trust_selector(ndx) {
    var trustDim = ndx.dimension(dc.pluck("Trust"));
    var group = trustDim.group();
    
    dc.selectMenu("#trust-menu")
        .dimension(trustDim)
        .group(group)
        .title(function(d) {return d.key;})
        .promptText("Location");
}

function wait_per_month(ndx) {
    var colour = d3.scale.ordinal()
        .range(["red"]);
    
    var waitDim = ndx.dimension(dc.pluck("Year"));
    var waitGroup = waitDim.group().reduceSum(dc.pluck("Total_sum"));
       
    
    dc.lineChart("#wait-line-chart")
        .dimension(waitDim)
        .group(waitGroup)
        .width(700)
        .height(400)
        .margins({top: 30, left: 50, bottom: 30, right: 20})
        .brushOn(false)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxisLabel("Total wait (hrs)")
        .elasticY(true)
        .transitionDuration(500)
        .colors(colour);
}

function longest_wait(ndx) {
    var lonDim = ndx.dimension(dc.pluck("New_Hospital"));
    var lonGroup = lonDim.group().reduceSum(dc.pluck("Total_sum"));
    
    dc.rowChart("#wait-time-chart")
        .dimension(lonDim)
        .group(lonGroup)
        .width(500)
        .height(600)
        .title(function(d) { return (d.key + " : " + d.value + " Waiting Time in Hours"); })
        .transitionDuration(500)
        .elasticX(true)
        .cap(10)
        .gap(0)
        .othersGrouper(false);
}

