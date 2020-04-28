const data_file=('../static/js/shares2.json');

d3.json(data_file).then (function (data) {   
    createChart(data)
});

function createChart(stories) {

    const start = dateFns.startOfWeek(new Date('2020-03-01')).toISOString().split('T')[0];
    
    const end = dateFns.endOfWeek(new Date('2020-03-01')).toISOString().split('T')[0];

    const reqData = [];
    const len = stories.length
    console.log(len)

    for (let i = 0; i < len; i++) {
        if (stories[i].date >= (start) && stories[i].date <= (end)) {
            reqData['newspaper'].push(stories[i].newspaper);
            reqData['date'].push(stories[i].date);
            reqData['url'].push(stories[i].url);
            reqData['title'].push(stories[i].title);
            reqData['shares'].push(stories[i].shares);
        }

    }; 


    let reqBbData = [];
    for (let j = 1; j < len; j++) {
        if (reqData[j].newspaper == 'Breitbart') {
            reqBbData.push(reqData[j]);
        }
    };

    let reqBiData = (reqData => reqData.newspaper == 'Business_Insider');
    let reqFnData = (reqData => reqData.newspaper == 'Fox News');
    let reqFtData = (reqData => reqData.newspaper == 'Financial Times');
    let reqMwData = (reqData => reqData.newspaper == 'MarketWatch');
    let reqNyData = (reqData => reqData.newspaper == 'NYTimes');
    let reqRtData = (reqData => reqData.newspaper == 'Reuters');
    let reqTgData = (reqData => reqData.newspaper == 'The Gaurdian');
    let reqWjData = (reqData => reqData.newspaper == 'WSJ');
 
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    const chart = document.getElementById('newsChart').getContext('2d');

    let newsChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: [reqData.newspaper],
            datasets: [
                {
                 label:'Breitbart',
                 data: [reqBbData.shares]
                },
                {
                label:'Business Insider',
                data: [reqBiData.shares]   
                },
                {
                label:'Fox News',
                data: [reqFnData.shares]   
                },
                {
                label:'Financial Times',
                data: [reqFtData.shares]   
                },
                {
                label:'MarketWatch',
                data: [reqMwData.shares]   
                },
                {
                label:'New York Times',
                data: [reqNyData.shares]   
                },
                {
                label:'Reuters',
                data: [reqRtData.shares]   
                },
                {
                label:'The Guardian',
                data: [reqTgData.shares]   
                },
                {
                label:'Wall Street Journal',
                data: [reqWjData.shares]   
                },
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

