var canvas;
var input, button, greeting;
var slide;
var navBar;
var barraMenuOpciones;
var logoBarra;

var botonLista;
var actualizarLista=0;
function setup() {
  //createCanvas(640, 480);
  /*
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
  */

  slide=selectAll('.mySlides')
  navBar=select('#myNavbar')
  barraMenuOpciones=select('#barraMenuOpciones')
  logoBarra=select('#logoBarra');

  botonLista=select('#botonLista');
  botonLista.mousePressed(poblarLista);
  poblarLista();
  //windowResized();
}

var options = [
        set0 = ['Option 1','Option 2'],
        set1 = ['First Option','Second Option','Third Option']
    ];

//var cars = ["Saab", "Volvo", "BMW"];
var cars = ["Cargando noticas..."];


function poblarLista(){
  //json url

  // Add the contents of options[0] to #foo:
  if(actualizarLista==0){
    document.getElementById('foo').appendChild(makeUL(cars));
    actualizarLista=1;
    var url = 'https://script.google.com/macros/s/AKfycbwPVattCBeKgzkAXXFzBaWpcCasoYzr769K9cUFXrBkNbwi8A-Y/exec'+
      '?action=getCeldas';
    loadJSON(url, callbackJson);
  } else {
    //var listado=select('#lista');
    //listado.class(' rb')
    resetLista();
    actualizarLista=0;
  }
  //actualizarLista++;
}

var arrayNoticias;
function callbackJson(datos){
  //console.log(datos);
  var lineas=datos.length;
  var i=0;
  var j=0;
  //var arrayNoticias=matrix(lineas+1,3,'-');
  arrayNoticias=null;
  arrayNoticias=matrix(lineas+1,3,'-');
  //console.log('total:'+lineas);
  for (elemento in datos) {
    //console.log(i+'-'+datos[elemento]);
    var linea=datos[elemento];
    //for(campo in linea){
    //  console.log(i+'-'+j+'-'+linea[campo]);
    //  j++;
    //}

    //console.log(i+'-'+datos[elemento][0]+'|'+datos[elemento][1]);
    arrayNoticias[elemento][0]=formatFecha(datos[elemento][0]);
    arrayNoticias[elemento][1]=datos[elemento][1];
    arrayNoticias[elemento][2]=datos[elemento][2];
    i++;
    //break;
  }
  resetLista();
  cargarLista(lineas, arrayNoticias);
}
function formatFecha(fecha){
  var d = new Date(fecha)
  var dd = d.getDate()
  if ( dd < 10 ) dd = '0' + dd
  var mm = d.getMonth()+1
  if ( mm < 10 ) mm = '0' + mm
  var yy = d.getFullYear() % 100
  if ( yy < 10 ) yy = '0' + yy
  return dd+'-'+mm+'-'+yy
}
function matrix( rows, cols, defaultValue){
  var arr = [];
  // Creates all lines:
  for(var i=0; i < rows; i++){
      // Creates an empty line
      arr.push([]);
      // Adds cols to the empty line:
      arr[i].push( new Array(cols));
      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }
  return arr;
}

function resetLista(){
  var items = document.getElementById("lista").childElementCount;
  var lista=document.getElementById("lista");
  for(var i=items;i>0;i--){
    lista.removeChild(lista.childNodes[i]);
  }
}
function cargarLista(lineas, array) {
    // Create the list element:
    //var lista = document.createElement('ul');
    //lista.class('w3-ul');
    //lista.className += " w3-ul w3-center";
    var lista=document.getElementById("lista");
    lista.className += " w3-ul w3-border";

    for(var i = lineas; i >0; i--) {
      if(array[i][0]!="-"){
        // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        var spanFecha = document.createElement("SPAN");
        //span1.className+= ' rb';
        var textoFecha=document.createTextNode(array[i][0]+' ');
        spanFecha.appendChild(textoFecha);
        item.appendChild(spanFecha);

        var spanTitulo =  document.createElement("SPAN");
        spanTitulo.className+= ' rb';
        var textoTitulo=document.createTextNode(array[i][1]);
        spanTitulo.appendChild(textoTitulo);
        item.appendChild(spanTitulo);
        item.appendChild(document.createElement("BR"));
        item.appendChild(document.createTextNode(array[i][2]));
        // Add it to the list:
        lista.appendChild(item);
      }
    }

   // Finally, return the constructed list:
    //return lista;
}

function makeUL(array) {
    // Create the list element:
    //var lista = document.createElement('ul');
    //lista.class('w3-ul');
    //lista.className += " w3-ul w3-center";
    var lista=document.getElementById("lista");
    lista.className += " w3-ul w3-border";
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');
        // Set its contents:
        /*
        var spanFecha = document.createElement("SPAN");
        //span1.className+= ' rb';
        var textoFecha=document.createTextNode('FECHA-');
        spanFecha.appendChild(textoFecha);
        item.appendChild(spanFecha);

        var spanTitulo =  document.createElement("SPAN");
        spanTitulo.className+= ' rb';
        var textoTitulo=document.createTextNode(array[i]);
        spanTitulo.appendChild(textoTitulo);
        item.appendChild(spanTitulo);
        item.appendChild(document.createElement("BR"));
        */
        item.appendChild(document.createTextNode(array[i]));


        // Add it to the list:
        lista.appendChild(item);
    }
   // Finally, return the constructed list:
    return lista;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
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
  /*
  resizeCanvas(windowWidth, windowHeight);
  //console.log(windowWidth+','+windowHeight);
  //var tmpAncho=windowWidth-((logoBarra.width)*1.5);
  //barraMenuOpciones.style('max-width',tmpAncho+'px');
  background(162, 97, 173);
  */
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
