class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.angle = angle;
    //this.cannon_image = loadImage("assets/canon.png");
   // this.cannon_base = loadImage("assets/cannonBase.png");
  }
  display() {
   if (keyIsDown(RIGHT_ARROW) && this.angle<30  ) {
      this.angle += 1;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle>-80 ) {
      this.angle -= 1;
    }

    push();
    translate(this.x, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
    //rect(0, 120, 50, 50);
    noFill();
  }
}
