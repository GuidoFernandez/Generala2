  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var A=['Jugador A','-','-','-','-','-','-','-','-','-','-','-',0];
var B=['Jugador B','-','-','-','-','-','-','-','-','-','-','-',0];
var x='', Aw=0, Bw=0, partida=1;
var d=[0,1,2,3,4], r=0, tiro=0;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/anotador/',
        url: 'anotador.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


$$(document).on('page:init', '.page[data-name="index"]', function () {
    console.log('estoy en el index');
    $$('#nameA').val()='';
    $$('#nameB').val()='';
})

$$(document).on('page:init', '.page[data-name="anotador"]', function () {
    console.log('estoy en el anotador');
    // si se ingresó nombre, lo guarda, de lo contrario queda el nombre por defecto
    /////////////////////////////
    if($$('#nameA').val()){
        A[0]=$$('#nameA').val();
    }
    if($$('#nameB').val()){
        B[0]=$$('#nameB').val();
    }
    /////////////////////////////
    infoPartida();
    llenarTablero();
    ////////////////////////////
    $$('#btnTirar').on('click',tirarDados)
    $$('#dado0').on('click',function(){selectDados(0)})
    $$('#dado1').on('click',function(){selectDados(1)})
    $$('#dado2').on('click',function(){selectDados(2)})
    $$('#dado3').on('click',function(){selectDados(3)})
    $$('#dado4').on('click',function(){selectDados(4)})
    ////////////////////////////
    $$('.numero,.jugada').on('click',function(){x=this.id;console.log(x)});
})

function llenarTablero(){
    $$('#playerA').append('<li>'+A[0]+'</li>');
    $$('#playerB').append('<li>'+B[0]+'</li>');
    for(i=1; i<7; i++){
        $$('#playerA').append('<li data-popover=".popoverNumeros" class="popover-open numero" id="AD'+i+'"> '+A[i]+' </li>');
        $$('#playerB').append('<li data-popover=".popoverNumeros" class="popover-open numero" id="BD'+i+'"> '+B[i]+' </li>');
    }
    for(i=7; i<12; i++){
        $$('#playerA').append('<li data-popover=".popoverJugadas" class="popover-open jugada" id="AJ'+(i-6)+'"> '+A[i]+' </li>');
        $$('#playerB').append('<li data-popover=".popoverJugadas" class="popover-open jugada" id="BJ'+(i-6)+'"> '+B[i]+' </li>');
    }
    $$('#playerA').append('<li>'+A[12]+'</li>');
    $$('#playerB').append('<li>'+B[12]+'</li>');
}

function infoPartida(){
    $$('#info').html('<h2>Partida # '+partida+'</h2><h3>'+A[0]+': '+Aw+' | '+B[0]+': '+Bw+'</h3>');
}




///////////////////////////////////// Funciones para los dados /////////////////////////////////////////////
function tirarDados(){
    if($$('#btnTirar').val()=='Nueva Jugada'){
        for(i=0; i<5; i++){
            $$('#dado'+i).html('| - |')
        }
        $$('#btnTirar').val('Tirar Dados').css('color','black')
        tiro=0
        for(i=0; i<5; i++){
            $$('#dado'+i).removeClass('retenido')
        }
        return
    }
    if(tiro<3){
        for(i=0; i<5; i++){
            if(!$$('#dado'+i).hasClass('retenido')){
                d[i]=parseInt(Math.random()*6+1)
            }
        }
    }
    if(tiro==2){
        $$('#btnTirar').val('Nueva Jugada').css('color','red')
    }
    tiro++
    mostrarDados()
}

function selectDados(y){
    if(! $$('#dado'+y).hasClass('retenido')){
        $$('#dado'+y).removeClass('libre').addClass('retenido')
        r++
    }else{
        $$('#dado'+y).removeClass('retenido').addClass('libre')
        r--
    }
}

function mostrarDados(){
    for(i=0; i<5; i++){
        $$('#dado'+i).html('| '+d[i]+' |')
    }
}