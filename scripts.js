// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id='input'> innerHTML.

// Declare global HOST variables
var cropData = data;
var cropSelectorDiv = '<div>';
var cropSelector = 'Select a crop: ' + '<select id="cropSelector">';
var days = 0;
var start = document.getElementById('PlantingDate').value;
var end = document.getElementById('HarvestDate').value;




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

// add event listener to display residue removal on page load.
document.getElementById('cropSelector').addEventListener('change', function (){
   var currentCrop = document.getElementById('cropSelector').value;
   var cropChoices = cropData[0]['crops'];
   var w = document.getElementById('ResidueRemovedDiv');
   var x = document.getElementById('ResidueRemovedSelector').value;
   var y = document.getElementById('precentRemovedDiv');

   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;

     // set image source to currentCrop's value.
     if (currentCrop === name) {
       var residueRemovedBool = cropChoices[i]['residueRemoved'];

       if (residueRemovedBool == false){
         w.style.display = 'none';
         y.style.display = 'none';
       } else {
         w.style.display = 'inline-block';
         y.style.display = 'inline-block';
       }
     }
   }
});


// add event listener to Percent Residue Removed field based on if yes or no
document.getElementById('ResidueRemovedSelector').addEventListener('change', function (){
   var currentCrop = document.getElementById('cropSelector').value;
   var cropChoices = cropData[0]['crops'];
   var w = document.getElementById('ResidueRemovedSelector');
   var x = document.getElementById('ResidueRemovedSelector').value;
   var y = document.getElementById('precentRemovedDiv');

   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;

     // set image source to currentCrop's value.
     if (currentCrop === name) {
       if (x === "Yes") {
         console.log(x);
         y.style.display = 'inline-block';
       } else {
         y.style.display = 'none';
             console.log(x);
       };
     }
   }
});


// add event listener to calculate button to determine nitrogen values
document.getElementById('button').addEventListener("click", function () {
  var currentCrop = document.getElementById('cropSelector').value;
  var cropChoices = cropData[0]['crops'];
  var Nconc = "";
  var conversionFactor = "";
  var unitsConcentration = "";
  var NHI = "";

  // console.log(currentCrop);
   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;

     // set image source to currentCrop's value.
     if (currentCrop === name) {
       Nconc = cropChoices[i]['percentN'];
       unitsConcentration = cropChoices[i]['unitsConc'];
       NHI = cropChoices[i]['nhi'];
       console.log("NHI" + NHI);
       console.log(Nconc);
       console.log("this line" + unitsConcentration);
     }
   }
  // Grab input values from text boxes
  var expectedYield = document.getElementById("ExpectedYield").value;
  var percentRemoved = (document.getElementById("PercentRemoved").value) / 100;
  var units = document.getElementById('Units').value;
  units = "lbs/acre"

//  Get ConversionFactor -
  // for (i in cropChoices) {
  //   var crop = cropChoices[i];
  //   var name = units;
  //
  //   // set image source to currentCrop's value.
  //   if (currentCrop === name) {
  //     Nconc = cropChoices[i]['percentN'];
  //     console.log(Nconc);
  //   }
  // }


  // calculate important N values
  var NUptake = expectedYield * (Nconc/100) * 100;
  var NinResidue = ((1/NHI)-1) * NUptake;
  var TotalN = NUptake + NinResidue;
  var NHarvested = NUptake + (NinResidue * percentRemoved);


  console.log("NUptake: " + NUptake);
  console.log("NinResidue: " + NinResidue);
  console.log("NHarvested: " + NHarvested);
  console.log("TotalN: "  + TotalN);


  // get output textboxes and fill with values from calulcations
  document.getElementById('NConcInYield').innerHTML = Nconc + " " + unitsConcentration;
  document.getElementById('NInProduct').innerHTML = Number(Math.round(NUptake + 'e2') + 'e-2') + " " + units;
  document.getElementById('NUptake').innerHTML = Number(Math.round(TotalN + 'e2') + 'e-2') + " " + units;
  document.getElementById('NResidue').innerHTML = Number(Math.round(NinResidue + 'e3') + 'e-3') + " " + units;
  document.getElementById('NRemoved').innerHTML = Number(Math.round(NHarvested + 'e3') + 'e-3') + " " + units;



});

document.getElementById('button').addEventListener("click", function () {

    // get date input values
    var start = document.getElementById('PlantingDate').value;
    var end = document.getElementById('HarvestDate').value;
    console.log(start, end);

    // pass start and end date into DATE constructor
    var x = new Date(start);
    var y = new Date(end);

    console.log(x,y);

    // Calculate difference between dates - returns a value in milliseconds
    var z = Math.abs(y - x);

    console.log(z);

    // milliseconds converted into number of days
    days =  (z / (1000*60*60*24));

    console.log(days);

    // return days to allow access to the value for graphing functions
    return days;

});

console.log(days);

///////////////////////////////////////////////////////
/////////       Date Validatiion                ///////
///////////////////////////////////////////////////////


// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

document.getElementById('button').addEventListener("click", function (start) {
isValidDate();
});





///////////////////////////////////////////////////////
/////////       Canvas Graphing Functions       ///////
///////////////////////////////////////////////////////
var graph = function () {

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

// define graph origin position
var originX = 100;
var originY = 550;

// Draw X axis
ctx.beginPath();
ctx.moveTo(100,550);
ctx.lineTo(880,550);
ctx.stroke();

// Draw X Axis label
ctx.save();
ctx.font = ("30px Arial");
ctx.textAlign = "center";
ctx.fillText("Days after planting", 500, 625);
ctx.restore();

// Draw X axis tick marks
// ctx.beginPath();
// ctx.moveTo(originX + 50,originY + 10);
// ctx.lineTo(originX + 50,originY - 10);
// ctx.stroke();

// Function to draw X axis tick marks
(function () {
  xIncrement = 78;
  yIncrement = 10;
  xAxisLabel = Math.floor(days / 10);

  while (xIncrement < 850) {
    ctx.beginPath();
    ctx.moveTo(originX + xIncrement, originY + yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(xAxisLabel + " Days", originX + xIncrement - 12, originY + yIncrement + 10);
    xIncrement += 78;
    xAxisLabel += Math.floor(days / 10);
  }

})();


// Draw Y axis
ctx.beginPath();
ctx.moveTo(100,550);
ctx.lineTo(100,90);
ctx.stroke();

// Draw Y Axis label
ctx.save();
ctx.translate(40,325);
ctx.font = ("30px Arial");
ctx.rotate(- Math.PI / 2);
ctx.textAlign = "center";
ctx.fillText("N Uptake (% of Total)", 0, 0);
ctx.restore();
// // Draw Y axis tick marks
// ctx.beginPath();
// ctx.moveTo(60,500);
// ctx.lineTo(40,500);
// ctx.stroke();


// Function to draw Y axis tick marks
(function () {
  xIncrement = 10;
  yIncrement = 46;
  yAxisLabel = 10;

  while (yIncrement < 500) {
    ctx.beginPath();
    ctx.moveTo(originX - xIncrement, originY - yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(yAxisLabel + "%", originX - xIncrement - 25, originY - yIncrement + 3)
    yIncrement += 46;
    yAxisLabel += 10;
  }

})();



// TEST FUNCTION: Draw a sigmoidal



// Draw graph image from png
var image = document.createElement('img');

//image.src = data[0].crops[1].graph; // will change once crop-object-model

/////////////////////////////////////////////////////
///////       Image Selector Function        ///////
/////////////////////////////////////////////////////

function imageSelect() {
    var cropChoices = cropData[0]['crops'];
    var currentCrop = document.getElementById('cropSelector').value;

    // console.log(currentCrop);
     for (i in cropChoices) {
       var crop = cropChoices[i];
       var name = crop.name;

       // set image source to currentCrop's value.
       if (currentCrop === name) {
         image.src = cropChoices[i]['graph'];
       }
     }
};

//Call imageSelect to load image
imageSelect();


image.onload = function () {
  console.log('image height:' + image.height);
  console.log('image width:' + image.width);
  ctx.drawImage(image,101,90);
}

};

document.getElementById('button').addEventListener("click", function () {
graph();
});



// Date Validation //
