/* GLOBAL VARIABLES */

// Load a few standard compliments, just in case the live list reload ceases to work.
let tasks = [];
let links = ['#', '#', '#', '#'];
let clickcounter = 0;
const backgroundColors = [
    '#5eafff',
    '#fec422',
    '#9cd2a6',
    '#043f4c',
    '#fe5f55'
];
const date = new Date();
let task;

let refreshTasks = function() {

    $.getJSON('/task.json', function(data) {
            //console.log(data);
            tasks = [];
            links = [];
            for (var i = 0; i < data.length; i++) {
                tasks.push(data[i]['Title']);
                links.push(data[i]['Task']);
            }
            console.log('tasks list was refreshed successfully');
        })
        .done(function() {})
        .fail(function(jqxhr, textStatus, error) {
            console.log('There was an error fetching new compliments: ' + textStatus);
        })
        .always(function() {
            task = Math.floor(Math.random() * tasks.length);
            showNewCompliment();
        });
}

let showNewCompliment = function() {
    if (task == tasks.length - 1) task = 0;
    setRandomBackground();
    let newCompliment = tasks[task];
    $('.title').text(newCompliment);
    // Set link path here
    $('.quest').text(links[task]);
}





let setRandomBackground = function() {
    let bgcolor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    $('body').css('background-color', bgcolor);
    $('li').css('background-color', bgcolor);
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

    // $('body').css('background-color', bgcolor);
    $('li').css('background-color', $('body').css('background-color'));

    let body = $('#main');
    body.on("click",function() {
            task = Math.floor(Math.random() * tasks.length);
            showNewCompliment();
        })
    body.on("tap", function() {
            task = Math.floor(Math.random() * tasks.length);
            showNewCompliment();
        })
    body.on("swiperight", function() {
            task++;
            showNewCompliment();
        })
    body.on("swipeleft", function() {
            task--;
            showNewCompliment();
        });
    // $(document).keydown(function(e) {
    //     if (e.keyCode == 37)
    //         task--;
    //     else if (e.keyCode == 39)
    //         task++;
    //     showNewCompliment();
    //});
    
    let menu_btn = $('#menu-opener');
    menu_btn.click(function(e) {
        e.preventDefault();
        if (!menu_state) {
            menu_state = menu_open();
        } else {
            menu_state = menu_close();
        }
    });

});


