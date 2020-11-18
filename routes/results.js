var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended:true}));

var boba = require('../boba.json');
var store = require('../stores.json');
//console.log(boba.Boba.length); //get the length of the array 


//console.log(boba.Boba[1].Name); // this is how to get the boba drinks;
//console.log(store.stores[0]); //this is how to get the store info 

/* GET results page */
router.get('/', function(req, res, next) {

  res.render('results', { title: 'Boba Tí'});

});

router.post('/', function(req,res){
  var bobaName;
  
  var foundStores = [];

  //console.log(req.body.results);
  var selection = req.body.results;
  selection = JSON.parse(selection);
  console.log(selection); // selection now has what the user selected as their drink
  

  //figure out the specific boba name 
  for(var i = 0; i < boba.Boba.length; i++)
  {
    if(boba.Boba[i].Base == selection[0] && boba.Boba[i].Flavor == selection[1])
    {
      bobaName = boba.Boba[i].Name;
      console.log(bobaName);
    }
  }
  
  //figure out the stores; 
  for(var i = 0; i < store.stores.length; i++)
  {
    //store.stores[i].name will give you the name of the store
    var checkMilk = store.stores[i].MilkTea; //gives you the current store that we are checking;
    var checkFruit = store.stores[i].FruitTea; //gives you the current store that we are checking;
    //checkStore = checkStore[bobaName];      //how to check object with a variable name, use bracket notation 
    //console.log(checkStore);
    //now check for the teas; 

    //check the milk teas
    if(selection[0] == "Milk")
    {
      //console.log("I entered the milk if statement");
      if(checkMilk[bobaName] == true) //if the drink exists in the store
      {
        foundStores.push(store.stores[i].name); //put the name of the stores in the array 
      }
    }
    //check the fruit teas 
    else if(selection[0] == "Green" || selection[0] == "Black")
    {
      //console.log("I entered the black if statement");
      if(checkFruit[bobaName] == true) //if the drink exists in the store
      {
        foundStores.push(store.stores[i].name); //put the name of the stores in the array 
      }
    }

  }

  console.log("Boba is found at " + foundStores); // check if the foundStores array was filled
  //var firstStore = foundStores[0];
  //console.log(firstStore);
  console.log(foundStores);
  //foundStores = JSON.stringify(foundStores);
  //console.log(foundStores);

  const data = {
    "number": "2",
    "number2" : "4"
  };

  res.render('yelp', {foundStores: foundStores});
});

module.exports = router;
