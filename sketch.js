
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0
var score = 0
var PLAY =1
var END =0
var gameState =1

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png")
  obstacleImage = loadImage("obstacle.png")
 
}



function setup() {
  createCanvas(600,600)
  monkey = createSprite(80,540,20,20)
 monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  
ground = createSprite(300,580,1200,15)
  ground.velocityX=-4
  ground.x=ground.width/2
  
  sky=createSprite(300,90,600,10)
  sky.visible=false
  bananaGroup = createGroup()
  obstaclesGroup = createGroup()
  
}


function draw() {
background("lightblue")
  
  
  monkey.collide(ground)
  monkey.velocityY=monkey.velocityY + 0.8
  
  
if(gameState===PLAY){
  textSize(20)
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time =" + survivalTime, 100,50)
  
  if(ground.x<0) {
    ground.x = ground.width/2
  }
  if(keyDown("space")){
    monkey.velocityY=-12
  }
  
  if(monkey.isTouching(sky)){
    monkey.bounceOff(sky)
  }
  
  if(bananaGroup.isTouching(monkey)){
    score = score + 1
    bananaGroup[0].destroy()
}
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END
  }
  bananas()
  obstacles()
  
  }
  if(gameState===END){
    textSize(20)
  fill("white")
  text("Survival Time =" + survivalTime, 100,50)
  
    bananaGroup.destroyEach()
    obstaclesGroup.destroyEach()
    monkey.visible=false
    ground.visible=false
    textSize(40)
    text("GAME OVER",185,300)
  }

  
  
  drawSprites()
  textSize(20)
  text("Score: "+ score, 400,50);
}

function bananas(){
  if(World.frameCount%20===0){
    banana = createSprite(500,200,20,20)
    banana.addAnimation("banana",bananaImage)
    banana.y=Math.round(random(100,570))
    banana.velocityX = -8
    banana.setLifetime = 100
    banana.scale = 0.1
    
    bananaGroup.add(banana)
  }
}

function obstacles(){
  if(World.frameCount%100===0){
    obstacle = createSprite(600,520,20,20)
    obstacle.addAnimation("obstacle",obstacleImage)
    obstacle.velocityX = -8
    obstacle.setLifetime = 300
    obstacle.scale = 0.3
    obstacle.setCollider("circle",10,10,210)
    //obstacle.debug=true
    
    obstaclesGroup.add(obstacle)
  }
}



