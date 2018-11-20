queue() 
    .defer(d3.csv, "static/dataset/NIHospitalWaitingTimes.csv")
    .await(makeGraphs);
    
function makeGraphs(error, timeData) {
    var ndx = crossfilter(timeData);
    
    timeData.forEach(function(d) {
        d.Total_sum = parseInt(d["Total_sum"]); 
        
    });
    
    trust_selector(ndx);
    wait_per_month(ndx);
    
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
    var monthDim = ndx.dimension(dc.pluck("Year"));
    var monthGroup = monthDim.group().reduceSum(dc.pluck("Total_sum"));
       
    
    dc.lineChart("#wait-line-chart")
        .dimension(monthDim)
        .group(monthGroup)
        .width(700)
        .height(400)
        .margins({top: 30, left: 50, bottom: 30, right: 20})
        .brushOn(false)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxisLabel("Total wait per month (hrs)")
        .elasticY(true)
        .transitionDuration(500);
}