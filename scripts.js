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
  cropSelectorDiv += '</div>';
  document.getElementById('cropInput').innerHTML = cropSelectorDiv;
};
// Call getData function to populate input div.
getData();



//document.getElementById('cropSelector').addEventListener("load", unitSelector);
document.getElementById('cropSelector').addEventListener("change", unitSelectorFunction);


function unitSelectorFunction() {
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


// test function to get data
function myFunction() {
    var mydata = data;
    alert(mydata[0].crops[0].name);
    alert(mydata[0].crops[0].percentN);
    alert(mydata[0].crops[1].name);
    alert(mydata[0].crops[1].percentN);
}
// Test function to create a CROP object type to load in the selected crop values, this object will be used for calculations.

function crop(name,percentN,units, conversionFactor, residueRemoved, slope, intercept){

}



// add event listener to Percent Residue Removed field based on if yes or no
document.getElementById('StrawRemoved').addEventListener('change', function (){
   var x = document.getElementById('StrawRemoved').value;
   var y = document.getElementById('residueRemoved');

   if (x == "yes") {
     console.log(x);
     y.style.display = 'inline-block';
   } else {
     y.style.display = 'none';
         console.log(x);
   };
});


// add event listener to calculate button to determine nitrogen values
document.getElementById('button').addEventListener("click", function () {
  var currentCrop = document.getElementById('cropSelector').value;
  var Nconc = data[0].crops[0].percentN;
  var concFunction = function () {


  } // <--- REFACTOR THIS INTO A FUNCTION THAT SELECTS APPROPRIATE


  var expectedYield = document.getElementById("ExpectedYield").value;
  var percentRemoved = document.getElementById("PercentRemoved").value;
  var units = document.getElementById('Units').value;



  var NUptake = expectedYield * (Nconc/100);
  var NinStraw = expectedYield * (percentRemoved/100) * (Nconc/100);
  var Nremoved = expectedYield * (Nconc/100) - NinStraw;



  document.getElementById('NRemoved').innerHTML = Nremoved + " " + units;
  document.getElementById('NResidue').innerHTML = NinStraw + " " + units;
  document.getElementById('NUptake').innerHTML = NUptake + " " + units;


});

document.getElementById('button').addEventListener("click", function () {

    // get date input values
    var start = document.getElementById('PlantingDate').value;
    var end = document.getElementById('HarvestDate').value;
    console.log(start, end);

    var x = new Date(start);
    var y = new Date(end);

    console.log(x,y);

    var z = Math.abs(y - x);

    console.log(z);

    var days =  (z / (1000*60*60*24));

    console.log(days);

});
