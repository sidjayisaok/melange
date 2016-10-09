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
//animates rectangles
$('rect.bar').on({

 'click': ()=>{
     $('rect.bar').addClass(jelloClass).one(endClass, function(){
         $(this).removeClass(jelloClass);
     })
 },
//this makes them animate when hovering over them via the mouse
 'mouseover': ()=>{
     $('rect.bar').addClass(flipClass).one(endClass, function(){
         $(this).removeClass(flipClass);
     })
 }

});
});