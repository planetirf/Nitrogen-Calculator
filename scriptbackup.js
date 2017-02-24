// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id='input'> innerHTML.

var cropData = data;
var inputHTML = '<div>' + 'Field ID: ' + '<input type="text" id="fieldId"><br><br>';
var cropSelector = 'Select a crop: ' + '<select id="cropSelector">';
var yieldInput = 'Expected Yield: ' + '<input type="text" id="expectedYield">';
var unitsInput = ' Units:' + '<select id="units">';
var residueRemovedBox = 'Check box if residue is removed' + '<input type= "checkbox" id="residueRemoved" /><br><br>';
var percentRemovedInput = 'Percent of plant residue removed: ' + '<input type="text" id="percentRemovedInput"><br><br>';
// Planting and Harvest Date inputs to be added

function getData() {

  // fetch crop list
  for (var i in cropData) {
    //cropName = cropData[i]['crops'][i]['name'];
    cropChoices = cropData[i]['crops'];
    //console.log(cropChoices);

  // add each crop in cropChoices to cropSelector dropdown menu
    for (var j in cropChoices){
      //console.log(cropChoices[j]['name']);
      name = cropChoices[j]['name'];
       cropSelector += "<option value=" + name + ">" + name + "</option>";
    }

    // close the cropSelector options and add into inputHTML
    cropSelector += '</select><br><br>';
    inputHTML += cropSelector;

  }
  // Build Input Skeleton - will need to refactor to get "moving parts" working
  // Yield Input

  unitsInput += '</select><br><br>';
  yieldInput += unitsInput;
  inputHTML += yieldInput;
  inputHTML += residueRemovedBox;
  inputHTML += percentRemovedInput;


// close inputHTML
  inputHTML += ' OHAY ' + '</div>';
  document.getElementById('input').innerHTML = inputHTML;
};
// Call getData function to populate input div.
getData();



//document.getElementById('cropSelector').addEventListener("load", unitSelector);
document.getElementById('cropSelector').addEventListener("change", unitSelector);

function unitSelector() {
    var cropData = data;
    var cropChoices = cropData[0]['crops']
    var currentCrop = document.getElementById('cropSelector').value;
    //console.log(currentCrop);
     for (i = 0; i < cropChoices.length; i++) {
       crop = cropChoices[i];
       name = crop.name;
       units = crop.units;
       //console.log(cropChoices[i]['name']);
       if (currentCrop === name) {
         for (j = 0; j < units.length; j++) {
           u = units[j];
           console.log(u);
           unitsInput += "<option value=" + u + ">" + u + "</option>";

         }
         unitsInput += '</select><br><br>';
         inputHTML += unitsInput;
       }
     }

}

// Call unitSelector function to initialize units
unitSelector();

function myFunction() {
    var mydata = data;
    alert(mydata[0].crops[0].name);
    alert(mydata[0].crops[0].percentN);
    alert(mydata[0].crops[1].name);
    alert(mydata[0].crops[1].percentN);

}

////////// Variables Targeting Input and Output Values ////////////////
var crop = document.getElementById("cropSelector").value;
var expectedYield = document.getElementById("expectedYield").value;
var units = document.getElementById("units").value;
var residueRemoved = document.getElementById("residueRemovedBox");
var percentRemoved = document.getElementById("percentRemovedInput").value;
// var plantingDate = document.getElementById("PlantingDate").value;
// var plantingMethod = document.getElementById("PlantingMethod").value;
// var harvestDate = document.getElementById("HarvestDate").value;
//
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
