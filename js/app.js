//const pathLocal = "http://localhost/calendario/";

const pathLocal = "http://landing.beneficioslaaraucana.cl/calendario/";

const mesLocal = "abril";
const yearLocal = "2018";



$(document).ready(function() {
    console.log( "ready!" );   
    paginaUno();
    load(mesLocal,yearLocal);
    calendar(mesLocal,yearLocal);
    btnBoxInit(mesLocal,yearLocal);
});


function btnList(){

 $('.btnMapa').click(function(){
    $("#mapaFrame").show();

    const ubi = $(this).parents(".avatar").find(".ubicacion").text();
    const loc = $(this).parents(".avatar").find(".location").text();
    
    console.log("direccion: ",ubi);
    console.log("loc: ",loc);

    loadMapa(ubi,loc);
    $("#addPhoto").hide();

  });

  $('.btnExit').click(function(){
    $("#mapaFrame").hide();
    $("#addPhoto").show();

  });

}

function btnBoxInit(mes,year){

 

  $('#regiones').on('change', function() {
    const region = $("#regiones option:selected").text();
    console.log(region);
    load2(region,mes,year);
    const path = pathLocal+"api/product/fechas.php?region=%22"+region+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22";
    $.get(path)
      .done(function(data){
       cleanCalendario();
       console.log(JSON.stringify(data));
       data = data.data;
       cleanCalendario();

       for(var key in data){
        reloadDay(data[key].dia);  
       }

      }) 
      .done(function(){
        cleanBoxInstituciones();
       
      })

  })

  $('#localidades').on('change', function() {
    const localidad = $("#localidades option:selected").text();
    const region = $("#regiones option:selected").text();

    console.log(localidad);
    load3(localidad,region,mes,year);
    const path = pathLocal + "api/product/fechas.php?localidad=%22"+localidad+"%22&region=%22"+region+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22";
    $.get(path)
      .done(function(data){
       cleanCalendario();
       console.log(JSON.stringify(data));
       data = data.data;
       cleanCalendario();
       for(var key in data){
        reloadDay(data[key].dia);  
       }
      })
  });

  $('#instituciones').on('change', function() {
    const institucion = $("#instituciones option:selected").text();
    const localidad = $("#localidades option:selected").text();
    const region = $("#regiones option:selected").text();
    console.log(institucion);
    const path = pathLocal+"api/product/fechas.php?institucion=%22"+institucion+"%22&localidad=%22"+localidad+"%22&region=%22"+region+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22";
    console.log("path load4:",path);
    $.get(path)
      .done(function(data){
       cleanCalendario();
       console.log(JSON.stringify(data));
       data = data.data;
       cleanCalendario();
       for(var key in data){
        reloadDay(data[key].dia);  
       }
      })
  });


  

}

function load(mes,year){
  const path = pathLocal+"api/product/regiones.php?mes=%22"+mes+"%22&year=%22"+year+"%22"; 
 console.log("path load:",path);
  $.get( path )
    .done(function( data ) {
     //console.log(JSON.stringify(data));
      
      data= data.data;
      $('#regiones')
        .find('option')
        .remove()
        .end()
        .append('<option value="" disabled selected>REGIONES</option>')
        .val('')
      ;
      
      for(var key in data){
        console.log(key + ' - ' + data[key].region);
        $('#regiones')
        .append('<option value='+key+'>'+data[key].region+'</option>')
        .val('')
      ;
      }
      $('select').material_select();

      

  })
}

function cleanBoxInstituciones(){
  $('#instituciones')
        .find('option')
        .remove()
        .end()
        .append('<option value="" disabled selected>INSTITUCIONES</option>')
        .val('')
      ;
  $('select').material_select();
}

function load2(getRegion,getMes,getYear){
  const path= pathLocal+"api/product/localidades.php?region=%22"+getRegion+"%22&mes=%22"+getMes+"%22&year=%22"+getYear+"%22";
  console.log("path load2:",path);
  $.get(path)
    .done(function( data ) {
     //console.log(JSON.stringify(data));
      data= data.data;
      $('#localidades')
        .find('option')
        .remove()
        .end()
        .append('<option value="" disabled selected>LOCALIDADES</option>')
        .val('')
      ;
      
      for(var key in data){
        console.log(key + ' - ' + data[key].localidad);
        $('#localidades')
        .append('<option value='+key+'>'+data[key].localidad+'</option>')
        .val('')
      ;
      }
      $('select').material_select();

      
    })
    .done(function(){
      const path= pathLocal+"api/product/fechas.php?region=%22"+getRegion+"%22";
      $.get(path)
        .done(function( data ) {
         console.log(JSON.stringify(data));
      })
    })
}

function load3(getLocalidad,getRegion,getMes,getYear){

  const path = pathLocal+"api/product/instituciones.php?localidad=%22"+getLocalidad+"%22&region=%22"+getRegion+"%22";
  console.log("path load3:",path);
  $.get(path)
    .done(function( data ) {
     console.log(JSON.stringify(data));
      data= data.data;
      $('#instituciones')
        .find('option')
        .remove()
        .end()
        .append('<option value="" disabled selected>INSTITUCIONES</option>')
        .val('')
      ;
      for(var key in data){
        console.log(key + ' - ' + data[key].institucion);
        $('#instituciones')
        .append('<option value='+key+'>'+data[key].institucion+'</option>')
        .val('')
      ;
      }
      $('select').material_select();
      
      
   })
   .done(function(){
      const path= pathLocal+"api/product/fechas.php?localidad=%22"+getLocalidad+"%22&region=%22"+getRegion+"%22";
      $.get(path)
        .done(function( data ) {
         console.log(JSON.stringify(data));
      })
    })
}


function paginaUno() {

     document.getElementById('addPhoto').innerHTML = ` 

        <div id="divCenterH3" class="col s-12 text-center center-align " style="height: auto; width: 100%" >
          <br>
         <h3>Agencias Móviles</h3>
         <h5>Información de la Programación de Agencias Móviles</h5>
         <br>  
        </div> 

        <div class="input-field col s12 m4" >
          <select id="regiones">
            <option value="" disabled selected>REGIONES</option>
          </select>
        </div>

        <div class="input-field col s12 m4" >
          <select id="localidades">
            <option value="" disabled selected>LOCALIDADES</option>
          </select>
        </div>

        <div class="input-field col s12 m4" >
          <select id="instituciones">
            <option value="" disabled selected>INSTITUCIONES</option>
          </select>
        </div>

        <div id='calendar'>
          <div>
          </div>
        </div>
        
        <div id="dataInfo">
          
        </div>

      </div>


  
    `;

    $('#fieldGood').find('#close-modal').click(function(event){
        event.preventDefault();
        location.reload();
        console.log('hola');
    });

     $('#sandbox-container').datepicker({
        format: "dd/mm/yyyy",
        startDate: "now",
        weekdaysShort: ['Dom', 'Lune', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysAbbrev: ['e','M','T','W','T','F','S'],
        weekdaysFull: ['e','M','T','W','T','F','S'],
        weekdays: ['e','M','T','W','T','F','S']

    });

    $('select').material_select();
  
    datapickerInit();



}


function formatDate(date){
  if (date.includes('Enero')) {
    return date.replace(" Enero, ", "/01/"); 
  }else if (date.includes('Febrero')) {
    return date.replace(" Febrero, ", "/02/"); 
  }else if (date.includes('Marzo')) {
    return date.replace(" Marzo, ", "/03/"); 
  }else if (date.includes('Abril')) {
    return date.replace(" Abril, ", "/04/"); 
  }else if (date.includes('Mayo')) {
    return date.replace(" Mayo, ", "/05/"); 
  }else if (date.includes('Junio')) {
    return date.replace(" Junio, ", "/06/"); 
  }else if (date.includes('Julio')) {
    return date.replace(" Julio, ", "/07/"); 
  }else if (date.includes('Agosto')) {
    return date.replace(" Agosto, ", "/08/"); 
  }else if (date.includes('Septiembre')) {
    return date.replace(" Septiembre, ", "/09/"); 
  }else if (date.includes('Octubre')) {
    return date.replace(" Octubre, ", "/10/"); 
  }else if (date.includes('Noviembre')) {
    return date.replace(" Noviembre, ", "/11/"); 
  }else if (date.includes('Diciembre')) {
    return date.replace(" Diciembre, ", "/12/"); 
  }else
    console.log("date:",date);
    return null;

}

function datapickerInit(){
    $('.datepicker').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Dom', 'Lune', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        weekdaysAbbrev: ['D','L','M','M','J','V','S'],
        showMonthsShort: true,
        ShowWeekdaysAbbrev: true,
        selectMonths: false,
        selectYears: 1, // Puedes cambiarlo para mostrar más o menos años
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Ok',
    });
}

function cleanCalendario(){
   // limpiar el calendario 
  $(".amb").attr('class', 'ambNone');
  $(".pFull").attr('class', 'pNone');
  $(".imgAmbulancia").attr('src', "assets/ambulanciaFull.svg");
}

function reloadDay(day){

  if (day == "01")
    day ="1";
  else if (day == "02") {
    day ="2";
  }else if (day == "03") {
    day ="3";
  }else if (day == "04") {
    day ="4";
  }else if (day == "05") {
    day ="5";
  }else if (day == "06") {
    day ="6";
  }else if (day == "07") {
    day ="7";
  }else if (day == "08") {
    day ="8";
  }else if (day == "09") {
    day ="9";
  }

  var aux = "#bg_day"+day;
  $(aux).attr('class', 'amb');
  $(aux).find(".imgAmbulancia").attr('src', "assets/ambulancia.svg");
  $(aux).find(".pNone").attr('class', 'pFull');
}

function calendar(mes,year){

  const path = pathLocal+"api/product/dias.php?mes=%22"+mes+"%22&year=%22"+year+"%22";
  console.log(path); 

  $.get( path)
    .done(function(data) {
      var aux = `
      <table class="calendarioTable">
        <thead>
          <tr class ="hide-on-small-only">
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
              <th>Domingo</th>
          </tr>
          <tr class ="hide-on-med-and-up">
              <th>Lu</th>
              <th>Ma</th>
              <th>Mi</th>
              <th>Ju</th>
              <th>Vi</th>
              <th>Sa</th>
              <th>Do</th>
          </tr>
        </thead>  
        <tbody>
          <tr>
          `;
      data= data.data;
      console.log(JSON.stringify(data));  
      if (data[0].dia == 'lunes' ){

      }else if (data[0].dia == 'martes' ){
        aux += ` <td class="calEmpty"></td>`;
      }else if (data[0].dia == 'miércoles' ){
        aux += ` <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
          `;
      }else if (data[0].dia == 'jueves' ){
        aux += ` <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
          `;
      }else if (data[0].dia == 'viernes' ){
        aux += ` <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
          `;
      }else if (data[0].dia == 'sábado' ){
        aux += ` <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
          `;
      }else if (data[0].dia == 'domingo' ){
        aux += ` <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
                 <td class="calEmpty"></td>
          `;
      }

      for(var key in data){
        console.log(key + ' - ' + data[key].dia + ' - ' + data[key].numero);
        aux += `
            <td class="ambNone" id="bg_day`+data[key].numero+`">
              <img src="assets/ambulanciaFull.svg" class="imgAmbulancia hide-on-small-only" id="day_`+data[key].numero+ `"> <br> <p id="value" class="pNone">`+  data[key].numero  +` 
              </p>
            </td>
        `;

        if (data[key].dia == 'domingo' ){
           aux += `
          </tr>
          <tr>
           `;
        }
      }

      aux += `  

      </tbody>
      </table>

      `;

      document.getElementById('calendar').innerHTML = aux; 

      btnCalendar(mesLocal,yearLocal);

  });

}



function btnCalendar(mes,year){
  $('.ambNone').click(function() {
    var dia = $(this).find('#value');
    dia = dia.text();

    const region = $("#regiones option:selected").text();
    const localidad = $("#localidades option:selected").text();
    const institucion = $("#instituciones option:selected").text();

    console.log(region);
    console.log(localidad);
    console.log(institucion);
    console.log(dia);
    console.log(mes);
    console.log(year);

    if (region != "REGIONES" && localidad != "LOCALIDADES" && institucion != "INSTITUCIONES" ){
      const path = pathLocal+"api/product/read.php?region=%22"+region+"%22&localidad=%22"+localidad+"%22&institucion=%22"+institucion+"%22&dia=%22"+dia+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22";
      console.log("click1");
      console.log(path);
      $.get( path )
       .done(function(data) {
         console.log(JSON.stringify(data));
         console.log("error",data.message);
         if (data.message == "No products found."){
            document.getElementById('dataInfo').innerHTML = "";
         }else{
          data= data.data;
           var aux = `
              <div class="col s12  left-align ">
                <h5 class="left-align" style="text-transform:uppercase"> Resultados `+dia+` `+mes+` `+year+`: </h5>
              </div>
           `; 
            for(var key in data){
              console.log(key + ' - ' + data[key].institucion);
              aux +=`
                <ul class="collection">
                  <li class="collection-item avatar">
                    <i class="material-icons circle btnMapa">add_location</i>
                    
              `;
              var hora = data[key].horaDesde + "-"+data[key].horaHasta;
              var responsable = " ("+data[key].responsable +")";
              var ubicacion = data[key].ubicacion;
              var locacion = data[key].localidad;
              var institucion = data[key].institucion;
              aux += "<h5 class=\"left-align\" style=\"margin-left:10px;\">"+ hora + responsable+"</h6> ";
              aux += "<h5 class=\"left-align ubicacion \" style=\"margin-left:10px;\">" + ubicacion +"</h6> ";
              aux += "<h6 class=\"left-align\" style=\"margin-left:10px;\">"+ institucion +"</h6> ";
              aux += "<h6 class=\"left-align location \" style=\"margin-left:10px;\">"+ locacion +"</h6> </li> </ul>";
              
            }
            document.getElementById('dataInfo').innerHTML = aux;
            btnList();
         }
           

        })
    }else if (region != "REGIONES" && localidad == "LOCALIDADES" && institucion == "INSTITUCIONES" ){
      const path = pathLocal+"api/product/read.php?region=%22"+region+"%22&dia=%22"+dia+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22"; 
      //const path = "http://localhost/calendario/api/product/regiones.php?mes=%22"+"abril"+"%22&year=%22"+year+"%22"; 
      console.log("click2");

      console.log(path);
      $.get(path)
       .done(function(data) {
         console.log(JSON.stringify(data));
         console.log("error",data.message);
         if (data.message == "No products found."){
            document.getElementById('dataInfo').innerHTML = "";
         }else{
          data= data.data;
           var aux = `
              <div class="col s12  left-align ">
                <h5 class="left-align" style="text-transform:uppercase"> Resultados `+dia+` `+mes+` `+year+`: </h5>
              </div>
           `; 
            for(var key in data){
              console.log(key + ' - ' + data[key].institucion);
              aux +=`
                <ul class="collection">
                  <li class="collection-item avatar">
                    <i class="material-icons circle btnMapa">add_location</i>
                    
              `;
              var hora = data[key].horaDesde + "-"+data[key].horaHasta;
              var responsable = " ("+data[key].responsable +")";
              var ubicacion = data[key].ubicacion;
              var locacion = data[key].localidad;
              var institucion = data[key].institucion;
              aux += "<h5 class=\"left-align\" style=\"margin-left:10px;\">"+ hora + responsable+"</h6> ";
              aux += "<h5 class=\"left-align ubicacion \" style=\"margin-left:10px;\">" + ubicacion +"</h6> ";
              aux += "<h6 class=\"left-align\" style=\"margin-left:10px;\">"+ institucion +"</h6> ";
              aux += "<h6 class=\"left-align location \" style=\"margin-left:10px;\">"+ locacion +"</h6> </li> </ul>";
              
            }
            document.getElementById('dataInfo').innerHTML = aux;
            btnList();

         }
        })
    }else if (region != "REGIONES" && localidad != "LOCALIDADES" && institucion == "INSTITUCIONES" ){
      const path = pathLocal+"api/product/read.php?region=%22"+region+"%22&localidad=%22"+localidad+"%22&dia=%22"+dia+"%22&mes=%22"+mes+"%22&year=%22"+year+"%22";
      console.log("click3");
      console.log(path);
      $.get( path )
       .done(function(data) {
         console.log(JSON.stringify(data));
         if (data.message == "No products found."){
            document.getElementById('dataInfo').innerHTML = "";
         }else{
          data= data.data;
           var aux = `
              <div class="col s12  left-align ">
                <h5 class="left-align" style="text-transform:uppercase"> Resultados `+dia+` `+mes+` `+year+`: </h5>
              </div>
           `; 
            for(var key in data){
              console.log(key + ' - ' + data[key].institucion);
              aux +=`
                <ul class="collection">
                  <li class="collection-item avatar">
                    <i class="material-icons circle btnMapa">add_location </i>
                    
              `;
              var hora = data[key].horaDesde + "-"+data[key].horaHasta;
              var responsable = " ("+data[key].responsable +")";
              var ubicacion = data[key].ubicacion;
              var locacion = data[key].localidad;
              var institucion = data[key].institucion;
              aux += "<h5 class=\"left-align\" style=\"margin-left:10px;\">"+ hora + responsable+"</h6> ";
              aux += "<h5 class=\"left-align ubicacion \" style=\"margin-left:10px;\">" + ubicacion +"</h6> ";
              aux += "<h6 class=\"left-align\" style=\"margin-left:10px;\">"+ institucion +"</h6> ";
              aux += "<h6 class=\"left-align location \" style=\"margin-left:10px;\">"+ locacion +"</h6> </li> </ul>";
              
            }
            document.getElementById('dataInfo').innerHTML = aux;
            btnList();
         }

        }) 
    }


  });
}




function loadMapa(direccion,localidad){

  console.log("direccion: ",direccion);
  console.log("localidad:" , localidad);
 const q = "q="+direccion+"%2C"+localidad+"%2C%20Chile";
  var aux = `

    <div style="width: 100%" id="mapaFrame">
      <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons btnExit">close</i></a>
      <iframe width="100%" height="600" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;`+q+`+(Lugar)&amp;ie=UTF8&amp;t=&amp;z=18&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"><a href="https://www.maps.ie/create-google-map/">Google map generator</a></iframe>
    </div><br/>
  `;


  console.log(aux);
  document.getElementById('addMapa').innerHTML = aux;
  btnList();
}










