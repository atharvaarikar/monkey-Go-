  
var monkey , monk
var banana ,ba, obstacle, ob
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var bag,obg;
var gamestate="serve";
var lifespan=0;
var ground2;

function preload(){
  
  
  monk =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  ba = loadImage("banana.png");
  ob = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(50,330,20,20);
  monkey.addAnimation("M",monk)
  monkey.scale=0.1
  monkey.setCollider("rectangle",0,0,150,230);
  

  ground=createSprite(400,365,2200,10);
  ground2=createSprite(200,343,700,10);
  
  bag=new Group();
  obg=new Group();
}


function draw() {
  background(200);
  monkey.debug=true;
  
  if(keyDown("space")&&monkey.y>328){
    monkey.velocityY=-13
    
  }
  
  if(gamestate==="serve"){
    
    if(monkey.isTouching(bag)){
      bag.destroyEach();
      score=score+1;
    }
  }
  
  if(monkey.isTouching(obg)){
    gamestate="end";
  }
  
  if(gamestate==="end"){
    ground.destroy();
    obg.destroyEach();
    bag.destroyEach();
    monkey.destroy();
    
    text("game over",170,200);
  }
  
  obstacle();
  banana();

  
  
  if(ground.x<-1){
    ground.x=ground.width/2;
  }

    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground2);
  
  
  lifespan=Math.ceil(frameCount/frameRate());  
  text("lifespan="+lifespan,320,40);
  text("score="+score,320,20);  
  ground2.visible=false;
  drawSprites();
}

function obstacle(){
  if(frameCount%80===0){
    var obstacle=createSprite(600,342,20,20);
    obstacle.addImage("OB",ob);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=160;
    obg.add(obstacle);
  }
}

function banana(){
  if(frameCount%94===0){
    var banana=createSprite(600,random(210,300),20,20);
    banana.addImage("BA",ba);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=160;
    bag.add(banana);
  }
}