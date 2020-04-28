'use strict';
// do not display and results until 25 selections have been made
// follow total number of clicks
//track percentage of times an item was clicked when it was shown
//also need to track how many times each item is displayed


//create a constructor function to make an object for each product:
//  needs:
//  name
//  file path
// click counter


var itemsArr = [];

// create link to our DOM elements
var imageOneEl = document.getElementById('image-1');
var imageTwoEl = document.getElementById('image-2');
var imageThreeEl = document.getElementById('image-3');
var divEl = document.getElementById('container');

// Track how many times a user has clicked on images
var clickTracker = 500;

//Item constructor
function Item(name, src){
    this.name = name;
    this.src = src;
    this.clicked = 0;

    itemsArr.push(this);
}

//create items:

new Item('bag',  './assets/bag.jpg');
new Item('banana',  './assets/banana.jpg');
new Item('bathroom',  './assets/bathroom.jpg');
new Item('boots',  './assets/boots.jpg');
new Item('breakfast',  './assets/breakfast.jpg');
new Item('bubblegum',  './assets/bubblegum.jpg');
new Item('chair',  './assets/chair.jpg');
new Item('cthulhu',  './assets/cthulhu.jpg');
new Item('dog-duck',  './assets/dog-duck.jpg');
new Item('dragon',  './assets/dragon.jpg');
new Item('pen',  './assets/pen.jpg');
new Item('pet-sweep',  './assets/pet-sweep.jpg');
new Item('scissors',  './assets/scissors.jpg');
new Item('shark',  './assets/shark.jpg');
new Item('sweep',  './assets/sweep.png');
new Item('tauntaun',  './assets/tauntaun.jpg');
new Item('unicorn',  './assets/unicorn.jpg');
new Item('usb',  './assets/usb.gif');
new Item('water-can',  './assets/water-can.jpg');
new Item('wine-glass',  './assets/wine-glass.jpg');



// randomizer function
function randomizer(max){
    return Math.floor(Math.random() * max);
};


//once clicks are exhausted function
function stopClicking() {
    divEl.removeEventListener('click', handleClick);
    divEl.textContent = '';
    console.log('done');
}

//image generator function
function imageGenerator(){
    var pic1 = randomizer(itemsArr.length);
    var pic2 = randomizer(itemsArr.length);
    var pic3 = randomizer(itemsArr.length);

    // regenerate if the same item appears
    while (pic1 === pic2 || pic1 === pic3 || pic2 === pic3){
        var pic1 = randomizer(itemsArr.length);
        var pic2 = randomizer(itemsArr.length);
    }

    imageOneEl.src = itemsArr[pic1].src;
    imageOneEl.title = itemsArr[pic1].name;

    imageTwoEl.src = itemsArr[pic2].src;
    imageTwoEl.title = itemsArr[pic2].name;

    imageThreeEl.src = itemsArr[pic3].src;
    imageThreeEl.title = itemsArr[pic3].name;
}

//add event handler for click
function handleClick(event) {
    // increment our property 'clicks', and generate two new images
    var clickedItem = event.target.title;
    console.log(clickedItem);
    for(var i = 0; i < itemsArr.length; i++){
        if(clickedItem === itemsArr[i].name){
            itemsArr[i].clicked++;
        }
    }
    clickTracker--;

    if(clickTracker === 0){
        stopClicking();
    }
    imageGenerator();
};


divEl.addEventListener('click', handleClick);

imageGenerator();