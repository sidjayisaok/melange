//animate.css jquery controls
$(function(){
//variables added to reduce repetition
let jelloClass ='animated jello';
let rubberClass = 'animated rubberBand';
let tadaClass = 'animated tada';
let shakeClass ='animated shake';
let fadeinClass = 'animated fadeInLeft';
let fadeoutClass = 'animated fadeOutLeft';
let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//animates list
$('li').on({

 'click': ()=>{
     $('li').addClass(jelloClass).one(endClass, function(){
         $(this).removeClass(jelloClass);
     })
 },
//this makes them animate when hovering over them via the mouse
 'mouseover': ()=>{
     $('li').addClass(tadaClass).one(endClass, function(){
         $(this).removeClass(tadaClass);
     })
 }
});

});