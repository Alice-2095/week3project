
//[import the required package
//express is a third party package,not local package]
//express:reference to the module
let express = require('express');
let url = require('url');

//[create new instance of the express application]
let app = express();


//[db: array of items]
let db = [];

//[keep duplicate pathname]
//[listen to homepage requests]
app.get("/",function(req,res){
  
  res.send("Hello from database management system");
});

//[listen to "/listAllItems" path that responds with a string
// has all items in DB ]
app.get("/listAllItems",function(req,res){
    res.send(generateList());
  }); 

//[anything after col is a parameter, can accept any value]
//[key value pairs, keys are specified inside patterns, values are reterieved
//from url. Express does passing, create object ]
//[the callback responds with the updated list of users]
app.get("/newItem/:name/:quantity/:price",function(req,res){
   let newItem=Math.round(Math.random()*1000);
   let newObj={
    id: newItem,
    name: req.params.name,
    quantity: parseInt(req.params.quantity),
    price: parseInt(req.params.price)
   }
   db.push(newObj);
   res.send(generateList());
  });  


app.get("/deleteItem/:id",function(req,res){
   let found =false;
   for(let i=0;i<db.length && !found;i++){
     if(db[i].id ===parseInt(req.params.id)){
       db.splice(i,1);
       found =true;
     }
   }

   let msg ="";
   if(found){
     msg ="The object has been deleted";
   }else{
     msg= "The object cannot be found";
   }
   console.log(msg);
   res.send(generateList());
  });


  
app.get("/totalValue",function(req,res){
    let totalValue = caculTotalValue();
    res.send("The warehouse value is " + totalValue);
  });


//[generate a string contains a list of items]
function generateList(){
   
    let col = 'id  ' +  'name'  +  ' quantity' +   ' price' +   ' cost' + '</br>';
    for (let i=0;i<db.length;i++){
        col+= db[i].id + '  |  ' + db[i].name + '  |  ' + db[i].quantity + '   | '
        + db[i].price + '   |  '+ db[i].quantity * db[i].price +   '</br>';
    }
    return col;
}


function caculTotalValue(){
    var total=0;
    for (let i=0;i<db.length;i++){
        total+= db[i].quantity * db[i].price;    
    }
    console.log(total); 
    
    return total;
}

app.listen(8080);