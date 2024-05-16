
let Option1 = {
    series: [{
        name: "Gas Reading",
        data: ''
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
        data: ''
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
