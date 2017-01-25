//variables added to reduce repetition
let Currency = '#Currency';
let BMI = '#BMI';
let Maps = '#Maps';
let Restaurant = '#Restaurant';
let Portfolio = '#Portfolio';
let Alertify = '#Alertify';
let AnimateCSS = '#AnimateCSS';
let Bootstrap = '#Bootstrap';
let Browserify = '#Browserify';
let myd3 = '#d3';
let FontAwesome = '#FontAwesome';
let GMaps = '#GMaps';
let Novus = '#Novus';
let estimate = '#estimate';
let convert = '#convert';
let searchFunc = '#searchFunc';
let solve = '#solve';
let bmiButton = '#bmiButton';
let currencyButton = '#currencyButton';
let gMapsButton = '#gMapsButton';
let tipButton = '#tipButton';

//animate.css classes here
let bounceInClass ='animated bounceIn';
let rubberClass = 'animated rubberBand';
let tadaClass = 'animated pulse';
let bounceClass ='animated jello';
let flipClass = 'animated zoomOut';
let bounceOutUpClass = 'animated fadeOut';
let endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

//DRY version to control image animation
function logicAnim(param, classA, classB){

     $(param).on({
        'click': function(){
            $(param).addClass(classA).one(endClass, function(){
                $(this).removeClass(classA);
            })
        },

        'mouseover': function(){
            $(param).addClass(classB).one(endClass, function(){
                $(this).removeClass(classB);
            })
        }
    });
}


//call functions for top menu span
logicAnim(BMI, bounceInClass, tadaClass);

logicAnim(Currency, bounceInClass, tadaClass);

logicAnim(Maps, bounceInClass, tadaClass);

logicAnim(Restaurant, bounceInClass, tadaClass);

logicAnim(Portfolio, bounceInClass, tadaClass);

//these are for the home page tools list

logicAnim(Alertify, flipClass, bounceOutUpClass);

logicAnim(AnimateCSS, flipClass, bounceOutUpClass);

logicAnim(Bootstrap, flipClass, bounceOutUpClass);

logicAnim(Browserify, flipClass, bounceOutUpClass);

logicAnim(myd3, flipClass, bounceOutUpClass);

logicAnim(FontAwesome, flipClass, bounceOutUpClass);

logicAnim(GMaps, flipClass, bounceOutUpClass);

logicAnim(Novus, flipClass, bounceOutUpClass);

//these are for the page buttons

logicAnim(estimate, rubberClass, bounceClass);

logicAnim(convert, rubberClass, bounceClass);

logicAnim(searchFunc, rubberClass, bounceClass);

logicAnim(solve, rubberClass, bounceClass);

logicAnim(bmiButton, rubberClass, bounceClass);

logicAnim(currencyButton, rubberClass, bounceClass);

logicAnim(gMapsButton, rubberClass, bounceClass);

logicAnim(tipButton, rubberClass, bounceClass);

