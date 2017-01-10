///// MENU       /////////////////////////////////////////////////////////////////////////////////
//var menuIndex = 1;
//activarMenu(menuIndex);
function activarMenu(n) {
  var i;
  var x = document.getElementsByClassName("menu1");
  if (n > x.length) {menuIndex= 1}
  if (n < 1) {menuIndex = x.length}
  for (i = 0; i < x.length; i++) {
     //x[i].style.display = "none";
     x[i].className = x[i].className.replace(" active", "");
  }
  //for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" w3-theme-l4", "");
  //}
  //x[slideIndex-1].style.display = "block";
  //dots[slideIndex-1].className += " w3-theme-l4";
  x[n].className += " active";
  //document.getElementById('aNoticias').scrollIntoView(true);
  //window.scrollBy(0, 500);
}
function goTo(anchor){
  document.getElementById(anchor).scrollIntoView(true);
}

///// SLIDER       /////////////////////////////////////////////////////////////////////////////////
var slideIndex;
function imgSlider(){
  var flechaIz=document.getElementById('flechaIz');
  var flechaDe=document.getElementById('flechaDe');
  flechaIz.style.display = "none";
  flechaDe.style.display = "none";

  slideIndex = 1;
  showDivs(slideIndex);

  myVar = setInterval(hacerSlide, 5000);
}
function hacerSlide(){
  slideIndex++;
  showDivs(slideIndex);
}
function plusDivs(n) {
  showDivs(slideIndex += n);
}
function currentDiv(n) {
  showDivs(slideIndex = n);
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var y = document.getElementsByClassName("mySlides2");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
     y[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-theme-l4", "");
  }
  x[slideIndex-1].style.display = "block";
  y[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-theme-l4";
}
function mOver() {
    flechaIz.style.display = "block";
    flechaDe.style.display = "block";
}
function mOut() {
    flechaIz.style.display = "none";
    flechaDe.style.display = "none";
}

/////////////////////// CONTACTO        ////////////////////////////////
function sendForm(){
  var nombre=document.getElementById('fnombre').value;
  var tel=document.getElementById('ftel').value;
  var msj=document.getElementById('fmsj').value;
  var cap = grecaptcha.getResponse();
  /*
  console.log('mi submit-func:');
  console.log('nombre:'+nombre);
  console.log('tel:'+tel);
  console.log('msj:'+msj);
  console.log('cap:'+cap);
  */
  //var url='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec?'
  if(cap){
    var url='https://script.google.com/macros/s/AKfycbx1jMj101jA8O0DcVEY2nqMsMwYmOZN5Krvh6ZASNrWwvNKfu_j/exec?'+
      'action=wsolicitud&ca1='+nombre+
      '&ca2='+tel+
      '&ca3='+msj+
      '&ca4='+cap;
      //var url='https://script.google.com/macros/s/AKfycbxB98IS32T9mCUJbSccWmBg17LMRGmcvB7Kqa9lFcM_8eiM6rE/exec?'
      //+'action=wgu&a=3794950807';
      httpGet(url, cbSol, errSol);
  } else {
    //console.log('sin cap');
  }
  function cbSol(data){
    //console.log('resp:'+data);
    if(data=='1'){
      //console.log('ok');
      document.getElementById('pEnviar').style.display='none';
      document.getElementById('captcha').style.display='none';
      //document.getElementById('pExito').innerHTML='Consulta registrada con éxito'
      document.getElementById('pExito').style.display='block';
    }
  }
  function errSol(err){
    console.log('err:'+err);
  }
}


/// ///////////////// MAPS  ////////////////////////////////////
<!-- Google Map Location -->
var myCenterCentral = new google.maps.LatLng(-34.6112817,-58.3662798);
var myCenter = new google.maps.LatLng(-27.4654675,-58.8359838);
//var myCenter = new google.maps.geo
function initialize() {
  var mapProp = {
    center: myCenter,
    zoom: 15,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);

function initializeCentral() {
  var mapProp = {
    center: myCenterCentral,
    zoom: 15,
    scrollwheel: true,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMapCentral"),mapProp);
  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initializeCentral);


///// SIDE NAV  /////////////////////////////////////////////
var mySidenav;
var barraMenu ;
function sideNavFun(){
  // Toggle between showing and hiding the sidenav when clicking the menu icon
  mySidenav = document.getElementById("mySidenav");
  //var sideBar = document.getElementById('mySidenav');
  //barraMenu = document.getElementById('barraMenu');
}
function w3_open() {
    if (mySidenav.style.display === 'block') {
        mySidenav.style.display = 'none';
    } else {
        mySidenav.style.display = 'block';
    }
}
window.onclick = function(event) {
  //console.log('click ventana');
  //console.log('event target:'+ event.target.id);
  //console.log('       modal:'+ sideBar);

  if (event.target!= mySidenav && event.target.id !='barraMenu' && mySidenav.style.display == 'block') {
    //modal.style.display = "none";
    //mySidenav.style.display = "none";
    w3_close();
  //if (mySidenav.style.display === 'block') {
      //mySidenav.style.display = 'none';
//      console.log('ocultar barra');
  //} else {
      //mySidenav.style.display = 'block';
  //}
  }
}
function w3_close() {
    mySidenav.style.display = "none";
}
