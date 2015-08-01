/*
 * jQuery BubbletrapsjQuery
 * @author dimit28@gmail.com - http://develoteca.com
 * @version 1.0
 * @date Julio 31, 2015
 * @category jQuery plugin
 * @copyright (c) 2015 dimit28@gmail.com (http://develoteca.com)
 * @license CC Attribution-NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0) - http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
jQuery.fn.extend({BubbletrapsjQuery: function(opciones) {
          var InstanciaBopItjQuery=this;
		  var idInstancia=$(InstanciaBopItjQuery).attr('id');
		  var Selector="#"+idInstancia+" img";
		  
		  var SelectorPuntajeNulo;
          var SelectorPuntajeCentral;
          var SelectorpuntajesJugador;
          var SelectorpuntajeVidas;
          var SelectorVidas;
          var SelectorControlStop;
          var puntajeJugador;
          var MaximoVidas;
		  var VelocidadFichas;
          var VelocidadOrientacion;
		  var sonidoFondo;
          var sonidoAlto; 
          var sonidoPuntaje; 
          var sonidoPuntajeNulo; 
		  
		  defaults = {
		   SelectorPuntajeNulo:"#SelectorPuntajeNulo",
           SelectorPuntajeCentral:"#SelectorPuntajeCentral",
           SelectorpuntajesJugador:"#puntajesJugador",
           SelectorpuntajeVidas:'#SelectorVidas',
           SelectorVidas:"#Vidas",
           SelectorControlStop:"#ControlStop",
           puntajeJugador:0,
           MaximoVidas:3,
		   VelocidadFichas:60,
           VelocidadOrientacion:2000,
		   sonidoFondo: new Audio('sonidos/fondo.mp3'),
           sonidoAlto : new Audio('sonidos/stop.mp3'), 
           sonidoPuntaje : new Audio('sonidos/pointCenter.mp3'), 
           sonidoPuntajeNulo : new Audio('sonidos/pointnull.mp3')
		   }
		  var opciones = $.extend({}, defaults, opciones);
		   
		   SelectorPuntajeNulo=opciones.SelectorPuntajeNulo;
           SelectorPuntajeCentral=opciones.SelectorPuntajeCentral;
           SelectorpuntajesJugador=opciones.SelectorpuntajesJugador;
           SelectorpuntajeVidas=opciones.SelectorpuntajeVidas;
           SelectorVidas=opciones.SelectorVidas;
           SelectorControlStop=opciones.SelectorControlStop;
           puntajeJugador=opciones.puntajeJugador;
           MaximoVidas=opciones.MaximoVidas;
		   VelocidadFichas=opciones.VelocidadFichas;
           VelocidadOrientacion=opciones.VelocidadOrientacion;
		   sonidoFondo= opciones.sonidoFondo;
           sonidoAlto = opciones.sonidoAlto; 
           sonidoPuntaje =opciones.sonidoPuntaje;
           sonidoPuntajeNulo = opciones.sonidoPuntajeNulo;
          
		  $(SelectorVidas).html(MaximoVidas);
		  $(SelectorpuntajesJugador).html(0);
          ImagenInicial=$(Selector).attr('src');
          ImagenCentral=$(SelectorPuntajeCentral).attr('src');
          ImagenLateral=$(SelectorPuntajeLateral).attr('src');
          ImagenNula=$(SelectorPuntajeNulo).attr('src');
          ImagenVidas=$(SelectorpuntajeVidas).attr('src');
          
          puntajeCentral=Number($(SelectorPuntajeCentral).attr('data-points'));
          puntajeLateral=Number($(SelectorPuntajeLateral).attr('data-points'));
          
          
          CantidadImagenes=($(Selector).length);
          indiceCentral=((CantidadImagenes)/2).toFixed();
          indiceLateralIzquierdo=Number(indiceCentral)-1;
          indiceLateralDerecho=Number(indiceCentral)+1;
          
          NumeradorImagenes=1;
          indiceCambios=1;
          controlOrientacion=1;
          IndiceDelJuegador=0;
          
          $(Selector).each(function() {  
                $(this).attr('id',"Im_"+NumeradorImagenes);
                $(this).attr('data-imgOriginal',$(this).attr('src'));
                NumeradorImagenes++;
            });  
          
        IniacioDeJuego();
        TiempoCambioOrientacion();
        reproducirsonidoFondo();
          
        function IniacioDeJuego() {
                 VariableTiempoCambio = setTimeout(IniacioDeJuego,VelocidadFichas);
                 CambioImagenes();
                 if(controlOrientacion==2){OrientacionizquierdaDerecha(); }
                 if(controlOrientacion==1){ OrientacionDerechaIzquierda(); }
        }
        function CambioImagenes(){
              $(Selector).each(function() {  
                $(this).attr('src',$(this).attr('data-imgOriginal'));
            });     
                $('#Im_'+indiceCambios).attr('src',ImagenNula);
                if(indiceCambios==indiceCentral){                                                                    $('#Im_'+indiceCambios).attr('src',ImagenCentral);
                }
                if(indiceCambios==indiceLateralDerecho){                                                              $('#Im_'+indiceCambios).attr('src',ImagenLateral);
                }
                if(indiceCambios==indiceLateralIzquierdo){                                                            $('#Im_'+indiceCambios).attr('src',ImagenLateral);
                }
            IndiceDelJuegador=indiceCambios;
        }
        function OrientacionizquierdaDerecha(){
            
          indiceCambios++;if(indiceCambios>CantidadImagenes){indiceCambios=1; }
        }
        function OrientacionDerechaIzquierda(){
           indiceCambios--;if(indiceCambios<0){indiceCambios=12; }
        }
        function TiempoCambioOrientacion(){
                 VariableTiempoCambioOrientacion =               setTimeout(TiempoCambioOrientacion,VelocidadOrientacion);
                 controlOrientacion = Math.floor((Math.random() * 2) + 1);
        } 
        $(SelectorControlStop).click(function(){
		  $(this).prop( "disabled", true );
             clearTimeout(VariableTiempoCambio);
             sonidoFondo.pause();
             sonidoAlto.play();
            IndiceDelJuegador
            if((IndiceDelJuegador==indiceLateralIzquierdo)||(IndiceDelJuegador==indiceCentral)||(IndiceDelJuegador==indiceLateralDerecho)){
                sonidoPuntaje.play();
                VelocidadFichas=VelocidadFichas-0.9;
                VelocidadOrientacion=VelocidadOrientacion-0.9;
                
                
                if(IndiceDelJuegador==indiceCentral){
                puntajeJugador=puntajeCentral+puntajeJugador;
                }else{
                puntajeJugador=puntajeLateral+puntajeJugador;
                }
            $(SelectorpuntajesJugador).html(puntajeJugador);
            }
            else{
             sonidoPuntajeNulo.play();
                tiempoResume=2000;
                setTimeout(CambioVidas,tiempoResume-1000);
                }
             tiempoResume=2000;
             setTimeout(Resumirjuego,tiempoResume);
            
            
        });
        
          function reproducirsonidoFondo(){
            sonidoFondo.loop=true;
            sonidoFondo.play();
          }
         function Resumirjuego(){
		    $(SelectorControlStop).prop( "disabled", false );
            IniacioDeJuego();
            reproducirsonidoFondo();
            
        }
          function CambioVidas(){
          MaximoVidas=MaximoVidas-1
          $(SelectorVidas).html(MaximoVidas);
            
        $(Selector).each(function() {  
                $(this).attr('src',$(this).attr('data-imgOriginal'));
            }); 
              
          var cicloVidas=0;
          for(cicloVidas=1;cicloVidas<=MaximoVidas;cicloVidas++){    
            $('#Im_'+cicloVidas).attr('src',ImagenVidas);  
              console.log(cicloVidas);
           }
          if(MaximoVidas==0){
                MaximoVidas=3;
                puntajeJugador=0;
                VelocidadFichas=60;
                VelocidadOrientacion=2000;
                $(SelectorpuntajesJugador).html(puntajeJugador);
               $(SelectorVidas).html(MaximoVidas);
            }
              
          }
         		
	}
});