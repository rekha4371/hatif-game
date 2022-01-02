const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var goalPosts =[]
function preload() {
  backgroundImg = loadImage("./assets/ground.jpg");
  goalkeeperImage = loadImage("./assets/goalkeeper.png");
  goalpostImage = loadImage("./assets/goalpost.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  goalKeeper = Bodies.rectangle(450, 250, 80, 180, { isStatic: true });
  World.add(world, goalKeeper);

  goalPost = Bodies.rectangle(600, 100, 50, 200, { isStatic: true });
  World.add(world, goalpostImage);

  cannon = new Cannon(600, 500, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();
  imageMode(CENTER);
  image(goalkeeperImage,goalKeeper.position.x, goalKeeper.position.y, 80, 180);
  image(goalpostImage,goalPost.position.x, goalPost.position.y, 250, 200);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }
  collisionWithGoalpost()
  cannon.display();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    balls[balls.length - 1].shoot();
  }
}


function collisionWithGoalpost(index) {
  for (var i = 0; i < goalPost.length; i++) {
    if (balls[index] !== undefined && goalPosts[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, goalPosts[i].body);

      if (collision.collided) {
        balls[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
    
  }
  
}
