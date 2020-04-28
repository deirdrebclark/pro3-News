// using jquery to load external json data
$.getJSON('static/js/senti-dummyData.json', function (data) {
    var coronaSenti = data;
    let dates = [];
    let sentiments = [];
    let weekVal = [];
    let sentiAvg = [];

    // iterating through json array of objevts to get the all the dates and pushing it to an array (dates)
    for (let dateOI of coronaSenti) {
        dates.push(dateOI.date);
    }

    // iterating through json array of objevts to get the all the sentiments and pushing it to an array (dates)
    for (let sentiOI of coronaSenti) {
        sentiments.push(sentiOI.sentiment);
    }

    // categorizes the data by weeks by looking at the date element. 
    var week = d3.time.format("%U");
    var byWeek = d3.nest()
        .key(function (d) {
            return week(new Date(d.date));
        })
        .entries(coronaSenti);
        console.warn(byWeek)

    // total number of weeks
    let numOfWeeks = byWeek.length;

    // sort the data by order of the week
    byWeek.sort(function (a, b) {
        return a.key.localeCompare(b.key);
    });

    // calculates the avg
    for (let valueOI of byWeek) {
        let result = (valueOI.values).reduce((r, d) => (r + d.sentiment) / numOfWeeks, 0);  //suming the sentiment value and dividing it by the number of weeks
        let val = 'Week ' + valueOI.key
        weekVal.push(val); //pushing weeks into an array
        sentiAvg.push(result); //pushing avg senti into an array
    }

    // generates the weekly scatter plot
    var weeklyPlot = {
        x: weekVal,
        y: sentiAvg,
        mode: 'markers',
        type: 'scatter'
    };

    var scatWeeklyData = [weeklyPlot];

    Plotly.newPlot('senti', scatWeeklyData);

    // generates the dailt scatter plot
    var trace1 = {
        x: dates,
        y: sentiments,
        mode: 'markers',
        type: 'scatter'
    };


    var data = [trace1];

    Plotly.newPlot('myDiv', data);
})
