/* GLOBAL VARIABLES */
/*-----------QUEST SECTION---------------*/
// Load a few standard compliments, just in case the live list reload ceases to work.
let tasks = [];
let clickcounter = 0;
const backgroundColors = {
    Mind: '#5eafff',
    Community: '#fec422',
    Pawprint: '#9cd2a6',
    Thriftiness:'#043f4c',
    Body:'#fe5f55',
    Happiness:'#ffb02e',
    Soul: '#c27ba0'
};
const date = new Date();
let task;

let refreshTasks = function() {

    $.getJSON('https://quest.meeka.org/list5', function(data) {
            for(let obj of data){
                tasks.push(obj);
            }
            console.log('tasks list was refreshed successfully');
        })
        .done(function() {})
        .fail(function(jqxhr, textStatus, error) {
            console.log('There was an error fetching new compliments: ' + textStatus);
        })
        .always(function() {
            showNewCompliment();
        });
}

let showNewCompliment = function() {
    task = tasks.shift();
    $.getJSON('https://quest.meeka.org/rquest',function(data){
        tasks.push(data);
    }).done(function(){console.log("new task appended!");})
    .fail(function(jqxhr, textStatus, error) {
            console.log('There was an error fetching the new quest: ' + textStatus + " error:"+error);
        });
    setBackground(task);
    $('.title').text(task.title);
    // Set link path here
    $('.quest').text(task.task);
}

let setBackground = function(task) {
    let bgcolor = backgroundColors[task.color];
    $('body').css('background-color', bgcolor);
    $('.head-entry').css('background-color', bgcolor);
}



let setRandomBackground = function() {
    let bgcolor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    $('body').css('background-color', bgcolor);
    $('.head-entry').css('background-color', bgcolor);
}

/*------ MENU SECTION------------*/

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

/*--------HANDLER SETUP-------------*/

$(document).ready(function() {

    let loc = (window.location.pathname.split('/').length > 0) ? window.location.pathname.split('/').reverse()[0] : '/index.html';
    if (loc == '') loc = '/';

    refreshTasks();

    $('.head_entry').css('background-color', $('body').css('background-color'));

    let body = $('#main');
    body.on("click",function() {
            showNewCompliment();
        })
    body.on("tap", function() {
            showNewCompliment();
        })
    body.on("swiperight", function() {
            showNewCompliment();
        })
    body.on("swipeleft", function() {
            showNewCompliment();
        });
    
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


