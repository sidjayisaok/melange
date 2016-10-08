//animate.css jquery controls
$(function(){
//variables added to reduce repetition
let bounceClass ='animated jello';
let rubberClass = 'animated rubberBand';
let tadaClass = 'animated tada';
let flipClass ='animated shake';
let fadeinClass = 'animated fadeInLeft';
let fadeoutClass = 'animated fadeOutLeft';
let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//animates rectangles
$('.myTarget').on({
 'click': ()=>{
     $('.myTarget').addClass(bounceClass).one(endClass, function(){
         $(this).removeClass(bounceClass);
     })
 },
//this makes them animate when hovering over them via the mouse
 'mouseover': ()=>{
     $('.myTarget').addClass(flipClass).one(endClass, function(){
         $(this).removeClass(flipClass);
     })
 }

});
});