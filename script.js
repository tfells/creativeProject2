
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
});

function getContent(coin) {
  const url = "https://api.coinpaprika.com/v1/coins/" + coin;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Stats for ' + json.name + " (" + json.symbol + ")</h2><hr>";
      results += '<p class=\"text-small\">Description: ' + json.description + '</p><br>'
      results += '<li>Type: ' + json.proof_type + '</li>'
      results += '<li>Development Status: ' + json.development_status + '</li>'
      results += '<li>Organization: ' + json.org_structure + '</li>'
      results += '<li>First Started: ' + moment(json.first_data_at).format('MMMM Do YYYY, h:mm:ss a') + '</li>'

      document.getElementById("cryptoResults").innerHTML = results;
    });

    const url2 = "https://api.coinpaprika.com/v1/coins/" + coin + "/ohlcv/today";
    fetch(url2)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let results = "";
        results += '<h3>Today\'s Stats</h3>'
        results += '<li>Current: ' + formatter.format(json[0].close) + '</li>'
        results += '<li>24Hr High: ' + formatter.format(json[0].high) + '</li>'
        results += '<li>24Hr Low: ' + formatter.format(json[0].low) + '</li>'
        results += '<br><br>'

        document.getElementById("cryptoResults2").innerHTML = results;
      });
}

/*results = "";
results += '<h2>' + json.main.temp + " &deg;F</h2>"
results += "<h3>Windspeed: " + json.wind.speed + "mph</h3>"
results += "<h3>High: " + json.main.temp_max + " &deg;F, " + "Low: " + json.main.temp_min + " &deg;F</h3>"
results += "<p>"
for (let i=0; i < json.weather.length; i++) {
   results += json.weather[i].description
    if (i !== json.weather.length - 1)
     results += ", "
}
results += "</p>";
*/


document.getElementById("bitcoin").addEventListener("click", function(event) {
  event.preventDefault();
  getContent("btc-bitcoin");
});
document.getElementById("ckb").addEventListener("click", function(event) {
  event.preventDefault();
  getContent("ckb-nervos-network");
});
document.getElementById("shibainu").addEventListener("click", function(event) {
  event.preventDefault();
  getContent("shib-shiba-inu");

});
document.getElementById("ethereum").addEventListener("click", function(event) {
  event.preventDefault();
  getContent("eth-ethereum");

});
document.getElementById("cardano").addEventListener("click", function(event) {
  event.preventDefault();
  getContent("ada-cardano");

});
