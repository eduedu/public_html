var canvas;
var img;
var vid;
var theta = 0;

function setup(){
  //createCanvas(710, 400, WEBGL);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index','-1');

  //img = loadImage("assets/cat.jpg");
  //vid = createVideo(["assets/360video_256crop_v2.mp4"]);
  img = loadImage("img/logo1.png");
  //vid.loop();
  //vid.hide();
}

function draw(){
  background(62, 97, 173);
  //translate((windowWidth*0.5),0,0);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
    texture(img);
    var lado=windowWidth*0.20;
    box(lado, lado, lado);
  pop();
  theta += 0.05;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(62, 97, 173);
}
