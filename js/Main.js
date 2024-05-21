

Get_Series();
Get_Specific_Series('Water vapor H2O');



async function Get_Specific_Data(Gas) {
    let data = await fetch('http://localhost:2507/DataText/SpecificPoints', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Gas: Gas,
            FilePath: '22.3.2024 10-05-41  Original File.xlsx'
        })
    });
    return await data.json();
}

async function Get_Data() {
    let data = await fetch('http://localhost:2507/DataText/Points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FilePath: '22.3.2024 10-05-41  Original File.xlsx'
        })
    });
    return await data.json();
}

let Option1 = {
    chart: {
        height: 400,
        type: 'scatter',
        zoom: {
            enabled: true,
            type: 'xy'
        }
    },
    xaxis: {
        tickAmount: 10,
        labels: {
            formatter: function (val) {
                return parseFloat(val).toFixed(1)
            }
        }
    },
    yaxis: {
        tickAmount: 7
    }
};

async function Get_Series() {
    let data = await Get_Data();
    let series = []
    for (let item in data)
        series.push({
            name: "Gas Reading",
            data: data[item]
        })
    return series;
}
async function Get_Specific_Series(Gas) {
    let data = await Get_Specific_Data(Gas);
    let series = []
        series.push({
            name: "Gas Reading",
            data: data
        })
    return series
}

//let chart = new ApexCharts(document.querySelector("#chart"), Option1);
//chart.render()