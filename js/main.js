let apiData = [];
let displayCountries = ["EUR", "USD", "AUD", "GBP", "BRL"];

function fetchAPIData() {
    console.log ('Fetch is working');
    // fetch("https://api.exchangeratesapi.io/latest?base=USD")
    let e = document.querySelector('#date-dropdown');
    let year = e.options[e.selectedIndex].value;
    console.log(year)
    fetch(`https://api.exchangeratesapi.io/${year}-01-01?base=USD`)
    .then(response => response.json())
    .then(data => {
    //  data.rates["2020-05-17"]
    console.log("Got the data!");
    console.log(data);
    // apiData = getRatesByMostRecentDate(data.rates);
    apiData = Object.entries(data.rates);
    apiData.sort()
    console.log(apiData);
    render ();
    });
}

// function getRatesByMostRecentDate(objectWithDateKeys){
//   const dates = Object.keys(objectWithDateKeys)
//   dates.sort()
//   const lastDate = dates[dates.length - 1]

//   return objectWithDateKeys[lastDate]
// }

fetchAPIData()

function render() {
    console.log('render function working');
    let chart = document.querySelector("#graph-location");
    chart.innerHTML= ""
    for (let rate of apiData) {
        if (displayCountries.includes(rate[0])) {
          conversion = rate[1].toFixed(2)
          let height = 50 / conversion
          let country = rate[0]
          chart.innerHTML += `
            <div class="graph-data-bar" style="height: ${height}%" onClick="alert('1 USD = ${conversion} ${country}')">
              <div class="graph-data-bar-country-name">
                ${country}
              </div>
            </div>  
        `;
        };
    }

}