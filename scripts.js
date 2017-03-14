// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id='input'> innerHTML.

var cropData = data;
var cropSelectorDiv = '<div>';
var cropSelector = 'Select a crop: ' + '<select id="cropSelector">';


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
       //console.log(cropSelector);
    }

    // close the cropSelector options and add into inputHTML
    cropSelector += '</select><br><br>';
    cropSelectorDiv += cropSelector;

  }

// close cropSelectorDiv
  cropSelectorDiv += ' OHAY ' + '</div>';
  document.getElementById('cropInput').innerHTML = cropSelectorDiv;
};
// Call getData function to populate input div.
getData();



//document.getElementById('cropSelector').addEventListener("load", unitSelector);
document.getElementById('cropSelector').addEventListener("change", unitSelectorFunction);

function unitSelectorFunction() {
    var cropData = data;
    var cropChoices = cropData[0]['crops'];
    var currentCrop = document.getElementById('cropSelector').value;
    var unitSelector = document.getElementById('Units');

    //console.log(currentCrop);
     for (i in cropChoices) {
       var crop = cropChoices[i];
       var name = crop.name;
       var units = crop['units'];
       var unitsInput = '';

       //console.log(cropChoices[i]['name']);
       if (currentCrop === name) {
         unitSelector.innerHTML = unitsInput;
         for (j in units) {


           var u = units[j];
           //console.log(u);
           unitsInput += "<option value=" + u + ">" + u + "</option>";

         }
         //unitsInput += "</select><br>";
         console.log(unitsInput);
         unitSelector.innerHTML += unitsInput;
       }
     }

}

//Call unitSelector function to initialize units
unitSelectorFunction();

function myFunction() {
    var mydata = data;
    alert(mydata[0].crops[0].name);
    alert(mydata[0].crops[0].percentN);
    alert(mydata[0].crops[1].name);
    alert(mydata[0].crops[1].percentN);

}

document.getElementById('button').addEventListener("click", function () {
  var Nconc = document.getElementById('NConc').innerHTML = data[0].crops[0].percentN; // <--- REFACTOR THIS INTO A FUNCTION THAT SELECTS APPROPRIATE
  var expectedYield = document.getElementById("ExpectedYield").value;
  var percentRemoved = document.getElementById("PercentRemoved").value;
  var NUptake = expectedYield * (Nconc/100);
  var NinStraw = expectedYield * (percentRemoved/100) * (Nconc/100);
  var Nremoved = expectedYield * (Nconc/100) - NinStraw;
  var units = document.getElementById('Units').value;
  document.getElementById('NRemoved').innerHTML = Nremoved + " " + units;
  document.getElementById('NResidue').innerHTML = NinStraw + " " + units;
  document.getElementById('NUptake').innerHTML = NUptake + " " + units;
})

////////// Variables Targeting Input and Output Values ////////////////
var crop = document.getElementById("cropSelector").value;
// var expectedYield = document.getElementById("expectedYield").value;
// var units = document.getElementById("units").value;
var residueRemoved = document.getElementById("residueRemovedBox");
// var percentRemoved = document.getElementById("percentRemovedInput").value;
// var plantingDate = document.getElementById("PlantingDate").value;
// var plantingMethod = document.getElementById("PlantingMethod").value;
// var harvestDate = document.getElementById("HarvestDate").value;
//
// function Calculate() {
//   var Nconc = document.getElementById('NConc').innerHTML = cropJSON.percentN;
//   var expectedYield = document.getElementById("ExpectedYield").value;
//   var percentRemoved = document.getElementById("PercentRemoved").value;
//   var NUptake = expectedYield * (Nconc/100);
//   var NinStraw = expectedYield * (percentRemoved/100) * (Nconc/100);
//   var Nremoved = expectedYield * (Nconc/100) - NinStraw;
//
//
//   document.getElementById('NRemoved').innerHTML = Nremoved + " " + units;
//   document.getElementById('NResidue').innerHTML = NinStraw + " " + units;
//   document.getElementById('NUptake').innerHTML = NUptake + " " + units;
//
//
// }
