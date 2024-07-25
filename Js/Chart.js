let Chart,
  Series,
  NewSeries,
  StartEnd,
  Header = document.querySelector(".Header");
let Options = {
  series: [
    {
      name: "",
      data: [],
    },
  ],
  chart: {
    type: "line",
    height: "99%",
  },
  xaxis: {
    tickAmount: 10,
  },
  yaxis: {
    tickAmount: 10,
  },
};
LoadPage();

async function LoadPage(GasNames) {

  let str = '<div class ="ChartSelectContainer">';
  str +=
    '<select class="ChartSelect" onchange="RenderChart(value)"  name="GasSelector" id="GasSelector">';
  str += "<option selected disabled>Please Select Gas</option>";

  for (let GasName of GasNames)
    str += `<option value="${GasName}">${GasName}</option>`;
  str += "</select></div>";

  Header.innerHTML = str;
  StartEnd = await GetStartEnd();

  Chart = new ApexCharts(document.querySelector(".Chart"), Options);
  await Chart.render();
}

async function GetGasNames() {
  let Response = await fetch("http://localhost:2507/DataText/GasNames", {
    method: "Post",
  });
  return await Response.json();
}

async function GetSeries(GasName) {
  let Response = await fetch("http://localhost:2507/DataText/ChartSeries", {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      Gas: GasName,
    }),
  });
  return await Response.json();
}

async function RenderChart(GasName) {
  Series = await GetSeries(GasName);
  NewSeries = [
    Series[GasName],
    {
      name: "Slope-Intercept",
      data: [
        Series[GasName].data[StartEnd.ExpStartTime],
        Series[GasName].data[StartEnd.ExpEndTime - 1],
      ],
    },
  ];
  Chart.updateSeries(NewSeries);
}

async function GetStartEnd() {
  let Response = await fetch("http://localhost:2507/DataText/ExpStartEnd", {
    method: "Post",
  });
  return await Response.json();
}

function Load_Gases(GasNames) {
 // let gases = JSON.parse(GasNames)
 // LoadPage(gases);
}
