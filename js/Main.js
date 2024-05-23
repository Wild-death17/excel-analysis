let data = Get_Data();
console.log(data);

async function Get_Data() {
    let response = await fetch('http://localhost:2507/DataText/Points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FilePath: '22.3.2024 10-05-41  Original File.xlsx'
        })
    });
    let data = await response.json();

    let ret = {};
    for (let item in data)
        ret[item] = data[item];

    return ret;
}

async function Get_Series() {
    let data = await Get_Data();
    let series = []
    for (let item in data)
        series.push({
            name: `${item}`,
            data: data[item]
        })
    return series;
}

async function Display() {
    let series = await Get_Series()
    let Option1 = {
        series,
        chart: {
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
    console.log(Option1)
}