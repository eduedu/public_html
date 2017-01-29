var bugs = [];  // Declare object

var img = [];
var mask;
var test;
var diametro;
function preload(){
  //img=loadImage('macri3.png');
  img.push(loadImage('ah1.png'));
  img.push(loadImage('ah2.png'));
  img.push(loadImage('ah3.png'));
  img.push(loadImage('ah4.png'));
  img.push(loadImage('ah5.png'));
  img.push(loadImage('ah6.png'));
  img.push(loadImage('ah7.png'));

  mask=loadImage('vignette4.png');
  test=loadImage('colo3.png');


}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  // Create object
  var xt=windowWidth/2;
  var yt=windowHeight/2;
  if(windowWidth < windowHeight){
      diametro=windowWidth*0.4;
  } else {
    diametro=windowHeight*0.4;
  }

  //bugs.push(new Jitter(img[0],xt, yt));
  //bugs.push(new Jitter(img[1]));
  //noStroke();
  strokeWeight(10)
  stroke(0, 255, 0);


  //background(0);
  //test.mask(mask);
  //img[0].mask(mask);
  for(var i=0; i<img.length;i++){
    img[i].mask(mask);

  }
  background(0);
  textSize(64);
  text("CLICK!", windowWidth*0.4, windowHeight*0.4);

}

function draw() {
  //background(50, 120, 100);
  //image(test,0,0);
  for(var i=0; i< bugs.length; i++){
    bugs[i].move();
    bugs[i].display();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  textSize(64);
  text("CLICK!", windowWidth*0.4, windowHeight*0.4);
  if(windowWidth < windowHeight){
      diametro=windowWidth*0.4;
  } else {
    diametro=windowHeight*0.4;
  }
}
function deviceTurned() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  textSize(64);
  text("CLICK!", windowWidth*0.4, windowHeight*0.4);
  if(windowWidth < windowHeight){
      diametro=windowWidth*0.4;
  } else {
    diametro=windowHeight*0.4;
  }
}


/*function touchMoved() {
	line(touchX, touchY, ptouchX, ptouchY);
	return false;
}
*/
function touchEnded() {
  //ellipse(touchX, touchY, windowWidth*0.4, windowWidth*0.4);
  //bugs.push(new Jitter());
  //bugs.push(new Jitter(img[0]),windowWidth/2, windowHeight/2);
  bugs.push(new Jitter(random(img),touchX-(diametro/2), touchY-(diametro/2)));
  return false;
}

// Jitter class
function Jitter(imagen, xt, yt) {
  this.image=imagen;
  this.x = xt; //random(10,(windowWidth*0.7));
  this.y = yt; //random(10, (windowHeight*0.7));
  this.diameter =diametro;// windowWidth*0.4; //random(10, 30);
  this.vel=10;
  this.speedX = this.vel;
  this.speedY = this.vel;
  this.r = 255;
  this.g = 255;
  this.b = 255;

  this.move = function() {
    // this.x += random(-this.speed, this.speed);
    // this.y += random(-this.speed, this.speed);
    this.diameter =diametro;
    var hit=false;
    if(this.x < 0 || (this.x+this.diameter) > width){
      if((this.x+this.diameter) > width) {
        this.x=width-this.diameter-1;
      }
      if((this.x-this.diameter) < 0) {
        this.x=0+1;
      }

        this.speedX *= -1;
        hit=true;
    }

    if(this.y < 0 || (this.y+this.diameter) > height){

      if((this.y+this.diameter) > height) {
        this.y=height-this.diameter-1;
      }
      if((this.y-this.diameter) < 0) {
        this.y=0+1;
      }

        this.speedY *= -1;
        hit=true;
    }
    this.x+=this.speedX;
    this.y+=this.speedY;

    /*
    if(hit) {
      this.r=random(0, 255);
      this.g=random(0, 255);
      this.b=random(0, 255);
    }
    */

  };

  this.display = function() {
    //fill(this.r, this.g, this.b);
    //ellipse(this.x, this.y, this.diameter/2, this.diameter/2);
    //tint(this.r, this.g, this.b);
    image(this.image,this.x, this.y, this.diameter, this.diameter);
  }
};
