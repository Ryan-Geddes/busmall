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

// counts clicks, used to trigger hide event handler
var clickTracker = 0;
var photonumber = 0;

//userform 

var userForm = document.getElementById('userform')
userForm.addEventListener('submit', handleSubmit); 

function handleSubmit(event){
    event.preventDefault();

    clickTracker = parseInt(event.target.rounds.value);
    photonumber = parseInt(event.target.photonumber.value);
    console.log(clickTracker);
    console.log(photonumber);
}



// create link to our DOM elements
var imageOneEl = document.getElementById('image-1');
var imageTwoEl = document.getElementById('image-2');
var imageThreeEl = document.getElementById('image-3');
var divEl = document.getElementById('container');


//Item constructor
function Item(name, src){
    this.name = name;
    this.src = src;
    this.clicked = 0;
    this.displayed = 0;

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

 var selectedArr = [];
//image generator function
function imageGenerator(){


    var pic1 = randomizer(itemsArr.length);
    while ((pic1 === selectedArr[0]) || (pic1 ===selectedArr[1]) || (pic1 === selectedArr[2])){
        pic1 = randomizer(itemsArr.length);
    }

    var pic2 = randomizer(itemsArr.length);
    while ((pic2 === selectedArr[0]) || (pic2 ===selectedArr[1]) || (pic2 === selectedArr[2]) 
    || pic1 === pic2 || pic2 === pic3 || pic1 === pic3){
        pic2 = randomizer(itemsArr.length);
    }

    var pic3 = randomizer(itemsArr.length);
    while ((pic3 === selectedArr[0]) || (pic3 ===selectedArr[1]) || (pic3 === selectedArr[2]) 
    || pic1 === pic2 || pic2 === pic3 || pic1 === pic3){
        pic3 = randomizer(itemsArr.length);
    }


    // if (photonumber != 3){
        //run add photos function
        // for loop for amount of photos
        //
    // }
    //// debugging 
    // if ((pic1 === selectedArr[0]) || (pic1 ===selectedArr[1]) || (pic1 === selectedArr[2])
    //     || (pic2 === selectedArr[0]) || (pic2 ===selectedArr[1]) || (pic2 === selectedArr[2])
    //     || (pic3 === selectedArr[0]) || (pic3 ===selectedArr[1]) || (pic3 === selectedArr[2])){
    //     console.log('oh fuck')
    // }

    selectedArr[0] = pic1;
    selectedArr[1] = pic2;
    selectedArr[2] = pic3;

    imageOneEl.src = itemsArr[pic1].src;
    imageOneEl.title = itemsArr[pic1].name;
    itemsArr[pic1].displayed++;

    imageTwoEl.src = itemsArr[pic2].src;
    imageTwoEl.title = itemsArr[pic2].name;
    itemsArr[pic2].displayed++;

    imageThreeEl.src = itemsArr[pic3].src;
    imageThreeEl.title = itemsArr[pic3].name;
    itemsArr[pic3].displayed++;

    ////debugging code:
    // console.log(itemsArr[pic1]);
    // console.log(itemsArr[pic2]);
    // console.log(itemsArr[pic3]);

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

    if(clickTracker <= 0){
        stopClicking();
        renderChart();
        renderList();
        //add render list
    }
    imageGenerator();

};


divEl.addEventListener('click', handleClick);

imageGenerator();

// create a ul to display results

//helper function
function createElement(element, content, parent){
    var newElement = document.createElement(element);
    newElement.textContent = content;
    parent.appendChild(newElement);
    return newElement;
}

//if you declare the parent as a variable earlier in the code you 
//can just plug it in instead of getting by tag name

function renderList(){
    for (var i = 0; i < itemsArr.length; i++){
        createElement('li',`${itemsArr[i].name} was displayed ${itemsArr[i].displayed} times and clicked ${itemsArr[i].clicked} times.`, document.getElementById('list'));
    }
}

// remove list function so we can re-render it after every click

// function removeList(elementTag){
//     var element = document.getElementsByTagName(elementTag);
//     element.ul.removeChild(element);
// }

// chart rendering demo below:


function renderChart(){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: seedChartData()[1],
        datasets: [{
            label: 'clicked',
            data: seedChartData()[0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
        label: 'displayed',
        data: seedChartData()[2],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

        }]
    
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

//seeding chart data function
function seedChartData() {
    var clickArray = [];
    var labelArray = [];
    var viewedArray = [];
    
    for (var i = 0; i < itemsArr.length; i++){
        clickArray.push(itemsArr[i].clicked);
        labelArray.push(itemsArr[i].name);
        viewedArray.push(itemsArr[i].displayed);
    }
    return [clickArray, labelArray, viewedArray];
}

//demo

// var fruitsArr = ['apple', 'banana', 'blueberries', 'cherries'];
// var selectedArr = [];
// function randomfruits() {
//   // starter code
//   for(var i = 0; i < 10; i++){
//     var pic1 = Math.floor(Math.random() * fruitsArr.length);
//     while ((pic1 === selectedArr[0]) || (pic1 ===selectedArr[1])){
//       pic1 = Math.floor(Math.random() * fruitsArr.length);
//     }
//     var randomFruitTwo = Math.floor(Math.random() * fruitsArr.length);
//     while ((randomFruitTwo ===selectedArr[0]) || (randomFruitTwo ===selectedArr[1]) || (randomFruitTwo === pic1)){
//       randomFruitTwo = Math.floor(Math.random() * fruitsArr.length);
//     }
//     console.log(fruitsArr[pic1], fruitsArr[randomFruitTwo]);
//     selectedArr[0]=pic1;
//     selectedArr[1]=randomFruitTwo;
//   }
// }
// randomfruits();