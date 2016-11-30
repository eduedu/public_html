var canvas;
var input, button, greeting;
var slide;
var navBar;
var barraMenuOpciones;
var logoBarra;

function setup() {
  //createCanvas(640, 480);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index','-1');
  //background(62, 97, 173);
  noStroke();

  input = createInput();
  input.position(20, 65);
  input2 = createInput();
  input2.position(20, 105);

  button = createButton('submit');
  button.position(150, 145);
  //button.mousePressed(greet);
  button.mousePressed(testDomW3);

  greeting = createElement('h1', 'what is your name?');
  greeting.position(20, 5);

  slide=selectAll('.mySlides')
  navBar=select('#myNavbar')
  barraMenuOpciones=select('#barraMenuOpciones')
  logoBarra=select('#logoBarra');

  //windowResized();
}

function draw() {
  //background(62, 97, 173);
  /*
  if (mouseIsPressed) {
    fill(255, 0, 150);
  } else {
    fill(0, 220, 200);
  }
  ellipse(mouseX, mouseY, 5, 5);
  */
}
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  console.log(windowWidth+','+windowHeight);
  //var tmpAncho=windowWidth-((logoBarra.width)*1.5);
  //barraMenuOpciones.style('max-width',tmpAncho+'px');
  background(162, 97, 173);
}
function testDomW3(){
  //slide.style('width', '50%');
  for(var i=0;i< slide.length; i++){
    //slide[i].style('width', '90%');
    //slide[i].style('src','img/im4.jpg');
    //slide[i].src('img/im4.jpg');
    //var temp=slide[i].attribute('src');
    //console.log('imagen:'+temp);
    var n=4+i;
    //slide[i].attribute('src','img/im'+n+'.jpg');
  }
  //navBar.style('background-color','#ff0000');
  //var att=navBar.style('background-color');
  var att=navBar.style('height');
  console.log('att:'+att);
  console.log('alto barra' + logoBarra.height);

}
function greet() {
  miRequest();
  var name = input.value();

  //input.value('');

  for (var i=0; i<200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2*PI));
    text(name, 0, 0);
    pop();
  }
}
function miRequest() {
  var url='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec?action=getUrlCount&url=3624280746';
  var url2='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec';
  //var respuesta=httpGet(url,null,null,cbRequest());
  // var lines = loadStrings(url);
  // var respuesta=lines;
  // console.log('Respuesta:'+String(lines[0]));
  var num=input.value;
  console.log(num);
  console.log('-'+num+'-');
  //url: '3624280746'
  var params = {
    action: 'getUrlCount',
    url:num
  }
  httpGet(url2, params, finished);
}
function finished(response) {
  console.log(response);
  greeting.html('hello '+response+'!');
}

// function cbRequest(data ) {
//   console.log('Data:'+String(data));
//   //greeting.html('hello '+String(data)+'!');
//   greeting.html('hello '+'hola'+'!');
// }
