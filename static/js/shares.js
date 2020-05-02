// Event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Get input date
function handleClick() {

  // Grab the datetime value from the filter
  const date = d3.select("#datetime").property("value");
  //let filteredData = tableData;

  // Filter data to the week
  if (date) {
    weekday = new Date(date)

    // Get the start of the week and the end
    const start = dateFns
        .startOfWeek(weekday)
        .toISOString()
        .split("T")[0];
      const end = dateFns
        .endOfWeek(weekday)
        .toISOString()
        .split("T")[0];

      const url = "/xyz";

        d3.json(url).then( function (data) {
          let stories = [];
          Object.keys(data).forEach(function (item) {
            stories.push(data[item]);
            return stories; 
            });
          return stories
        });


    createChart(stories, start, end);

  }
};

function createChart(stories, start, end) {
    // Filter to get the week dates
    var reqData = [];
    for (i = 0; i < stories.length; i++) {
      if (stories[i].date >= start && stories[i].date <= end) {
        reqData.push(data[i]);
      }
    }

    var reqBbData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "Breitbart") {  
          reqBbData.push(reqData[i]);
      }
    }
    var reqBiData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "Business Insider") {
          reqBiData.push(reqData[i]);
      }
    }
    var reqFnData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "Fox News") {
          reqFnData.push(reqData[i]);
      }
    }
    var reqFtData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "Financial Times") {
          reqFtData.push(reqData[i]);
      }
    } 
    var reqMwData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "MarketWatch") {
          reqMwData.push(reqData[i]);
      }
    }
    var reqNyData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "The New York Times") {
          reqNyData.push(reqData[i]);
      }
    }
    var reqRtData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "Reuters") {
          reqRtData.push(reqData[i]);
      }
    }
    var reqTgData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "The Guardian") {
          reqTgData.push(reqData[i]);
      }
    }
    var reqWjData = [];
    for (i = 0; i < reqData.length; i++) {
      if (reqData[i].newspaper == "The Wall Street Journal") {
          reqWjData.push(reqData[i]);
      }
    }

      // Create the dates
      var chartDate = addDays(start, 2)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };
      chartDateM = new Date(chartDate).toISOString().split('T')[0];
      var chartDate = addDays(start, 3)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };
      chartDateT = new Date(chartDate).toISOString().split('T')[0];
      
      var chartDate = addDays(start, 4)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };
      chartDateW = new Date(chartDate).toISOString().split('T')[0];
      var chartDate = addDays(start, 5)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };
      chartDateTh = new Date(chartDate).toISOString().split('T')[0];
      var chartDate = addDays(start, 6)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };
      chartDateF = new Date(chartDate).toISOString().split('T')[0];
      var chartDate = addDays(start, 2)
      function addDays(start, days) {
          var result = new Date(start);
          result.setDate(result.getDate() + days);
          return result;
        };

        
      Chart.defaults.global.defaultFontFamily = '#000';
      Chart.defaults.global.defaultFontSize = 14;
      Chart.defaults.global.defaultFontColor = '#000';
      
      const ctx = document.querySelector('#newsChart').getContext('2d')
      let newsChart = new Chart(ctx, {
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
                  data: reqBbData.map(x=>x.shares)
                  },
                  {
                  label:'Business Insider',
                  data: reqBiData.map(x=>x.shares)   
                  },
                  {
                  label:'Fox News',
                  data: reqFnData.map(x=>x.shares)  
                  },
                  {
                  label:'Financial Times',
                  data: reqFtData.map(x=>x.shares)   
                  },
                  {
                  label:'MarketWatch',
                  data: reqMwData.map(x=>x.shares) 
                  },
                  {
                  label:'New York Times',
                  data: reqNyData.map(x=>x.shares) 
                  },
                  {
                  label:'Reuters',
                  data: reqRtData.map(x=>x.shares) 
                  },
                  {
                  label:'The Guardian',
                  data: reqTgData.map(x=>x.shares)   
                  },
                  {
                  label:'Wall Street Journal',
                  data: reqWjData.map(x=>x.shares)  
                  },
              ]
          },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        options: {
          plugins: {
            colorschemes: {
              scheme: 'brewer.Green9'
      
            }
      
          }
      
        }
      });
};

