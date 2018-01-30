// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id="input"> innerHTML.

// Declare global HOST variables
var cropData = data;
var cropSelectorDiv = "<div>";
var cropSelector = "Select a crop:" + "<select id=\"cropSelector\">";
var days = 0;
var start = document.getElementById("PlantingDate").value;
var end = document.getElementById("HarvestDate").value;




// A# Planting and Harvest Date inputs to be added
function getData() {
  // fetch crop list
  for (var i in cropData) {
    //cropName = cropData[i]["crops"][i]["name"];
    cropChoices = cropData[i]["crops"];
    //console.log(cropChoices);

  // add each crop in cropChoices to cropSelector dropdown menu
    for (var j in cropChoices){
      //console.log(cropChoices[j]["name"]);
      name = cropChoices[j]["name"];
       cropSelector += "<option value=" + name + ">" + name + "</option>";
       //console.log(cropSelector);
    }
    // close the cropSelector options and add into inputHTML
    cropSelector += "</select><br>";
    cropSelectorDiv += cropSelector;
  }
// close cropSelectorDiv
  cropSelectorDiv += "</div>";
  document.getElementById("cropInput").innerHTML = cropSelectorDiv;
};
// Call getData function to populate input div.
getData();


// B# document.getElementById("cropSelector").addEventListener("load", unitSelector);
document.getElementById("cropSelector").addEventListener("change", unitSelectorFunction);

// C# Unit Selector Function,
function unitSelectorFunction() {
    var cropChoices = cropData[0]["crops"];
    var currentCrop = document.getElementById("cropSelector").value;
    var unitSelector = document.getElementById("Units");

    //console.log(currentCrop);

    // Loop through crop choices array & set relevant properties
     for (i in cropChoices) {
       var crop = cropChoices[i];
       var name = crop.name;
       var units = crop["units"];
       var unitsInput = "";

       //console.log(cropChoices[i]["name"]);

       // Check current name against selected crop name
       if (currentCrop === name) {
         // set unSelector to local variable
         unitSelector.innerHTML = unitsInput;

         // loop through current units & populate unit options list
         for (j in units) {
           var u = units[j];
           // console.log("units j" + units[j]);
           // console.log(u);

           unitsInput += "<option value=" + u + ">" + u + "</option>";
         }
          // unitsInput += "</select><br>";
         console.log(unitsInput);
         unitSelector.innerHTML += unitsInput;
       }
     }
}

//Call unitSelector function to initialize units
unitSelectorFunction();

// D# add event listener to display residue removal on page load.
document.getElementById("cropSelector").addEventListener("change", function (){
   var currentCrop = document.getElementById("cropSelector").value;
   var cropChoices = cropData[0]["crops"];
   var w = document.getElementById("ResidueRemovedDiv");
   var x = document.getElementById("ResidueRemovedSelector").value;
   var y = document.getElementById("precentRemovedDiv");

   // get current crop
   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;

     // set image source to currentCrop"s value.
     if (currentCrop === name) {
       var residueRemovedBool = cropChoices[i]["residueRemoved"];

       if (residueRemovedBool == false){
         w.style.display = "none";
         y.style.display = "none";
       } else {
         w.style.display = "inline-block";
         y.style.display = "inline-block";
       }
     }
   }
});


// E# add event listener to Percent Residue Removed field based on if yes or no
document.getElementById("ResidueRemovedSelector").addEventListener("change", function (){
   var currentCrop = document.getElementById("cropSelector").value;
   var cropChoices = cropData[0]["crops"];
   var w = document.getElementById("ResidueRemovedSelector");
   var x = document.getElementById("ResidueRemovedSelector").value;
   var y = document.getElementById("precentRemovedDiv");
   // get current crop
   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;

     // set image source to currentCrop"s value.
     if (currentCrop === name) {
       if (x === "Yes") {
         console.log(x);
         y.style.display = "inline-block";
       } else {
         y.style.display = "none";
             console.log(x);
       };
     }
   }
});


// F# add event listener to calculate button to determine nitrogen values
document.getElementById("button").addEventListener("click", function () {
  var currentCrop = document.getElementById("cropSelector").value;
  var cropChoices = cropData[0]["crops"];
  var Nconc = "";
  var conversionFactor = "";
  var unitsConcentration = "";
  var NHI = "";

  // Grab input values from text boxes
  var expectedYield = document.getElementById("ExpectedYield").value;
  var percentRemoved = (document.getElementById("PercentRemoved").value) / 100;
  var units = document.getElementById("Units").value;
  // units = "lbs/acre"

  // console.log(currentCrop);

  // get current crop
   for (i in cropChoices) {
     var crop = cropChoices[i];
     var name = crop.name;
     var unitsSelected = crop["units"];

     // set image source to currentCrop"s value.
     if (currentCrop === name) {
       Nconc = cropChoices[i]["percentN"];
       unitsConcentration = cropChoices[i]["unitsConc"];
       NHI = cropChoices[i]["nhi"];
       console.log("NHI " + NHI);   // print to console test
       console.log("Nconc " + Nconc);  // print to console test
       console.log("unitsConcentration " + unitsConcentration);  // print to console test

       for (j in unitsSelected){
         if (units === unitsSelected[j]) {
         console.log("J" + unitsSelected[j]); // print to console test
         var position = unitsSelected.indexOf(unitsSelected[j]);
         cFactor = cropChoices[i]["conversionFactor"][j];
         console.log("cFactor " + cropChoices[i]["conversionFactor"][j]); // print to console test
         break;

       } else {
         console.log("ERRROR");
       }
        //  if ("J " + units[j] === units){
        //    console.log("ZZZ" + units[j]);
        //  };
       }
     }
   }

  // calculate important N values
  var NUptake = expectedYield * (Nconc/100) * 100 * cFactor;
  var NinResidue = ((1/NHI)-1) * NUptake;
  var TotalN = NUptake + NinResidue;
  var NHarvested = NUptake + (NinResidue * percentRemoved);


  console.log("NUptake: " + NUptake);
  console.log("NinResidue: " + NinResidue);
  console.log("NHarvested: " + NHarvested);
  console.log("TotalN: "  + TotalN);

  units = "lbs/acre"
  // get output textboxes and fill with values from calulcations
  document.getElementById("NConcInYield").innerHTML =  Nconc + " " + unitsConcentration;
  document.getElementById("NInProduct").innerHTML =  Number(Math.round(NUptake + "e2") + "e-2") + " " + units;
  document.getElementById("NUptake").innerHTML =  Number(Math.round(TotalN + "e2") + "e-2") + " " + units;
  document.getElementById("NResidue").innerHTML = Number(Math.round(NinResidue + "e3") + "e-3") + " " + units;
  document.getElementById("NRemoved").innerHTML = Number(Math.round(NHarvested + "e3") + "e-3") + " " + units;



});


// G#
document.getElementById("button").addEventListener("click", function () {

    // get date input values
    var start = document.getElementById("PlantingDate").value;
    var end = document.getElementById("HarvestDate").value;
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
/////////                     ///////
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
/////////     H#  Canvas Graphing Functions       ///////
///////////////////////////////////////////////////////
var graph = function () {

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

// define graph origin position
var originX = 30;
var originY = 246;

// Draw X axis
ctx.beginPath();
ctx.moveTo(30,246);
ctx.lineTo(381,246);
ctx.stroke();

// Draw X Axis label
ctx.save();
ctx.font = ("12px Verdana");
ctx.textAlign = "center";
ctx.fillText("Days after planting", 224, 280.5);
ctx.restore();

// Function to draw X axis tick marks
(function () {
  xIncrement = 35;
  yIncrement = 5;
  xAxisLabel = Math.floor(days / 10);

  while (xIncrement < 385) {
    ctx.beginPath();
    ctx.moveTo(originX + xIncrement, originY + yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(xAxisLabel + "", originX + xIncrement - 8, originY + yIncrement + 10 );
    xIncrement += 35;
    xAxisLabel += Math.floor(days / 10);
  }

})();


// Draw Y axis
ctx.beginPath();
ctx.moveTo(30,246);
ctx.lineTo(30,40.5);
ctx.stroke();

// Draw Y Axis label
ctx.save();
ctx.translate(10,146);
ctx.font = ("12px Verdana");
ctx.rotate(- Math.PI / 2);
ctx.textAlign = "center";
ctx.fillText("N Uptake (% of Total)", 0, 0);
ctx.restore();

// Function to draw Y axis tick marks
(function () {
  xIncrement = 4.5;
  yIncrement = 20.6;
  yAxisLabel = 10;

  while (yIncrement < 224 ) {
    ctx.beginPath();
    ctx.moveTo(originX - xIncrement, originY - yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(yAxisLabel + "", originX - xIncrement - 10, originY - yIncrement - 2)
    yIncrement += 20.6;
    yAxisLabel += 10;
  }

})();

// Draw graph image from png
var image = document.createElement("img");

//image.src = data[0].crops[1].graph; // will change once crop-object-model

/////////////////////////////////////////////////////
///////    H.1#   Image Selector Function        ///////
/////////////////////////////////////////////////////

function imageSelect() {
    var cropChoices = cropData[0]["crops"];
    var currentCrop = document.getElementById("cropSelector").value;
    var season = document.getElementById("lateSeasonBox").checked;

    // console.log(currentCrop);
     for (i in cropChoices) {
       var crop = cropChoices[i];
       var name = crop.name;
       console.log("season" + season);

       // set image source to currentCrop"s value.
       if (currentCrop === name && season === false) {
         image.src = cropChoices[i]["graph"];
       } else if (currentCrop === name && season === true){
         image.src = cropChoices[i]["graphLate"];
       }
     }
};

//Call imageSelect to load image
imageSelect();

image.onload = function () {
  console.log("image height:" + image.height);
  console.log("image width:" + image.width);
  ctx.drawImage(image,30,39);
}

};

// #I
document.getElementById("button").addEventListener("click", function () {
graph();
});

document.getElementById("button").addEventListener("click", function () {
document.getElementById("NConcInYield").style.display = "inline-flex"
document.getElementById("NInProduct").style.display = "inline-flex"
document.getElementById("NUptake").style.display = "inline-flex"
document.getElementById("NResidue").style.display = "inline-flex"
document.getElementById("NRemoved").style.display = "inline-flex"
});


// Date Validation //
