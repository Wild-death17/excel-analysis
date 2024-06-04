let Chart, Series, StartEnd, Header = document.querySelector('.Header');
let options = {
    series: [{
        name: '',
        data: []
    }],
    chart: {
        type: 'line',
        height: '99%',
    },
    xaxis: {
        tickAmount: 10
    },
    yaxis: {
        tickAmount: 10
    }
};
LoadPage();

async function LoadPage() {

    Series = await GetSeries()
    StartEnd = await GetStartEnd()

    let str = '<select onchange="RenderChart(value)"  name="GasSelector" id="GasSelector">';
    str += '<option selected disabled>Please Select Gas</option>'
    for (let GasName in Series)
        str += `<option value="${GasName}">${GasName}</option>`;
    str += '</select>';

    Header.innerHTML = str;
    Chart = new ApexCharts(document.querySelector(".Chart"), options);
    await Chart.render();
}

async function GetSeries() {
    let Response = await fetch('http://localhost:2507/DataText/ChartSeries', {method: 'Post'});
    return await Response.json();
}

async function GetStartEnd() {
    let Response = await fetch('http://localhost:2507/DataText/ExpStartEnd', {method: 'Post'});
    return await Response.json();
}

function RenderChart(GasName) {
    Chart.updateSeries(Series[GasName], true);
    let Append = [Series[GasName][0].data[StartEnd.ExpStartTime], Series[GasName][0].data[StartEnd.ExpEndTime - 1]]
    let NewSeries = {
        name: 'Slope-Intercept',
        data: Append
    }
    Chart.appendSeries(NewSeries, true);
}