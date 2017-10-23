/* GLOBAL VARIABLES */

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

    $.getJSON('https://meeka.org/task.json', function(data) {
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
            task = tasks[(Math.floor(Math.random() * tasks.length))];
            showNewCompliment(task);
        });
}

let showNewCompliment = function(task) {
    setAccordingBackground(task);
    $('.title').text(task.title);
    // Set link path here
    $('.quest').text(task.task);
}

let setAccordingBackground = function(task) {
    let bgcolor = backgroundColors[task.color];
    $('body').css('background-color', bgcolor);
    $('.head-entry').css('background-color', bgcolor);
}



let setRandomBackground = function() {
    let bgcolor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    $('body').css('background-color', bgcolor);
    $('.head-entry').css('background-color', bgcolor);
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

    //console.log('Index page setup');
    refreshTasks();
    console.log(tasks)

    // $('body').css('background-color', bgcolor);
    $('.head_entry').css('background-color', $('body').css('background-color'));

    let body = $('#main');
    body.on("click",function() {
            task = tasks[(Math.floor(Math.random() * tasks.length))];
            showNewCompliment(task);
        })
    body.on("tap", function() {
            task = tasks[(Math.floor(Math.random() * tasks.length))];
            showNewCompliment(task);
        })
    body.on("swiperight", function() {
            task = tasks[task.id++];
            showNewCompliment(task);
        })
    body.on("swipeleft", function() {
            task = tasks[task.id--];
            showNewCompliment(task);
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


