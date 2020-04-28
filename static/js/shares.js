const data_file=('../static/js/shares5.json');

d3.json(data_file).then (function (data) {
    var stories = [];

    Object.keys(data).forEach(function(item) {
      stories.push(data[item]);
    });

    createChart(stories); 
});

function createChart(data) {

    const start = dateFns.startOfWeek(new Date('2020-03-01')).toISOString().split('T')[0];
    const end = dateFns.endOfWeek(new Date('2020-03-01')).toISOString().split('T')[0];

    var reqData = [];
    for (i=0; i < data.length; i++) {
        if (data[i].date >= start && data[i].date <= end) {
            reqData.push(data[i]);
         };
    };

    var reqBbData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'Breitbart') {
            reqBbData.push(reqData[i])
        };
    };

    var reqBiData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'Business_Insider') {
            reqBiData.push(reqData[i])
        };
    };
    var reqFnData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'Fox News') {
            reqFnData.push(reqData[i])
        };
    };
    var reqFtData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'Financial Times') {
            reqBbData.push(reqData[i])
        };
    };
    var reqMwData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'MarketWatch') {
            reqMwData.push(reqData[i])
        };
    };
    var reqNyData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'NYTimes') {
            reqNyData.push(reqData[i])
        };
    };
    var reqRtData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'Reuters') {
            reqRtData.push(reqData[i])
        };
    };
    var reqTgData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'The Gaurdian') {
            reqTgData.push(reqData[i])
        }
    };
    var reqWjData = [];
    for (i=0; i < reqData.length; i++) {
        if (reqData[i].newspaper == 'WSJ') {
            reqWjData.push(reqData[i])
        }
    };
   
    var BbShares = 0
    for (i=0; i<reqBbData.length; i++) {
        BbShares += reqBbData[i].shares 
    };


    var chartDate = addDays(start, 2)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    chartDateM = new Date(chartDate).toISOString().split('T')[0];
    var chartDate = addDays(start, 3)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    chartDateT = new Date(chartDate).toISOString().split('T')[0];
    
    var chartDate = addDays(start, 4)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    chartDateW = new Date(chartDate).toISOString().split('T')[0];
    var chartDate = addDays(start, 5)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    chartDateTh = new Date(chartDate).toISOString().split('T')[0];
    var chartDate = addDays(start, 6)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    chartDateF = new Date(chartDate).toISOString().split('T')[0];
    var chartDate = addDays(start, 2)
    function addDays(start, days) {
        var result = new Date(start);
        result.setDate(result.getDate() + days);
        return result;
      }
    
      
      
    Chart.defaults.global.defaultFontFamily = '#000';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultBackground = 'White';
    

    var chart = document.getElementById('newsChart').getContext('2d');

    let newsChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: [start
                    ,chartDateM
                    ,chartDateT
                    ,chartDateW
                    ,chartDateTh
                    ,chartDateF
                    ,end
                ],
            datasets: [
                {
                 label:'Breitbart',
                 data: [reqBbData[0].shares
                       ,reqBbData[1].shares
                       ,reqBbData[2].shares
                       ,reqBbData[3].shares
                       ,reqBbData[4].shares
                    ]
                },
               /* {
                label:'Business Insider',
                data: [reqBiData[0].shares
                ,reqBiData[1].shares
                ,reqBiData[2].shares
                ,reqBiData[3].shares
                ,reqBiData[4].shares]   
                },*/
                {
                label:'Fox News',
                data: [reqFnData[0].shares
                ,reqFnData[1].shares
                ,reqFnData[2].shares
                ,reqFnData[3].shares
                ,reqFnData[4].shares]   
                },
                /*{
                label:'Financial Times',
                data: [reqFtData[0].shares
                ,reqFtData[1].shares
                ,reqFtData[2].shares
                ,reqFtData[3].shares
                ,reqFtData[4].shares]   
                },*/
                /*{
                label:'MarketWatch',
                data: [reqMwData[0].shares
                ,reqMwData[1].shares
                ,reqMwData[2].shares
                ,reqMwData[3].shares
                ,reqMwData[4].shares]   
                },*/
                /*{
                label:'New York Times',
                data: [reqNyData[0].shares
                ,reqNyData[1].shares
                ,reqNyData[2].shares
                ,reqNyData[3].shares
                ,reqNyData[4].shares]   
                },*/
                {
                label:'Reuters',
                data: [reqRtData[0].shares
                ,reqRtData[1].shares
                ,reqRtData[2].shares
                ,reqRtData[3].shares
                ,reqRtData[4].shares]   
                },
                /*{
                label:'The Guardian',
                data: [reqTgData[0].shares
                ,reqTgData[1].shares
                ,reqTgData[2].shares
                ,reqTgData[3].shares
                ,reqTgData[4].shares]   
                },*/
                /*{
                label:'Wall Street Journal',
                data: [reqWjData[0].shares
                ,reqWjData[1].shares
                ,reqWjData[2].shares
                ,reqWjData[3].shares
                ,reqWjData[4].shares]   
                },*/
            ]
            
        },
        options: {
            title: {
                display:true,
                text:'Newspaper Facebook Shares',
                fontSize:10
            },
            legend: {
                position:'right',
                labels: {
                    fontColor:'#000'
                }
            },
            layout: {
                padding: {
                    left:50,
                    right:0,
                    bottom:0,
                    top:0

                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true

                    }
                }]
            },
        }
    });

};

