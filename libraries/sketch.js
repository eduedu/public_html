var canvas;
var input, button, greeting;
var slide;
var navBar;
var barraMenuOpciones;
//var logoBarra;
var loaderNoticias;
var lineasNoticiasTotales=5;
var incrementoNoticias=3;
var noticias;

var btnCargarMas;
var actualizarLista=0;
var btnIngresar;
function setup() {
  //createCanvas(640, 480);
  /*
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index','-1');
  //background(62, 97, 173);
  noStroke();
  */
  loaderNoticias=select('#loaderNoticias');
  loaderNoticias.hide();
  btnCargarMas=select('#btnCargarMas');
  btnCargarMas.mousePressed(cargarMasClick);
  btnCargarMas.hide();

  slide=selectAll('.mySlides')
  navBar=select('#myNavbar')
  barraMenuOpciones=select('#barraMenuOpciones')
  //logoBarra=select('#logoBarra');
  //logoBarra.mousePressed(testGet);

  btnIngresar=select('#btnIngresar');
  btnIngresar.mousePressed(ingresarClick);

  //windowResized();
  poblarLista();
  //ingresarClick();
}

function ingresarClick(){
  loaderNoticias.show();
  //var url = 'https://script.google.com/macros/s/AKfycbwPVattCBeKgzkAXXFzBaWpcCasoYzr769K9cUFXrBkNbwi8A-Y/exec?action=getCeldas';
  var url='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec?'
  +'action=wgu&a=3794950807';

  loadJSON(url, cbTest, errCb);

  function cbTest(datos){
    //console.log('rta:' + datos);
    //console.log('nombre:' + datos.nom);
    //console.log('num:' + datos.num);
    for(item in datos){
      //console.log(datos[item].key+'-'+datos[item].value);
      //console.log(item +'-'+datos[item]);
    }
    //console.log(datos.noticias);
    callbackJson(datos.noticias);
    var miCuenta=document.getElementById('miCuenta');
    var miCuentaDatos=document.getElementById('miCuentaDatos');
    var htmlRendered=htmlRender(datos.auto);
    miCuentaDatos.insertAdjacentHTML("beforeend",htmlRendered);
    //console.log(datos.auto.url1);
    document.getElementById('url0').src=datos.auto.url1;
    document.getElementById('url1').src=datos.auto.url1;
    document.getElementById('url2').src=datos.auto.url2;
    document.getElementById('url3').src=datos.auto.url3;
    document.getElementById('url4').src=datos.auto.url4;
    document.getElementById('menuIngresar').style.display='none';
    document.getElementById('menuMiCuenta').style.display='block';
    miCuenta.style.display='block';
    document.getElementById('aMiCuenta').scrollIntoView(true);
    document.getElementById('id01').style.display='none';
    function htmlRender(auto){
      var s='';
      s='<p>Modelo:'+auto.nombre+'</p>';
      s+='<p>Descripcion:'+auto.descripcion+'</p>';
      s+='<p>Precio:'+auto.precio+'</p>';
      s+='<p>Llaves:'+auto.llaves+'</p>';
      return s;
    }
  }
  function errCb(err){
    console.log('Error:');
    console.log(err);
    document.getElementById('id01').style.display='none';
  }
}


function poblarLista(){
  //json url
  // Add the contents of options[0] to #foo:
  if(actualizarLista==0){
    loaderNoticias.show();
    //document.getElementById('foo').appendChild(makeUL(cars));
    actualizarLista=1;
    var url = 'https://script.google.com/macros/s/AKfycbwPVattCBeKgzkAXXFzBaWpcCasoYzr769K9cUFXrBkNbwi8A-Y/exec'+
      '?action=wgn';
    loadJSON(url, callbackJson);
  } else {
    //var listado=select('#lista');
    //listado.class(' rb')
    resetLista();
    actualizarLista=0;
  }
  //actualizarLista++;
}
function cargarMasClick(){
  lineasNoticiasTotales=lineasNoticiasTotales+incrementoNoticias;
  //resetLista();
  callbackJson();
}
var arrayNoticias;
function callbackJson(datos){
  if(datos){
    datos=datos.reverse();
    datos.pop(); //borro el encabezado
    noticias=datos;
  } else {
    datos=noticias;
  }
  //console.log(datos);
  var lineas=datos.length;
  var i=0;
  var j=0;
  //var arrayNoticias=matrix(lineas+1,3,'-');
  arrayNoticias=null;
  arrayNoticias=matrix(lineas+1,3,'-');
  //console.log('total:'+lineas);
  var cantidadLineas=0;
  var mostrarBotonCargarMas=false;
  for (elemento in datos) {
    var linea=datos[elemento];

    arrayNoticias[elemento][0]=formatFecha(datos[elemento][0]);
    arrayNoticias[elemento][1]=datos[elemento][1];
    arrayNoticias[elemento][2]=datos[elemento][2];
    i++;
    //break;
    //SALR DEL BUCLE SI SE LLEGO AL MAXIMO DE LINEAS Q SE QUIERE MOSTRAR
    cantidadLineas=i;
    //console.log(i+'-'+lineasNoticiasTotales+'-'+cantidadLineas);

    if(i>=lineasNoticiasTotales){
      mostrarBotonCargarMas=true;
      if(i>=(datos.length)){
        mostrarBotonCargarMas=false;
      }
      break;
    }

  }
  resetLista();
  cargarLista(cantidadLineas, arrayNoticias);
  loaderNoticias.hide();
  if(mostrarBotonCargarMas){
    btnCargarMas.show();
  } else {
    btnCargarMas.hide();
  }

}
function resetLista(){
  var items = document.getElementById("lista").childElementCount;
  var lista=document.getElementById("lista");
  for(var i=items;i>0;i--){
    lista.removeChild(lista.childNodes[i]);
  }
}
function cargarLista(lineas, array) {
  resetLista();
  var lista=document.getElementById("lista");
  lista.className += " w3-ul ";
  for(var i = 0; i <lineas; i++) {
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
