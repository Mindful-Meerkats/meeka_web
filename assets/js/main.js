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

const refreshTasks = () => {

    fetch('https://quest.meeka.org/list5')
    .then((res)=>{
        if(!res.ok)
            throw new Error("Request failed with a HTTP Error Code");
        return res.json();
    })
    .then((json)=>{
            for(let obj of data){
                tasks.push(obj);
            }
            console.log('tasks list was refreshed successfully');
    })
    .then(showNewCompliment());
}

const showNewCompliment = () => {
    task = tasks.shift();
    fetch('https://quest.meeka.org/rquest')
    .then((res)=>{
        if(!res.ok)
            throw new Error('There was an error fetching the new quest: ' + textStatus + " error:"+error);
        return res.json();
    })
    .then((data)=>{
        tasks.push(data);
    });
    setBackground(task);
    $('.title').text(task.title);
    $('.quest').text(task.task);
}

const setBackground = (task) => {
    let bgcolor = backgroundColors[task.color];
    $('body').css('background-color', bgcolor);
    $('.head-entry').css('background-color', bgcolor);
}

/*------ MENU SECTION------------*/

let menu_state = false;

const menu_open = () => {
    $('.c-menu').addClass('is-active');
    $('body').addClass('has-active-menu');
    $('#wrapper').addClass('has-slide-right');
    $('#c-mask').addClass('is-active');
    return true;
}
const menu_close = () => {
    $('.c-menu').removeClass('is-active');
    $('body').removeClass('has-active-menu');
    $('#wrapper').removeClass('has-slide-right');
    $('#c-mask').removeClass('is-active');
    return false;
}

/*--------HANDLER SETUP-------------*/

document.addEventListener('DOMContentLoaded', () => {

    let loc = (window.location.pathname.split('/').length > 0) ? window.location.pathname.split('/').reverse()[0] : '/index.html';
    if (loc == '') loc = '/';

    refreshTasks();

    const body = document.querySelector('#main');
    body.addEventListener("click",()=> {
            showNewCompliment();
        });
    
    const menu_btn = document.querySelector('#menu-opener');
    menu_btn.addEventListener("click",(e) =>{
        e.preventDefault();
        if (!menu_state) {
            menu_state = menu_open();
        } else {
            menu_state = menu_close();
        }
    });

    document.querySelector('.c-menu__close, .c-mask').addEventListener("click",(e) => {
        e.preventDefault();
        menu_state = menu_close();
    });

});


