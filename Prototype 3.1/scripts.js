// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id="input"> innerHTML.

// Declare global HOST variables
var cropData = data;
var cropSelectorDiv = "";
var cropSelector =  "<label for=\"cropSelector\">" + "B. Select a crop:" + "</label>" + "<select id=\"cropSelector\">";
var days = 0;
var minerTot = 0;
var start = document.getElementById("PlantingDate").value;
var end = document.getElementById("HarvestDate").value;

const lbs_to_kg = .453592;
const acre_to_ha = .404686;
const acre_to_square_m = 4046.86;
const foot_to_m = .3048;
const density_g_to_kg = 1000;
const acre_inch_to_kg = 102790.2118;
const acre_inch_to_lbs =  226613.8821;
const ppm_NO3N_to_lbs_N = 0.226613882;
const NO3_to_NO3N = 0.2259;
const NO3N_to_NO3 = 4.4268;
const acre = 43560;
const density_water_lbs = 62.43;


var soil_bulk_densities_nest = {
                            "Sand": {
                              "low":1.52,
                              "med":1.39,
                              "high":1.26,
                            },
                            "LoamySand": {
                              "low":1.53,
                              "med":1.40,
                              "high":1.26,
                            },
                            "SandyLoam": {
                              "low":1.56,
                              "med":1.42,
                              "high":1.28,
                            },
                            "Loam": {
                              "low":1.54,
                              "med":1.40,
                              "high":1.25,
                            },
                            "SiltyLoam": {
                              "low":1.50,
                              "med":1.32,
                              "high":1.14,
                            },
                            "Silt": {
                              "low":1.52,
                              "med":1.30,
                              "high":1.07,
                            },
                            "SandyClayLoam": {
                              "low":1.55,
                              "med":1.44,
                              "high":1.07,
                            },
                            "ClayLoam": {
                              "low":1.47,
                              "med":1.36,
                              "high":1.26,
                            },
                            "SiltyClayLoam": {
                              "low":1.39,
                              "med":1.27,
                              "high":1.14,
                            },
                            "SiltyClay": {
                              "low":1.22,
                              "med":1.23,
                              "high":1.17,
                            },
                            "Clay": {
                              "low":1.26,
                              "med":1.24,
                              "high":1.22,
                            },
                          };

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
    cropSelector += "</select>";
    cropSelectorDiv += cropSelector;
  }
// close cropSelectorDiv
  cropSelectorDiv += "";
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
          unitsInput += "</select><br>";
        //  console.log(unitsInput);
         unitSelector.innerHTML += unitsInput;
       }
     }
}

//Call unitSelector function to initialize units
unitSelectorFunction();

function strawRemoved(){
  var currentCrop = document.getElementById("cropSelector").value;
  var cropChoices = cropData[0]["crops"];

  var residueRemovedDiv = document.getElementById('precentRemovedDiv');

  for (i in cropChoices) {
    var crop = cropChoices[i];
    var name = crop.name;
    var residueBool = crop["residueRemoved"];


    if (currentCrop === name) {
      if (residueBool === true) {
        console.log("residueBoolTRUE" + residueBool);
        residueRemovedDiv.style.display = "flex";
      } else {
        console.log("residueBool" + residueBool);
        residueRemovedDiv.style.display = "none";
      }
    }

    }


};

strawRemoved();

document.getElementById("cropSelector").addEventListener("change", strawRemoved);

function resetFunction(){
  document.getElementById('totalNUptake2').innerHTML = "";
  document.getElementById('nInIrrigation').innerHTML = "";
  document.getElementById('residualN').innerHTML = "";
  document.getElementById('nNeed').innerHTML = "";
  document.getElementById('leachingRisk').innerHTML = "";
  document.getElementById('nMineralized').innerHTML = "";
  document.getElementById("NConcInYield").innerHTML = "";
  document.getElementById("NInProduct").innerHTML = "";
  document.getElementById("NUptake").innerHTML = "";
  document.getElementById("NResidue").innerHTML = "";
  document.getElementById("NRemoved").innerHTML = "";
  document.getElementById("additionalN").innerHTML = "";
  document.getElementById("PercentRemoved").value = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

};

document.getElementById("cropSelector").addEventListener("change",resetFunction);



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


     // GET: crop data from currentCrop
     if (currentCrop === name) {
       Nconc = cropChoices[i]["percentN"];
       unitsConcentration = cropChoices[i]["unitsConc"];
       NHI = cropChoices[i]["nhi"];
      //  console.log("NHI " + NHI);   // print to console test
      //  console.log("Nconc " + Nconc);  // print to console test
      //  console.log("unitsConcentration " + unitsConcentration);  // print to console test

      // GET: Crop Specific notes
      var note = cropChoices[i]["note"];
      var links = cropChoices[i]["links"];
      console.log(links);
      // var links = cropChoices[i]["linkText"];
      var notesText = note;

      console.log(notesText);

      if (note) {
        document.getElementById("cropNotes").innerHTML = "<strong>Notes: </strong>" + notesText;
      }

      if (links) {
        document.getElementById("cropLinks").innerHTML = "<strong>Links: </strong> " + links;
      }
      // document.getElementById("cropNotes").innerHTML = "Notes: " + notesText;
      // document.getElementById("cropLinks").innerHTML = "<strong>Links: </strong> " + links;


      // GET: References list
      var refs = [];
      var refText =  "";
      refs = cropChoices[i]["refs"];

       // Iterate through References list and populate list
       for (var q = 0; q < refs.length; q++ ) {
        var item = "<li> " + refs[q] + " </li>";
        refText += item;
        // console.log("ITEM:  " + item);
      }

      document.getElementById('references').innerHTML = refText;



       for (j in unitsSelected){
         if (units === unitsSelected[j]) {
        //  console.log("J" + unitsSelected[j]); // print to console test
         var position = unitsSelected.indexOf(unitsSelected[j]);
         cFactor = cropChoices[i]["conversionFactor"][j];
         // console.log("cFactor " + cropChoices[i]["conversionFactor"][j]); // print to console test
         break;

       } else {
         console.log("ERRROR: no conversion factor");
       }

       }
     }
   }

  // calculate important N values
  var NUptake = expectedYield * (Nconc/100) * 100 * cFactor;
  var NinResidue = ((1/NHI)-1) * NUptake;
  var TotalN = NUptake + NinResidue;
  var NRemoved = NUptake + (NinResidue * percentRemoved);


  // console.log("NUptake: " + NUptake);
  // console.log("NinResidue: " + NinResidue);
  // console.log("NRemoved: " + NRemoved);
  // console.log("TotalN: "  + TotalN);

  units = "lbs/acre"
  // get output textboxes and fill with values from calulcations
  document.getElementById("NConcInYield").innerHTML =   Nconc + " " + unitsConcentration ;
  document.getElementById("NInProduct").innerHTML =   Number(Math.round(NUptake)) + " " + units ;
  document.getElementById("NUptake").innerHTML =   Number(Math.round(TotalN)) + " " + units ;
  document.getElementById("NResidue").innerHTML =  Number(Math.round(NinResidue)) + " " + units ;
  document.getElementById("NRemoved").innerHTML =  Number(Math.round(NRemoved)) + " " + units ;



});


// G#
document.getElementById("button").addEventListener("click", function () {

    // get date input values
    var start = document.getElementById("PlantingDate").value;
    var end = document.getElementById("HarvestDate").value;
    // console.log(start, end);

    // pass start and end date into DATE
    var x = new Date(start);
    var y = new Date(end);

    // console.log(x,y);

    // Calculate difference between dates - returns a value in milliseconds
    var z = Math.abs(y - x);

    // console.log(z);

    // milliseconds converted into number of days
    days =  (z / (1000*60*60*24));

    // console.log(days);
    // return days to allow access to the value for graphing functions
    return days;

});

document.getElementById("button2").addEventListener("click", function () {

    // get date input values
    var start = document.getElementById("PlantingDate").value;
    var end = document.getElementById("HarvestDate").value;
    // console.log(start, end);

    // pass start and end date into DATE
    var x = new Date(start);
    var y = new Date(end);

    // console.log(x,y);

    // Calculate difference between dates - returns a value in milliseconds
    var z = Math.abs(y - x);

    // console.log(z);

    // milliseconds converted into number of days
    days =  (z / (1000*60*60*24));

    // console.log(days);
    // return days to allow access to the value for graphing functions
    return days;

});

/// DANIELS SSCRIPTS

  let test = document.createElement('input');
	test.type = 'date';
	// if it does, run the code inside the if() {} block
	if (test.type === 'text') {
	document.getElementById("abc").style.display = "block";
	document.getElementById("bcd").style.display = "none";
	NMineralizationIE();
	// date input not supported
	}
	else {
	document.getElementById("abc").style.display = "none";
	document.getElementById("bcd").style.display = "";
        // NMineralization();
	}


  function NMineralizationIE() {
      var string = document.getElementById('PlantingDateIE').value;
      var numbersP = string.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
      var MonthP = numbersP[0];
      var DayP = numbersP[1];
      var YearP = numbersP[2];
      var string = document.getElementById('HarvestDateIE').value;
      var numbersH = string.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
      var MonthH = numbersH[0];
      var DayH = numbersH[1];
      var YearH = numbersH[2];

  // Calculate day of the year for planting and harvest date
      var DoYP = 0;
      var DoYH = 0;

      if (MonthP == 1) DoYP=DayP;
      else if (MonthP == 2) DoYP=DayP + 31;
      else if (MonthP == 3) DoYP=DayP + 59;
      else if (MonthP == 4) DoYP=DayP + 90;
      else if (MonthP == 5) DoYP=DayP + 120;
      else if (MonthP == 6) DoYP=DayP + 151;
      else if (MonthP == 7) DoYP=DayP + 181;
      else if (MonthP == 8) DoYP=DayP + 212;
      else if (MonthP == 9) DoYP=DayP + 243;
      else if (MonthP == 10) DoYP=DayP + 273;
      else if (MonthP == 11) DoYP=DayP + 304;
      else (DoYP = DayP + 334);

      if (MonthH == 1) DoYH=DayH;
      else if (MonthH == 2) DoYH=DayH + 31;
      else if (MonthH == 3) DoYH=DayH + 59;
      else if (MonthH == 4) DoYH=DayH + 90;
      else if (MonthH == 5) DoYH=DayH + 120;
      else if (MonthH == 6) DoYH=DayH + 151;
      else if (MonthH == 7) DoYH=DayH + 181;
      else if (MonthH == 8) DoYH=DayH + 212;
      else if (MonthH == 9) DoYH=DayH + 243;
      else if (MonthH == 10) DoYH=DayH + 273;
      else if (MonthH == 11) DoYH=DayH + 304;
      else (DoYH = DayH + 334);

  // Calculate in-season N minerlization rate
      var RangeMin = 0.2; //value depends on region
      var RangeMax = 1;   //value depends on region
      var MinAnnual = 80; //value depends on region

      var Range = RangeMax - RangeMin;
      var RangeAv = (RangeMax + RangeMin)/2;
      var miner = 0;
      var minerTot = 0;
      var planting = YearP * 365 + DoYP;
      var harvest = YearH * 365 + DoYH;
      var LengthOfSeason = harvest - planting;
      var DoY = planting ;

      for (var i = planting ; i <= harvest; i++) {
  	miner = (Math.sin(((DoY)/365*4+3)*Math.PI/2)/2*Range+RangeAv)/RangeAv*MinAnnual/365;
  	minerTot = minerTot + miner;
  	DoY = DoY + 1;
          }
          console.log("miner tot IE" + minerTot);
          return minerTot

  }



document.getElementById('button2').addEventListener("click", function() {
  var PlantingDate = document.getElementById('PlantingDate').valueAsDate;
  var DayP = PlantingDate.getDate();
  var MonthP = PlantingDate.getMonth();
  var MonthPC = MonthP+1;
  var YearP = PlantingDate.getFullYear();

  var HarvestDate = document.getElementById('HarvestDate').valueAsDate;
  var DayH = HarvestDate.getDate();
  var MonthH = HarvestDate.getMonth();
  var MonthHC = MonthH+1;
  var YearH = HarvestDate.getFullYear();


// Calculate day of the year for planting and harvest date
  var DoYP = 0;
  var DoYH = 0;

  if (MonthP == 0) DoYP=DayP;
  else if (MonthP == 1) DoYP=DayP + 31;
  else if (MonthP == 2) DoYP=DayP + 59;
  else if (MonthP == 3) DoYP=DayP + 90;
  else if (MonthP == 4) DoYP=DayP + 120;
  else if (MonthP == 5) DoYP=DayP + 151;
  else if (MonthP == 6) DoYP=DayP + 181;
  else if (MonthP == 7) DoYP=DayP + 212;
  else if (MonthP == 8) DoYP=DayP + 243;
  else if (MonthP == 9) DoYP=DayP + 273;
  else if (MonthP == 10) DoYP=DayP + 304;
  else (DoYP = DayP + 334);

  if (MonthH == 0) DoYH=DayH;
  else if (MonthH == 1) DoYH=DayH + 31;
  else if (MonthH == 2) DoYH=DayH + 59;
  else if (MonthH == 3) DoYH=DayH + 90;
  else if (MonthH == 4) DoYH=DayH + 120;
  else if (MonthH == 5) DoYH=DayH + 151;
  else if (MonthH == 6) DoYH=DayH + 181;
  else if (MonthH == 7) DoYH=DayH + 212;
  else if (MonthH == 8) DoYH=DayH + 243;
  else if (MonthH == 9) DoYH=DayH + 273;
  else if (MonthH == 10) DoYH=DayH + 304;
  else (DoYH = DayH + 334);

// Calculate in-season N minerlization rate
  var RangeMin = 0.2; //value depends on region
  var RangeMax = 1;   //value depends on region
  var MinAnnual = 80; //value depends on region

  var Range = RangeMax - RangeMin;
  var RangeAv = (RangeMax + RangeMin)/2;
  var miner = 0;
  var planting = YearP * 365 + DoYP;
  var harvest = YearH * 365 + DoYH;
  var LengthOfSeason = harvest - planting;
  var DoY = planting ;
  minerTot = 0;

  if (LengthOfSeason < 0) {
    alert("The harvest date is before the planting date.\nPlease correct.");}

  for (var i = planting ; i <= harvest; i++) {
    miner = (Math.sin(((DoY)/365*4+3)*Math.PI/2)/2*Range+RangeAv)/RangeAv*MinAnnual/365;
    minerTot = minerTot + miner;
    DoY = DoY + 1;
      }

    console.log("miner tot " + minerTot);
    return minerTot


});


// console.log(days);

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
ctx.lineTo(355,246);
ctx.stroke();

// Draw X Axis label
ctx.save();
ctx.font = ("12px Verdana");
ctx.textAlign = "center";
ctx.fillText("Days after planting", 224, 280.5);
ctx.restore();

// Function to draw X axis tick marks
(function () {
  xIncrement = 32.5;
  yIncrement = 5;
  xAxisLabel = Math.floor(days / 10);

  while (xIncrement < 355) {
    ctx.beginPath();
    ctx.moveTo(originX + xIncrement, originY + yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(xAxisLabel + "", originX + xIncrement - 8, originY + yIncrement + 10 );
    xIncrement += 32.5;
    xAxisLabel += Math.floor(days / 10);
  }

})();


// Draw Y axis
ctx.beginPath();
ctx.moveTo(30,246);
ctx.lineTo(30,55);
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
  yIncrement = 19.1;
  yAxisLabel = 10;

  while (yIncrement < 191 ) {
    ctx.beginPath();
    ctx.moveTo(originX - xIncrement, originY - yIncrement);
    ctx.lineTo(originX + xIncrement, originY - yIncrement);
    ctx.stroke();
    ctx.fillText(yAxisLabel + "", originX - xIncrement - 10, originY - yIncrement - 2)
    yIncrement += 19.1;
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


    // console.log(currentCrop);
     for (i in cropChoices) {
       var crop = cropChoices[i];
       var name = crop.name;
      //  console.log("season" + season);

       // set image source to currentCrop"s value.
       if (currentCrop === name) {
         image.src = cropChoices[i]["graph"];
       }
     }
};

//Call imageSelect to load image
imageSelect();

image.onload = function () {
  // console.log("image height:" + image.height);
  // console.log("image width:" + image.width);
  ctx.drawImage(image,30,53);
}

};

// #I
document.getElementById("button").addEventListener("click", function () {
graph();
});

document.getElementById("button").addEventListener("click", function () {
document.getElementById("NConcInYield").style.display = ""
document.getElementById("NInProduct").style.display = ""
document.getElementById("NUptake").style.display = ""
document.getElementById("NResidue").style.display = ""
document.getElementById("NRemoved").style.display = ""
});


// Date Validation //

//********* PART 2  **********//

document.getElementById('irrigationSystemSelector').addEventListener("change", function() {
  var wae_range = document.getElementById('irrigationSystemSelector').value;

  document.getElementById('wae').placeholder = 10;

  if(wae_range === "Drip") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = ">" + 95 + "%";
  } else if (wae_range === "Furrow") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 45 + "-" + 80 + "%";
  } else if (wae_range === "Sprinkler") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 65 + "-" + 85 + "%";
  } else if (wae_range === "Flood") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 40 + "-" + 80 + "%";
  } else if (wae_range === "Center Pivot") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 75 + "-" + 85 + "%";
  } else if (wae_range === "Linear Move") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 85 + "-" + 90 + "%";
  } else if (wae_range === "Microsprayer") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 75 + "-" + 85 + "%";
  }

});

  // copied the part 1 calculate function and as a starting template.probably lots to clean up
document.getElementById("button2").addEventListener("click", function () {

  var currentCrop = document.getElementById("cropSelector").value;
  var cropChoices = cropData[0]["crops"];
  var Nconc = "";
  var conversionFactor = "";
  var unitsConcentration = "";
  var NHI = "";
  var inSeasonNMineralized = 0;
  var percentRemoved = 0;


  // Grab input values from text boxes
  var expectedYield = document.getElementById("ExpectedYield").value;
  percentRemoved = (document.getElementById("PercentRemoved").value) / 100;
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
      //  console.log("NHI " + NHI);   // print to console test
      //  console.log("Nconc " + Nconc);  // print to console test
      //  console.log("unitsConcentration " + unitsConcentration);  // print to console test


      // GET: Crop Specific notes
      var note = cropChoices[i]["note"];
      var links = cropChoices[i]["links"];
      console.log(links);
      // var links = cropChoices[i]["linkText"];
      var notesText = note;

      console.log(notesText);

      if (note) {
        document.getElementById("cropNotes").innerHTML = "<strong>Notes: </strong>" + notesText;
      }

      if (links) {
        document.getElementById("cropLinks").innerHTML = "<strong>Links: </strong> " + links;
      }


      // GET: References list
      var refs = [];
      var refText =  "";
      refs = cropChoices[i]["refs"];

       // Iterate through References list and populate list
       for (var q = 0; q < refs.length; q++ ) {
        var item = "<li> " + refs[q] + " </li>";
        refText += item;
        // console.log("ITEM:  " + item);
      }

      document.getElementById('references').innerHTML = refText;

       for (j in unitsSelected){
         if (units === unitsSelected[j]) {
        //  console.log("J" + unitsSelected[j]); // print to console test
         var position = unitsSelected.indexOf(unitsSelected[j]);
         cFactor = cropChoices[i]["conversionFactor"][j];
        //  console.log("cFactor " + cropChoices[i]["conversionFactor"][j]); // print to console test
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
   var depth_water_applied = document.getElementById("inchesOfWater").value;
   var ppm = document.getElementById("NppmWater").value;
   var NppmWaterUnits = document.getElementById("NppmWaterUnits").value;
   var soilTexture = document.getElementById("soilTypeSelector").value;
   var sampling_depth = document.getElementById("samplingDepth").value;
   var residual_soil_N = document.getElementById("NppmSoil").value;
   var residual_soil_N_units = document.getElementById("NppmSoilUnits").value
   var inSeasonNMineralized = minerTot;
   var wae = document.getElementById("wae").value;
   var som = document.getElementById("som").value;
   var som_units = document.getElementById('som_units').value;
   var NInIrrWater = 0;


  // calculate important N values
  var NUptake = expectedYield * (Nconc/100) * 100 * cFactor;
  var NinResidue = ((1/NHI)-1) * NUptake;
  var TotalN = NUptake + NinResidue;
  var NRemoved = NUptake + (NinResidue * percentRemoved);

  // console.log("depth_water_applied" + depth_water_applied);
  // console.log("PPM" + ppm);
  // console.log("soiLTexture: "+  soilTexture);

  if (NppmWaterUnits === "NO3") {
    var NInIrrWater = ppm * NO3_to_NO3N * depth_water_applied * ppm_NO3N_to_lbs_N;
    var NInIrrWater = parseInt(NInIrrWater, 10);
    // line 8.
    document.getElementById("nInIrrigation").innerHTML =Number(Math.round(NInIrrWater)) + " lbs/acre" ;


  } else {
    var NInIrrWater = ppm * depth_water_applied * ppm_NO3N_to_lbs_N;
    // line 8.
    document.getElementById("nInIrrigation").innerHTML =  Number(Math.round(NInIrrWater)) + " lbs/acre";
    var NInIrrWater = parseInt(NInIrrWater, 10);
    // console.log(NInIrrWater + "NO3n !!!!!!!");Number(Math.round(NInIrrWater + "e2") + "e-2") + " lbs/acre";

  };

  if (residual_soil_N_units === "NO3") {
    var residual_soil_N = residual_soil_N * NO3_to_NO3N;

  };
  // convert som g/kg to percent to determine bulk density value
  if (som_units === "g/kg") {
     som = som / 10;
    // console.log("som converted" + som)
  };

  for (d in soil_bulk_densities_nest) {
    if(d === soilTexture) {
      console.log("TEXTURE:" + soilTexture);
      console.log("d:" + d);

      for(o in soil_bulk_densities_nest){
        if(som < 2) {
          var bulk_density = soil_bulk_densities_nest[soilTexture].low;
          console.log("LOW" + bulk_density);
        } else if (som >= 2 && som < 4) {
          var bulk_density = soil_bulk_densities_nest[soilTexture].med;
          console.log("MED" + bulk_density);
        } else {
          var bulk_density = soil_bulk_densities_nest[soilTexture].high;
          console.log("HIGH" + bulk_density);
        }

      };
      // console.log(bulk_density);
      var acre_density = ((bulk_density * acre * density_water_lbs)/12) * sampling_depth;
      var dFactor = (acre_density)/1000000;
      console.log(dFactor);
      var soilN = dFactor * residual_soil_N;
      units = "lbs/acre";
      var reqN = TotalN - soilN - NInIrrWater - inSeasonNMineralized;
      var lRisk = soilN + NInIrrWater + reqN * (100-wae)/100;
      var addN = (TotalN - soilN - NInIrrWater - inSeasonNMineralized - reqN + lRisk) / (wae/100);

      console.log("ADD N : " + addN)

      if (reqN <= 0) {
        reqN = 0;
      };

      if (lRisk <= 0) {
        lRisk = 0
      };

      if (addN <= 0) {
        addN = 0
      };

      // Line 12.
      document.getElementById("additionalN").innerHTML = Number(Math.round(addN)) + " lbs/acre";
      document.getElementById("NConcInYield").innerHTML =   Nconc + " " + unitsConcentration ;

      // Line 2.
      document.getElementById("NInProduct").innerHTML =   Number(Math.round(NUptake)) + " " + units;

      // unused?
      document.getElementById("NUptake").innerHTML =   Number(Math.round(TotalN)) + " " + units;

      // Line 4.
      document.getElementById("NResidue").innerHTML =  Number(Math.round(NinResidue)) + " " + units;

      // Line 5.
      document.getElementById("NRemoved").innerHTML =  Number(Math.round(NRemoved)) + " " + units;

      // Line 7.
      document.getElementById("residualN").innerHTML =  Number(Math.round(soilN)) + " lbs/acre";
      // Line 9.
      document.getElementById('nMineralized').innerHTML =  Number(Math.round( inSeasonNMineralized )) + " lbs/acre";
      // Line 10.
      document.getElementById("nNeed").innerHTML =  Number(Math.round(reqN))+ " lbs/acre";

      // Lin 11.
      document.getElementById("leachingRisk").innerHTML = Number(Math.round(lRisk)) + " lbs/acre";



      graph();

      document.getElementById('totalNUptake2').style.display = "";
      document.getElementById('nInIrrigation').style.display = "";
      document.getElementById('residualN').style.display = "";
      document.getElementById('nNeed').style.display = "";
      document.getElementById('leachingRisk').style.display = "";
      document.getElementById('nMineralized').style.display = "";
      document.getElementById("NConcInYield").style.display = "";
      document.getElementById("NInProduct").style.display = "";
      document.getElementById("NUptake").style.display = "";
      document.getElementById("NResidue").style.display = "";
      document.getElementById("NRemoved").style.display = "";
      document.getElementById("additionalN").style.display = "";


    };
  };


  units = "lbs/acre";
  // get output textboxes and fill with values from calulcations
  // Line 6.
  document.getElementById("totalNUptake2").innerHTML = Number(Math.round(TotalN)) + " " + units;


  });


  document.getElementById("button2").addEventListener("click", function () {



  });

  (function() {
    var opened_element = null;

    window.toggle2 = function(id) {
     var ee = document.getElementById(id);
     if (opened_element && opened_element !== ee) {
         opened_element.style.display = 'none';
     }
     if(ee.style.display == 'block') {
        ee.style.display = 'none';
     }
     else {
        ee.style.display = 'block';
     }
     opened_element = ee;
    };
  }());
