
// Load Data Upon Crop Selection
function loadData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "cropData.csv", true);
  xhttp.send();
  alert(xhttp);

}

///////////////// Read Data from CSV file TEST //////////////////////////
///// *** Javascript difficulties with reading an local file durin
////////////////////////////////////////////////////////////////////////
document.getElementById('cropSelect').addEventListener("change", myFunction);

/*  sample array to test calculators */
var cropJSON = {"crop":"Wheat", "percentN":42.1, "units": ["lbs/acre", "tons/acre"], "conversionFactor":1,"residueRemoved": true, "slope": .05, "intercept":50};

function myFunction() {
    var x = cropJSON.units[1];
    var mydata = data;
    alert(mydata[0].crops[0].name);
    alert(mydata[0].crops[0].percentN);
    alert(mydata[0].crops[1].name);
    alert(mydata[0].crops[1].percentN);

}

////////// Variables Targeting Input and Output Values ////////////////
var crop = document.getElementById("cropSelect").value;
//var expectedYield = document.getElementById("ExpectedYield").value;
var units = document.getElementById("Units").value;
var strawRemoved = document.getElementById("StrawRemoved").value;
//var percentRemoved = document.getElementById("PercentRemoved").value;
var plantingDate = document.getElementById("PlantingDate").value;
var plantingMethod = document.getElementById("PlantingMethod").value;
var harvestDate = document.getElementById("HarvestDate").value;

function Calculate() {
  var Nconc = document.getElementById('NConc').innerHTML = cropJSON.percentN;
  var expectedYield = document.getElementById("ExpectedYield").value;
  var percentRemoved = document.getElementById("PercentRemoved").value;
  var NUptake = expectedYield * (Nconc/100);
  var NinStraw = expectedYield * (percentRemoved/100) * (Nconc/100);
  var Nremoved = expectedYield * (Nconc/100) - NinStraw;


  document.getElementById('NRemoved').innerHTML = Nremoved + " " + units;
  document.getElementById('NResidue').innerHTML = NinStraw + " " + units;
  document.getElementById('NUptake').innerHTML = NUptake + " " + units;


}
