//animate.css jquery controls
$(function(){
//variables added to reduce repetition
let bounceInClass ='animated bounceIn';
let rubberClass = 'animated rubberBand';
let tadaClass = 'animated tada';
let bounceClass ='animated bounce';
let shakeClass = 'animated shake';
let bounceOutUpClass = 'animated bounceOutUp';
let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
//animates list
$('li').on({

 'click': ()=>{
     $('li').addClass(bounceInClass).one(endClass, function(){
         $(this).removeClass(bounceInClass);
     })
 },
//this makes them animate when hovering over them via the mouse
 'mouseover': ()=>{
     $('li').addClass(tadaClass).one(endClass, function(){
         $(this).removeClass(tadaClass);
     })
 }
});

//animates button
$('button').on({

 'click': ()=>{
     $('button').addClass(rubberClass).one(endClass, function(){
         $(this).removeClass(rubberClass);
     })
 },
//this makes them animate when hovering over them via the mouse
 'mouseover': ()=>{
     $('button').addClass(bounceClass).one(endClass, function(){
         $(this).removeClass(bounceClass);
     })
 }
});

});