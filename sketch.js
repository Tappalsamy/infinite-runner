

function preload(){
 boyrunning = loadAnimation("boy1.png","boy2.png","boy3.png");
 bg = loadImage("forest.jpg");
 infinitebg = loadImage("infinite forest.jpg");
 wood1 = loadImage("long_wood_spike.png");
 wood2 = loadImage("small_wood_spike.png");
 coinImg = loadImage("coin.png");
 boyDown = loadAnimation("boydown2.png", "boydown3.png")
 boyDown.looping = false
 monsterImg = loadAnimation("m1.png","m1.png","m2.png","m3.png","m4.png","m2.png","m3.png")
  
}

function setup() {

  createCanvas(windowWidth,windowHeight-10)
  gameState = "start";
  
  infbg = createSprite(width/2,height/2)
  infbg.addImage(infinitebg)

  boy = createSprite(550,height-150)
  boy.addAnimation("running", boyrunning)
  boy.addAnimation("falling", boyDown)
  boy.scale = 1.2

  monster = createSprite(50,height-220)
  monster.addAnimation("spooky", monsterImg)
  monster.scale = 3

  ground = createSprite(width/2,height-65,width,20)
  ground.visible = false

  coinsGroup = createGroup()
  woodsGroup = createGroup()

  score = 0
}

function draw() {
  background(bg)

  drawSprites(); 

  if(gameState=="start"){
    infbg.visible=false
    boy.visible = false
    monster.visible = false
    textAlign(CENTER)
    textSize(90)
    fill("red")
    stroke("black")
    strokeWeight(3)
    textFont("Times New Roman")
    text("Runner",width/2,250)

    textSize(50)
    fill("white")
    stroke("black")
    strokeWeight(3)
    textFont("Times New Roman")
    text("Press enter to start...",width/2,400)

    if(keyDown("enter")){
      gameState = "play"
    }
  }
  if(gameState=="play"){
    infbg.visible = true
    infbg.velocityX = -15

    monster.visible = true
    monster.x+=0.01

    if(boy.isTouching(monster)){
      gameState = "end"
    }

    textSize(40)
    fill("red")
    text("Score:"+score,width-200,100)

    if(infbg.x<0){
      infbg.x = infbg.width/2 
    }
    boy.visible = true
    boy.collide(ground)
    if((keyDown ("up") || keyDown ("space")) && boy.y>height-200){
      boy.velocityY = -20
    }
    boy.velocityY +=1.2
    
    createCoins()
    createWood()

    for(var i=0;i<coinsGroup.length;i++){
      if(boy.isTouching(coinsGroup[i])){
        coinsGroup[i].destroy()
        score+= 5
      }
    }
    if(woodsGroup.isTouching(boy)){
      gameState = "end"
    }
  }
  if(gameState=="end"){
    boy.velocityY = 0
    infbg.velocityX = 0
    coinsGroup.setVelocityXEach(0)
    woodsGroup.setVelocityXEach(0)
    boy.changeAnimation("falling")
    coinsGroup.setLifetimeEach(-100000000000000000000000000000000000000000000000000000000000000000000)
    woodsGroup.setLifetimeEach(-3234850234852038450982345092038403582348502384095203485092390450234852983459234952983475)
   
    textAlign(CENTER)
    textSize(90)
    fill("red")
    stroke("black")
    strokeWeight(3)
    textFont("Times New Roman")
    text("YOU DIED",width/2,250)
  }

  
  
}

function createCoins(){
  if(frameCount%(Math.round(random(70,90)))==0){
    coin = createSprite(width,random(height/2+50,height-100))
    coin.addImage(coinImg)
    coin.velocityX = -15
    coin.scale = 0.2
    coinsGroup.add(coin)
    coin.lifetime = 500
  }
}

function createWood(){
  if(frameCount%(Math.round(random(100,120)))==0){
    wood = createSprite(width,height-150)
    wood.velocityX = -15
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: wood.addImage(wood1)
      break;

      case 2: wood.addImage(wood2)
      break;

      default:
      break;
    }
    woodsGroup.add(wood)
    wood.lifetime = 500
  }
}



