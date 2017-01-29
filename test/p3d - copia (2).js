var canvas;
var img;
var vid;
var theta = 0;

var smallPoint, largePoint;
var w, h;
var xt=0;
var yt=0;
var pres=0;
var sol=0;
function preload() {
  img = loadImage("colo3.png");
}
function setup(){
  frameRate(60);
  //createCanvas(710, 400, WEBGL);
  //canvas = createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  //canvas.position(0, 0);
  //canvas.style('z-index','-1');

  //img = loadImage("assets/cat.jpg");
  //vid = createVideo(["assets/360video_256crop_v2.mp4"]);

  //vid.loop();
  //vid.hide();

  smallPoint = 2;
  largePoint = 20;
  //imageMode(CENTER);
  noStroke();
  background(0);
  img.loadPixels();
  w=img.width;
  h=img.height;

  rect(0,0,w,h);
}

function draw(){
  //background(162, 97, 173);
  //translate((windowWidth*0.5),0,0);

  //image(img,0,0);

/*
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);


    texture(img);
    var lado=windowWidth*0.35;
    box(lado, lado, lado);
  pop();
  theta += 0.10;
  */
  //var pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  var pointillize=12;
  //for(var i=0; i<20; i++){

    //var x = (random(w));
    //var y = (random(h));
    /*
    if(x>0 && y>0){
      var pix = img.get(x, y);
      fill(pix, 75);
      ellipse(x, y, pointillize, pointillize);

    }
    */
    /*
    if (mouseIsPressed){
      x=mouseX;
      y=mouseY;

    }
    */

    if(xt>0 && yt>0 ){
      var pix = img.get(xt, yt);
      var rad=20;
      fill(pix, 75);
      //ellipse(x, y, pointillize, pointillize);

      ellipse(xt, yt, rad, rad);
      // prevent default
      //console.log(x,y);
      //return false;
    }
  console.log(pres, mouseX.toString(),mouseY.toString(),xt,yt);
  //}
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //background(62, 97, 173);
}
/*
function mouseDragged(){
  x=mouseX;
  y=mouseY;
}
*/

/*
function mouseDragged() {
  xt=mouseX;
  yt=mouseY;
}
function mouseMoved() {
  xt=mouseX;
  yt=mouseY;
}
*/
/*
function touchStarted() {
  xt=mouseX;
  yt=mouseY;
  //return false;
}
*/
/*
function touchMoved() {
  xt=mouseX;
  yt=mouseY;
  return false;
}
*/
function mousePressed(){
  pres=1;
  xt=mouseX;
  yt=mouseY;
}
function mouseReleased(){
  pres=0;
}

/*
function touchMoved() {
  if(mouseX>0 && mouseY>0 && mouseX<w && mouseY<h){
    var pix = img.get(x, y);
    var rad=20;
    fill(pix, 75);
    //ellipse(x, y, pointillize, pointillize);

    ellipse(mouseX, mouseY, rad, rad);
    // prevent default
    return false;
    x=mouseX;
    y=mouseY;
    console.log(x);
    console.log(mouseY);
  }
}
*/
