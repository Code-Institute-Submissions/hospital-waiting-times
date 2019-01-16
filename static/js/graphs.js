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
    total_wait_over_time(ndx);
    wait_per_month(ndx);
    longest_wait(ndx);
    wait_per_group_per_year(ndx);
    wait_per_year(ndx);
    wait_each_year(ndx);
    


    dc.renderAll();
}
/////////////////////////////////////////////////////////Trust Selector

function trust_selector(ndx) {
    var trustDim = ndx.dimension(dc.pluck("Trust"));
    var group = trustDim.group();

    dc.selectMenu("#trust-menu")
        .dimension(trustDim)
        .group(group)
        .title(function(d) { return d.key; })
        .promptText("Choose a Health Trust");
}

/////////////////////////////////////////////////////////Trust Selector

/////////////////////////////////////////////////////////Total Wait Number Display

function total_wait_over_time(ndx) {
    var waitCount = ndx.groupAll().reduce(

        function(p, v) {
            if (v.Total_sum > 0) {
                p.total += v.Total_sum;
            }

            return p;
        },
        function(p, v) {
            if (v.Total_sum > 0) {
                p.total -= v.Total_sum;
            }

            return p;
        },

        function() {
            return { total: 0 };
        }

    );

    dc.numberDisplay("#wait-count")
        .group(waitCount)

        .transitionDuration(500)
        .formatNumber(d3.format("f"))
        .valueAccessor(function(d) { return d.total; });
}

/////////////////////////////////////////////////////////Total Wait Number Display

/////////////////////////////////////////////////////////Wait per Month Bar Chart

function wait_per_month(ndx) {
    var colour = d3.scale.ordinal()
        .range(["violet"]);

    var monthDim = ndx.dimension(dc.pluck("Month"));
    var monthGroup = monthDim.group().reduceSum(dc.pluck("Total_sum"));
    
    
    dc.barChart("#month-bar-chart")
        .dimension(monthDim)
        .group(monthGroup)
        .width(450)
        .height(400)
        .margins({ top: 30, left: 50, bottom: 50, right: 20 })
        .brushOn(false)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Month")
        .yAxisLabel("Total wait (hrs)")
        .elasticY(true)
        .transitionDuration(500)
        .colors(colour);
}

/////////////////////////////////////////////////////////Wait per Month Bar Chart

/////////////////////////////////////////////////////////Wait per Year Line Graph

function wait_each_year(ndx) {
    var colour = d3.scale.ordinal()
        .range(["magenta"]);

    var waitDim = ndx.dimension(dc.pluck("Year"));
    var waitGroup = waitDim.group().reduceSum(dc.pluck("Total_sum"));
    
    
    dc.lineChart("#year-line-chart")
        .dimension(waitDim)
        .group(waitGroup)
        .width(500)
        .height(400)
        .margins({ top: 30, left: 50, bottom: 50, right: 20 })
        .brushOn(true)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxisLabel("Total wait (hrs)")
        .renderDataPoints(true)
        .elasticY(true)
        .transitionDuration(500)
        .colors(colour);
}

/////////////////////////////////////////////////////////Wait per Year Line Graph

/////////////////////////////////////////////////////////Longest Wait Row Chart

function longest_wait(ndx) {
    var lonDim = ndx.dimension(dc.pluck("New_Hospital"));
    var lonGroup = lonDim.group().reduceSum(dc.pluck("Total_sum"));

    dc.rowChart("#wait-row-chart")
        .dimension(lonDim)
        .group(lonGroup)
        .width(500)
        .height(400)
        .title(function(d) { return (d.key + " : " + d.value + " Waiting Time in Hours"); })
        .transitionDuration(500)
        .elasticX(true)
        .cap(5)
        .gap(0)
        .othersGrouper(false);
}

/////////////////////////////////////////////////////////Longest Wait Row Chart

/////////////////////////////////////////////////////////Wait per Group Stacked Bar Chart

function wait_per_group_per_year(ndx) {
    var wpyDim = ndx.dimension(dc.pluck("Year"));
    var wpyGroup = wpyDim.group().reduceSum(dc.pluck("FourAndUnder_sum"));
    var wpyGroup2 = wpyDim.group().reduceSum(dc.pluck("FiveToTwelve_sum"));
    var wpyGroup3 = wpyDim.group().reduceSum(dc.pluck("OverTwelve_sum"));
    
    
    
    dc.barChart('#wait-stacked-chart')
        .width(600)
        .height(400)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .dimension(wpyDim)
        .group(wpyGroup, 'Four Hours and Under')
        .stack(wpyGroup2, 'Five To Twelve Hours')
        .stack(wpyGroup3, 'Over Twelve Hours')
        .brushOn(false)
        .transitionDuration(500)
        .elasticY(true)
        .margins({top: 20, left: 50, bottom: 50, right: 200})
        .legend(dc.legend().x(400).y(170).itemHeight(15).gap(5))
        .yAxisLabel("Total Combined Wait in Hours");
}

/////////////////////////////////////////////////////////Wait per Group Stacked Bar Chart

/////////////////////////////////////////////////////////Wait per Year Pie Chart

function wait_per_year(ndx) {
    var monthDim = ndx.dimension(dc.pluck("Trust"));
    var monthGroup = monthDim.group().reduceSum(dc.pluck("Total_sum"));
    
    dc.pieChart("#year-pie-chart")
        .dimension(monthDim)
        .group(monthGroup)
        .radius(200)
        .innerRadius(20)
        .width(275)
        .height(275)
        .transitionDuration(500);
}

/////////////////////////////////////////////////////////Wait per Year Pie Chart

