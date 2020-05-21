let apiData = [];
let displayCountries = ["EUR", "USD", "AUD", "GBP", "BRL"];

function fetchAPIData() {
    let dropdown = document.querySelector('#date-dropdown');
    let year = dropdown.options[dropdown.selectedIndex].value;
    console.log(year)
    fetch(`https://api.exchangeratesapi.io/${year}-01-01?base=USD`)
    .then(response => response.json())
    .then(data => {
    apiData = Object.entries(data.rates);
    apiData.sort()
    render ();
    });
}

fetchAPIData()

function render() {
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