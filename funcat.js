var catalogoAutos=[];
function CargarCat(autos) {
  var cat=[];
  var i=0;
  var htmlAutos='';
  for (modelo in autos) {
    var url1=autos[modelo][4];
    if((url1!='') && (i!=0) ){
      //console.log(autos[modelo][1]+'-'+autos[modelo][4]);
      var temp={
        nombre:autos[modelo][1],
        precio:autos[modelo][2],
        llaves:autos[modelo][9],
        url1:url1,
        url2:autos[modelo][5],
        url3:autos[modelo][6],
        url4:autos[modelo][7]
      };
      cat.push(temp);
      //console.log(temp.nombre+'-'+temp.url1);
    }
    i++;
  }
  catalogoAutos=cat;
  i=0;
  for(item in cat){
    //console.log(i+'-'+cat[item].nombre+' '+cat[item].url1);
    det=document.getElementById('det');
    htmlAutos+="<div class='w3-quarter tres' style='padding-left:5px;padding-right:5px;padding-top:10px;' > ";
    htmlAutos+="  <img src='"+cat[item].url1+"' height='100%' width='100%' style='padding:0px;' ";
    //htmlAutos+="onclick='document.getElementById('det').src=this.src;document.getElementById('modal01').style.display='block''";
    //htmlAutos+="onclick='det.style.display=block'";
    //var parametros="'"+cat[item].url1+"'";
    //htmlAutos+="onclick='detModal("+parametros+")'";
    htmlAutos+="onclick='detModal("+i+")'";
    htmlAutos+=">";
    htmlAutos+="  <div class='col-azul' style='padding:5px'>";
    htmlAutos+="    <div class='col-azul w3-medium lineaCatalogo'>"+cat[item].nombre+"</div>";
    htmlAutos+="    <div class='col-azul w3-small '>Llaves: "+cat[item].llaves+"</div>";
    htmlAutos+="    <div class='col-azul w3-small '>Precio Final: $ "+cat[item].precio+"</div>";
    htmlAutos+="  </div> ";
    htmlAutos+="</div> ";

    i++;
  }
  //console.log(cat[0].nombre);

  var divAutos=document.getElementById('divAutos');
  //divAutos.style.display='none';
  resetCat(divAutos);
  divAutos.insertAdjacentHTML("beforeend",htmlAutos);
  loaderCatalogo.hide();
}
function detModal(index){
  var det=document.getElementById('det');
  det.style.display='block';

  document.getElementById('durl0').src=catalogoAutos[index].url1;
  document.getElementById('durl1').src=catalogoAutos[index].url1;
  document.getElementById('durl2').src=catalogoAutos[index].url2;
  document.getElementById('durl3').src=catalogoAutos[index].url3;
  document.getElementById('durl4').src=catalogoAutos[index].url4;
}
function resetCat(listaAutos){
  //var items = document.getElementById("divAutos").childElementCount;
  //var listaAutos=document.getElementById("divAutos");
  //console.log('items'+items);
  /*
  for(var i=items;i>0;i--){
    listaAutos.removeChild(listaAutos.childNodes[i]);
  }
  console.log(listaAutos.childNodes[i].id);
  */
  while (listaAutos.hasChildNodes()) {
    //console.log(listaAutos.lastChild.id);
    listaAutos.removeChild(listaAutos.lastChild);
  }
}
