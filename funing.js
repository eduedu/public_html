var cam1;
var cam2;
var btnConseguirMasLlaves;
var btnSolicitarAsesor;
var btnPedirMiAuto;
var gdata;
function ingresarFBCk(){
  loaderProceso.show();
  /*
  ingresar(true);
  var fbData=fbAuth();
  console.log('fbData'+fbData);
  */
  //fbAuth();
  FB.login(function(response) {
    if (response.authResponse) {
      //console.log('User fully authorize the app.');
      //alert('User fully authorize the app.');
      FB.api('/me', function(response) {
        //console.log('Successful login for: ' + response.name);
        //console.log('ID: ' + response.id);
        //usuario=response.id;
        ingresar(response.id);
        //document.getElementById('status').innerHTML =
        //  'Thanks for logging in, ' + response.name + '!';
      });
    } else {
      loaderProceso.hide();
      //console.log('User canceled login or did not fully authorize the app.');
      //alert('User canceled login or did not fully authorize the app.');
    }
  }
  );
}
function ingresarCk(){
  loaderProceso.show();
  ingresar('0');
}
function ingresar(faceId){
  //console.log('ingresar:'+ingresarConFB.toString());
  //loaderNoticias.show();

  cam1=select('#cam1');
  cam2=select('#cam2');
  var par1;
  var par2;
  if(faceId=='0') {
    par1=cam1.value();
    par2=cam2.value();
  } else {
    par1='fi';
    par2=faceId;
  }
  //var url = 'https://script.google.com/macros/s/AKfycbwPVattCBeKgzkAXXFzBaWpcCasoYzr769K9cUFXrBkNbwi8A-Y/exec?action=getCeldas';
  var url='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec?'
  //+'action=wgu&a=3794950807';
  +'action=wgu&a='+par1+'&b='+par2;
  //console.log(cam1.value()+'-'+cam2.value());
  //console.log(url);
  //console.log(cam1.value()+'-'+cam2.value());
  loadJSON(url, callbackIngresar, errIngresar);

  function callbackIngresar(datos){
    //console.log('rta:' + datos);
    if(datos==-1){
      //console.log('error contraseña');
      //alert(location.hostname);
      var txt=select('#txtResponse');
      txt.show();
      loaderProceso.hide();
      return -1;
    }
    if(datos==-2){
      //console.log('error contraseña');
      //alert(location.hostname);
      var txt=select('#txtResponse2');
      txt.show();
      loaderProceso.hide();
      return -1;
    }

    //se almacena datos en gdata (global)
    gdata=datos;

    //console.log('nombre:' + datos.nom);
    //console.log('num:' + datos.num);
    /*for(item in datos){
      //console.log(datos[item].key+'-'+datos[item].value);
      console.log(item +'-'+datos[item]);
    }*/
    //console.log(datos.noticias);
    CargarCat(datos.autos);
    prepararLista(datos.noticias);
    var miCuenta=document.getElementById('miCuenta');
    var miCuentaDatos=document.getElementById('miCuentaDatos');
    //var htmlRendered=htmlRender(datos.auto);
    //miCuentaDatos.insertAdjacentHTML("beforeend",htmlRendered);
    var autosRendered=datos.autoRender;
    miCuentaDatos.insertAdjacentHTML("beforeend",autosRendered);

    //funciones botones
    btnConseguirMasLlaves= select('#btnConseguirMasLlaves');
    btnConseguirMasLlaves.mousePressed(funConseguirMasLlaves);
    btnSolicitarAsesor= select('#btnSolicitarAsesor');
    btnSolicitarAsesor.mousePressed(funSolicitarAsesor);
    btnPedirMiAuto= select('#btnPedirMiAuto');
    btnPedirMiAuto.mousePressed(funPedirMiAuto);

    //console.log(datos.auto.url1);
    document.getElementById('url0').src=datos.auto.url1;
    document.getElementById('url1').src=datos.auto.url1;
    document.getElementById('url2').src=datos.auto.url2;
    document.getElementById('url3').src=datos.auto.url3;
    document.getElementById('url4').src=datos.auto.url4;

    document.getElementById('menuIngresar').style.display='none';
    document.getElementById('menuMiCuenta').style.display='block';
    document.getElementById('sideIngresar').style.display='none';
    document.getElementById('sideMiCuenta').style.display='block';
    miCuenta.style.display='block';
    document.getElementById('aMiCuenta').scrollIntoView(true);
    //document.getElementById('aCatalogo').scrollIntoView(true);
    document.getElementById('id01').style.display='none';
    loaderProceso.hide();
    //document.getElementById('ruedaCanvas').style.display='none';

    //dibujar canvas rueda
    //var llaves=parseInt(datos.llaves);
    if(datos.llaves==""){
      datos.llaves="0";
    }
    if(datos.intrans==""){
      datos.intrans="0";
    }
    var totalLlaves=parseInt(datos.llaves)+parseInt(datos.intrans);
    //console.log(datos.llaves);
    //console.log(datos.intrans);
    //console.log(totalLlaves);
    //console.log(parseInt(datos.llaves));
    //console.log(parseInt(datos.intrans));

    var llavesAuto=parseInt(datos.auto.llaves);
    //var ruedaCanvas = document.getElementById("ruedaCanvas");
    //dibujarRueda(llaves,totalLlaves);
    dibujarRueda(totalLlaves,llavesAuto);

    /*------------------------------------------------------------------------------------------------*/
    function funSolicitarAsesor(){
      var nombre=gdata.nombre;
      var tel=gdata.numero;
      var msj='Solicito que un asesor se contacte conmigo.';

      document.getElementById('fnombre').value=nombre;
      document.getElementById('ftel').value=tel;
      document.getElementById('fmsj').value=msj;
      goTo('aContacto');

    }
    function funConseguirMasLlaves(){
       document.getElementById('modalMasLlaves').style.display='block';
    }
    function funPedirMiAuto(){
       document.getElementById('modalPedirMiAuto').style.display='block';
    }
    function dibujarRueda(llaves,total){
      //console.log(llaves);
      var angulo=llaves*((PI*2)/total);
      //console.log(angulo);
      var w=100;
      var h=100;
      var wCanvas=w;
      var hCanvas=h;
      var bufferCanvas = createGraphics(w, h);

      bufferCanvas.stroke(152,152,152);
      bufferCanvas.strokeWeight(10);
      bufferCanvas.noFill();
      //bufferCanvas.background(255);
      bufferCanvas.ellipse(w/2,h/2,w*0.89,h*0.89);
      bufferCanvas.stroke(227,169,62);
      if(angulo!=0){
        bufferCanvas.arc(w/2,h/2,w*0.89,h*0.89,0-HALF_PI,angulo-HALF_PI,OPEN);
      }

      //bufferCanvas.rectMode(CENTER);
      bufferCanvas.fill(77,77,77);
      bufferCanvas.stroke(77,77,77);
      bufferCanvas.strokeWeight(1);
      var ancho;
      var ancho2;
      var texto;
      var texto2;
      texto="LLAVES";
      ancho=textWidth(texto);
      bufferCanvas.textSize(12);
      bufferCanvas.text(texto,(w/2)-(ancho/2),h*0.45);
      texto=llaves;
      texto2="/"+total;

      ancho0=textWidth(texto+texto2);
      ancho1=textWidth(texto);
      ancho2=textWidth(texto2);
      bufferCanvas.textSize(17);
      var midY=h*0.65;
      var mid;
      mid=(w/2)-(ancho0/2)+(ancho1);
      bufferCanvas.text(texto2,mid,midY);

      bufferCanvas.fill(227,169,62);
      bufferCanvas.stroke(227,169,62);
      mid=(w/2)-(ancho0/2);
      bufferCanvas.text(texto,mid-(ancho1*0.25),midY);

      var tmpCanvas=createCanvas(wCanvas,hCanvas);
      tmpCanvas.parent('divCanvas');
      tmpCanvas.style('z-index','-1');
      image(bufferCanvas,0,0,wCanvas,hCanvas);
    }

    /*
    function htmlRender(auto){
      var totalLlaves=parseInt(datos.llaves)+parseInt(datos.intrans);
      var s='';
      s+="<div class='col-text-gris1'> ";
      s+="<div class=' bordeAmarillo'> ";
      s+="  <span class='rb  w3-large'>"+auto.nombre+"</span>";
      s+="  <div class='w3-small'>"+auto.descripcion+"</div>";
      s+='</div>';

      s+="<div class='w3-row rb  w3-white w3-medium w3-padding'> ";

      s+="  <div class='w3-half dos col-text-gris1'>Valor Llave:</div>";
      s+="  <div class='w3-half dos col-text-gris1' align='right'>";
      s+="  $ "+datos.valorLlave+"</div>";

      s+="  <div class='w3-half dos col-text-gris1'>Próx. vencimiento:</div>";
      s+="    <div class='w3-half dos col-text-gris1' align='right'>";
      s+=   datos.vencimiento+"</div>";

      s+="</div>";

      s+="<div class='w3-col w3-padding-8'>";
      s+="  <div class='w3-half dos' align='center' >";
      //s+="    <div align='center' class='w3-medium rb'>LLAVES</div>";
      //s+="    <div class='w3-large rb'><span class='col-text-amarillo2' >"+totalLlaves+"</span>/"+datos.auto.llaves+"</div>";
      s+="    <div id='divCanvas'></div>";

      s+="  </div>";
      s+="  <div class='w3-half dos'  align='' style='vertical-align:middle;display: table-cell;vertical-align: middle;'>";
      s+="    <div align='center' class='w3-small rb'>AMIGOS REGISTRADOS</div>";
      s+="    <div class='w3-col' align='center' >";
      s+="      <div class='w3-half dos' align='right'><img height='40px' width='44px' src='img/users2.png'></div>";
      s+="      <div class='w3-half dos rb w3-large' align='left' style='width:40%;margin-left:10px'><span class='col-text-azul'>"+ datos.intrans+"</span>/"+datos.referidos+"</div>";
      s+="    </div>";
      s+="  </div>";
      s+="</div>";

      s+="<div class='w3-btn w3-col w3-tag col-amarillo2' ";
      s+="id='btnConseguirMasLlaves' >Conseguir Más llaves</div>";

      s+="<div>";
      s+="  <div style='margin-top:10px;margin-right:2%;width:47.99%;' class='w3-half dos col-azul w3-btn'>Pedir MiAuto</div>";
      s+="  <div style='margin-top:10px;margin-left:2%; width:47.99%;' class='w3-half dos col-azul w3-btn'>Solicitar Asesor</div>";
      s+="</div>";

      s+='</div>';
      return s;
    }
    */
  }
  function errIngresar(err){
    console.log('Error:');
    console.log(err);
    document.getElementById('id01').style.display='none';
  }
}
