  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var A=[];
var B=[];
var x, Aw, Bw, partida=1;
var d=[0,0,0,0,0], r=0, tiro=0;

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
    /* inicializar tablero */
    A[0]='JugadorA';
    B[0]='JugadorB';
    Aw=Bw=tiro=0;
    partida=1;
    reset();
    infoPartida();
    crearTablero();
    /* Control de los dados */
    $$('#btnTirar').on('click',tirarDados);
    $$('#dado0').on('click',function(){selectDados(0)});
    $$('#dado1').on('click',function(){selectDados(1)});
    $$('#dado2').on('click',function(){selectDados(2)});
    $$('#dado3').on('click',function(){selectDados(3)});
    $$('#dado4').on('click',function(){selectDados(4)});
    /* control del tablero */
    $$('.puntos').on('click',function(){x=this.id;console.log(x)});
    $$('.tipoD').on('click',function(){anotarD(this.value)});
    $$('.tipoJ').on('click',function(){anotarJ(this.value)});
    $$('#reiniciar').on('click',reset).on('click',refrescaTablero);
    $$('#nuevaPartida').on('click',nuevaPar);
})

/* Declaracion de las funciones del tablero */

function crearTablero(){
    $$('#playerA').append('<li class="masFuerte">'+A[0]+'</li>');
    $$('#playerB').append('<li class="masFuerte">'+B[0]+'</li>');
    for(i=1; i<7; i++){
        $$('#playerA').append('<li data-popover=".popoverNumeros" class="popover-open puntos" id="AD'+i+'"> '+A[i]+' </li>');
        $$('#playerB').append('<li data-popover=".popoverNumeros" class="popover-open puntos" id="BD'+i+'"> '+B[i]+' </li>');
    }
    for(i=7; i<12; i++){
        $$('#playerA').append('<li data-popover=".popoverJugadas" class="popover-open puntos" id="AJ'+(i-6)+'"> '+A[i]+' </li>');
        $$('#playerB').append('<li data-popover=".popoverJugadas" class="popover-open puntos" id="BJ'+(i-6)+'"> '+B[i]+' </li>');
    }
    $$('#playerA').append('<li class="masFuerte" id="AT">'+A[12]+'</li>');
    $$('#playerB').append('<li class="masFuerte" id="BT">'+B[12]+'</li>');
}

function infoPartida(){
    $$('#info').html('<h3 class="masFuerte">Partida # '+partida+'</h3><h3>'+A[0]+': '+Aw+'</h3><h3>'+B[0]+': '+Bw+'</h3>');
}

function calculaTotal(){
    A[12]=B[12]=0;
    for(i=1; i<12; i++){
        if(A[i]!='-' && A[i]!='X'){
            A[12]+=parseInt(A[i]);
        }
        if(B[i]!='-' && B[i]!='X'){
            B[12]+=parseInt(B[i]);
        }
    }
    verificarGanador();
}

function refrescaTablero(){
    for(i=1; i<7; i++){
        $$('#AD'+i).html(''+A[i]);
        $$('#BD'+i).html(''+B[i]);
    }
    for(i=7; i<12; i++){
        $$('#AJ'+(i-6)).html(''+A[i]);
        $$('#BJ'+(i-6)).html(''+B[i]);
    }
    $$('#AT').html(A[12]);
    $$('#BT').html(B[12]);
}

function reset(){
    if($$('#nameA').val()){
        A[0]=$$('#nameA').val();
    }
    if($$('#nameB').val()){
        B[0]=$$('#nameB').val();
    }
    A[12]=B[12]=0;
    for(i=1; i<12; i++){
        A[i]=B[i]='-';
    }
}

function anotarD(value){
    m=parseInt(x[2]);
    if(value=='Tachar'){
        if(x[0]=='A'){
            A[m]='X';
        }else{
            B[m]='X';
        }
    }else{
        if(x[0]=='A'){
            A[m]=m*parseInt(value);
        }else{
            B[m]=m*parseInt(value);
        }
    }
    calculaTotal();
    refrescaTablero();
}

function anotarJ(value){
    m=parseInt(x[2]);
    if(value=='Tachar'){
        if(x[0]=='A'){
            A[m+6]='X';
        }else{
            B[m+6]='X';
        }
    }else{
        s=(value=='Servida')?5:0;
        switch(m){
            case 1:if(x[0]=='A'){A[m+6]=20+s;}else{B[m+6]=20+s;} break;
            case 2:if(x[0]=='A'){A[m+6]=30+s;}else{B[m+6]=30+s;} break;
            case 3:if(x[0]=='A'){A[m+6]=40+s;}else{B[m+6]=40+s;} break;
            case 4:if(x[0]=='A'){A[m+6]=50+s;}else{B[m+6]=50+s;} break;
            case 5:if(x[0]=='A'){A[m+6]=100+s;}else{B[m+6]=100+s;} break;
        }
    }
    calculaTotal();
    refrescaTablero();
}

function verificarGanador(){
    k=0;
    for(i=0; i<12; i++){
        if(A[i]=='-' || B[i]=='-'){
            k++;
        }
    }
    if(k==0){
        $$('#menuFin').removeClass('oculto').addClass('visible');
        if(A[12]==B[12]){
            $$('#ganador').html('Es un EMPATE');
            return;
        }else if(A[12]>B[12]){
            ganador=A[0];
            Aw++;
        }else{
            ganador=B[0];
            Bw++;
        }
        $$('#ganador').html('Ganador: '+ganador);
        $$('#score').html(A[0]+': '+Aw+' . '+B[0]+': '+Bw);
    }
    infoPartida();
}

function nuevaPar(){
    reset();
    refrescaTablero();
    partida++;
    infoPartida();
    $$('#menuFin').removeClass('visible').addClass('oculto');
}

/* Declaracion de las funciones de los dados */
function tirarDados(){
    if($$('#btnTirar').val()=='RESET'){
        for(i=0; i<5; i++){
            $$('#dado'+i).html('|-|');
        }
        $$('#btnTirar').val('Tirar Dados').css('color','black');
        tiro=0;
        for(i=0; i<5; i++){
            $$('#dado'+i).removeClass('retenido');
        }
        return;
    }
    if(tiro<3){
        for(i=0; i<5; i++){
            if(!$$('#dado'+i).hasClass('retenido')){
                d[i]=parseInt(Math.random()*6+1);
            }
        }
    }
    if(tiro==2){
        $$('#btnTirar').val('RESET').css('color','red');
    }
    tiro++;
    mostrarDados();
}

function selectDados(y){
    if(tiro==0){
        return;
    }
    if(! $$('#dado'+y).hasClass('retenido')){
        $$('#dado'+y).removeClass('libre').addClass('retenido');
        r++;
    }else{
        $$('#dado'+y).removeClass('retenido').addClass('libre');
        r--;
    }
}

function mostrarDados(){
    for(i=0; i<5; i++){
        $$('#dado'+i).html('|'+d[i]+'|');
    }
}