/* GLOBAL VARIABLES */

// Load a few standard compliments, just in case the live list reload ceases to work.
const backgroundColors = {
    Mind: '#5eafff',
    Community: '#fec422',
    Pawprint: '#9cd2a6',
    Thriftiness:'#043f4c',
    Body:'#fe5f55',
    Happiness:'#ffb02e',
    Soul: '#c27ba0'
};




let setRandomBackground = function() {
    let tmp = Object.keys(backgroundColors);
    let bgcolor = tmp[Math.floor(Math.random() * backgroundColors.length)];
    $('body').css('background-color', backgroundColors['bgcolor']);
    $('.head-entry').css('background-color', backgroundColors['bgcolor']);
}

let menu_state = false;

let menu_open = function(){
    $('.c-menu').addClass('is-active');
    $('body').addClass('has-active-menu');
    $('#wrapper').addClass('has-slide-right');
    $('#c-mask').addClass('is-active');
    return true;
}
let menu_close = function(){
    $('.c-menu').removeClass('is-active');
    $('body').removeClass('has-active-menu');
    $('#wrapper').removeClass('has-slide-right');
    $('#c-mask').removeClass('is-active');
    return false;
}

$(document).ready(function() {

    let loc = (window.location.pathname.split('/').length > 0) ? window.location.pathname.split('/').reverse()[0] : '/index.html';
    if (loc == '') loc = '/';
    //console.log(loc);


    $('body').css('background-color', '#fec422');
    $('.head_entry').css('background-color', $('body').css('background-color'));
    setRandomBackground();
    
    let menu_btn = $('#menu-opener');
    menu_btn.click(function(e) {
        e.preventDefault();
        if (!menu_state) {
            menu_state = menu_open();
        } else {
            menu_state = menu_close();
        }
    });

    $('.c-menu__close, .c-mask').click(function(e) {
        e.preventDefault();
            menu_state = menu_close();
    });

});


