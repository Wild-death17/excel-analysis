let Chart, Series, Header = document.querySelector('.Header');
let options = {
    series: [{
        name: '',
        data: []
    }],
    chart: {
        type: 'line',
    },
    xaxis: {
        tickAmount: 10
    },
    yaxis: {
        tickAmount: 10
    }
};
Display();

function RenderChart(GasName) {
    Chart.updateSeries(Series[GasName], true);
}

async function Display() {

    Series = await GetSeries()

    let str = '<select onchange="RenderChart(value)"  name="GasSelector" id="GasSelector">';
    str += '<option selected disabled>Please Select Gas</option>'
    for (let GasName in Series)
        str += `<option value="${GasName}">${GasName}</option>`;
    str += '</select>';

    Header.innerHTML = str;
    Chart = new ApexCharts(document.querySelector(".Chart"), options);
    Chart.render();
}

async function GetSeries() {
    let Response = await fetch('http://localhost:2507/DataText/ChartSeries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FilePath: '22.3.2024 10-05-41  Original File.xlsx'
        })
    });
    return await Response.json();
}
