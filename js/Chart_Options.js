let ChartData = await fetch('http://localhost:2507/DataText/Points');

let Option1 = {
    series: [{
        name: "Gas Reading",
        data: ChartData
    }],
    chart: {
        height: 500,
        type: 'scatter',
        zoom: {
            enabled: true,
            type: 'xy'
        }
    },
    xaxis: {
        tickAmount: 10

    },
    yaxis: {
        tickAmount: 10
    }
};

let Option2 = {
    series: [{
        name: 'Gas Reading',
        data: ChartData
    }
    ],
    chart: {
        height: 500,
        type: 'line',
        zoom: {
            enabled: true
        },
    },
    xaxis: {
        tickAmount: 10

    },
    yaxis: {
        tickAmount: 10
    }
};

module.exports = {
    Option1: Option1,
    Option2: Option2
}