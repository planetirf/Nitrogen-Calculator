// Irfan Ainuddin
// Get data from data.json populated crop selector and load <div id="input"> innerHTML.

// Declare global HOST variables
var cropData = data;
var cropSelectorDiv = "";
var cropSelector = "<label for=\"cropSelector\">" + "Select a Crop:" + "</label>" + "<select id=\"cropSelector\">";
var days = 0;
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

var soil_bulk_densities = { Sand: '1.46',
                            LoamySand:'1.47',
                            SandyLoam:'1.49',
                            Loam:'1.47',
                            SiltyLoam:'1.41',
                            Silt:'1.41',
                            SandyClayLoam:'1.50',
                            ClayLoam:'1.42',
                            SiltyClayLoam:'1.33',
                            SiltyClay:'1.26',
                            Clay:'1.25',
                          };

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
          // unitsInput += "</select><br>";
         console.log(unitsInput);
         unitSelector.innerHTML += unitsInput;
       }
     }
}

//Call unitSelector function to initialize units
unitSelectorFunction();

// check if season box is checked
document.getElementById("cropSelector").addEventListener("change", SeasonCheckFunction);

function SeasonCheckFunction (){
  var cropChoices = cropData[0]["crops"];
  var currentCrop = document.getElementById("cropSelector").value;
  var seasonBox = document.getElementById("lateSeason");

  for (i in cropChoices) {
    var crop = cropChoices[i];
    var name = crop.name;

    // Check current name against selected crop name
    if (currentCrop === name) {
      var seasonBool = cropChoices[i]["lateSeason"];
      console.log("SEASONBOOL" + seasonBool)

      if (seasonBool == false){
        seasonBox.style.display = "none";
      } else {
        seasonBox.style.display = "";
      }
    }
  }
}

SeasonCheckFunction();
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
  document.getElementById("NInProduct").innerHTML =  Number(Math.round(NUptake)) + " " + units;
  document.getElementById("NUptake").innerHTML =  Number(Math.round(TotalN)) + " " + units;
  document.getElementById("NResidue").innerHTML = Number(Math.round(NinResidue)) + " " + units;
  document.getElementById("NRemoved").innerHTML = Number(Math.round(NHarvested)) + " " + units;


});


// G#
document.getElementById("button2").addEventListener("click", function () {

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
    document.getElementById('wae').placeholder = 45 + " - " + 80 + "%";
  } else if (wae_range === "Sprinkler") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 65 + " - " + 85 + "%";
  } else if (wae_range === "Flood") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 40 + " - " + 80 + "%";
  } else if (wae_range === "Center Pivot") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 75 + " - " + 85 + "%";
  } else if (wae_range === "Linear Move") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 85 + " - " + 90 + "%";
  } else if (wae_range === "Microsprayer") {
    document.getElementById('wae').value = "";
    document.getElementById('wae').placeholder = 75 + " - " + 85 + "%";
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
      //  console.log("NHI " + NHI);   // print to console test
      //  console.log("Nconc " + Nconc);  // print to console test
      //  console.log("unitsConcentration " + unitsConcentration);  // print to console test

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
   var inSeasonNMineralized = document.getElementById('regionSelector').value;;
   var wae = (document.getElementById("wae").value)/100;
   var som = document.getElementById("som").value;
   var som_units = document.getElementById('som_units').value;


  // calculate important N values
  var NUptake = expectedYield * (Nconc/100) * 100 * cFactor;
  var NinResidue = ((1/NHI)-1) * NUptake;
  var TotalN = NUptake + NinResidue;
  var NHarvested = NUptake + (NinResidue * percentRemoved);

  // console.log("depth_water_applied" + depth_water_applied);
  // console.log("PPM" + ppm);
  // console.log("soiLTexture: "+  soilTexture);

  if (NppmWaterUnits === "NO3") {
    var NInIrrWater = ppm * NO3_to_NO3N * depth_water_applied * ppm_NO3N_to_lbs_N;
    document.getElementById("nInIrrigation").innerHTML = Number(Math.round(NInIrrWater)) + " lbs/acre";
  } else {
    var NInIrrWater = ppm * depth_water_applied * ppm_NO3N_to_lbs_N;
    document.getElementById("nInIrrigation").innerHTML = Number(Math.round(NInIrrWater)) + " lbs/acre";
    // console.log(NInIrrWater + "NO3n !!!!!!!");Number(Math.round(NInIrrWater + "e2") + "e-2") + " lbs/acre";
  };

  if (residual_soil_N_units === "NO3") {
    var residual_soil_N = residual_soil_N * NO3_to_NO3N;

  };
  // convert som g/kg to percent to determine bulk density value
  if (som_units === "g/kg") {
    var som = som / 10;
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
      document.getElementById("residualN").innerHTML = Number(Math.round(soilN)) + " lbs/acre";
      document.getElementById("nNeed").innerHTML = Number(Math.round( TotalN - soilN - NInIrrWater - inSeasonNMineralized ))+ " lbs/acre";
      document.getElementById("leachingRisk").innerHTML = Number(Math.round( (1- wae) * (TotalN - soilN - NInIrrWater - inSeasonNMineralized))) + " lbs/acre";
      document.getElementById("nMineralized").innerHTML = Number(Math.round()) + " lbs/acre";
      document.getElementById('nMineralized').innerHTML = Number(Math.round( inSeasonNMineralized )) + " lbs/acre"
      document.getElementById("NConcInYield").innerHTML =  Nconc + " " + unitsConcentration;
      document.getElementById("NInProduct").innerHTML =  Number(Math.round(NUptake)) + " " + units;
      document.getElementById("NUptake").innerHTML =  Number(Math.round(TotalN)) + " " + units;
      document.getElementById("NResidue").innerHTML = Number(Math.round(NinResidue)) + " " + units;
      document.getElementById("NRemoved").innerHTML = Number(Math.round(NHarvested)) + " " + units;

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


    };
  };


  units = "lbs/acre";
  // get output textboxes and fill with values from calulcations
  document.getElementById("totalNUptake2").innerHTML =  Number(Math.round(TotalN + "e2") + "e-2") + " " + units;

  });


  document.getElementById("button2").addEventListener("click", function () {



  });
