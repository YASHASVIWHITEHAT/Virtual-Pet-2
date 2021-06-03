var dog,sadDog,happyDog, database;
var feedS,feedStock;
var addfeed;
var feedObj;

//create feed and lastFed variable here
var fedTime, lastFed,feed,addfeed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  feedObj = new feed();

  feedStock=database.ref('feed');
  feedStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addfeed=createButton("Add feed");
  addfeed.position(800,95);
  addfeed.mousePressed(addfeeds);

}

function draw() {
  background(46,139,87);
  feedObj.display();

  //write code to read fedtime value from the database 
  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
 
  //write code to display text lastFed time here
   fill(255,255,254);
   textSize(15);
   if (lastFed >=12){
     text("Last feed:" + lastFed %12+"PM",350,30);
   }
   else if(lastFed == 0){
     text("Last feed:" + lastFed %12+"PM",350,30);
   }
   else{
     text("Last feed: "+ lastFed+"AM",350,30);
   }

 
  drawSprites();
}

//function to read feed Stock
function readStock(data){
  feedS=data.val();
  feedObj.updatefeedStock(feedS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update feed stock and last fed time

  feedObj.updatefeedStock(feedObj.getfeedStock()-1);
  database.ref('/').update({
    feed: feedObj.getfeedStock(),
    feedTime: hour()
  })

}

//function to add feed in stock
function addfeeds(){
  feedS++;
  database.ref('/').update({
    feed:feedS
  })
}
