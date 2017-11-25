
'use strict';

var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

function Product(name) { // constructor function
  this.name = name;
  this.path = 'assets/' + this.name + '.jpg';
  this.votes = 0;
  // this.timesShown = 0;
  allProducts.push(this); // once object is constructed, adds to array allProducts
}

(function() { // iffe (immediately invoked function expression, that's why parenthesis are in front)
  for(var i in productNames) { // for every item in product names, create a new product
    new Product(productNames[i]); // "new" is a requirement to CALL a constructor
  }
})();


var tracker = { // object literal
  imagesEl: document.getElementById('images'), // get the node in the HTML file with id 'images'
  resultsEl: document.getElementById('results'), // get the node in HTML file with id 'results'
  clickCount: 0, // sets click counter to beginAtZero

  imageOne: document.createElement('img'), // three variables creating <img> in the HTML file
  imageTwo: document.createElement('img'), // ex <img src="">
  imageThree: document.createElement('img'),
  // imageThree: new Image(), // Example to show that the Image constructor can be used
  // these are three variables. format is different for creating them because it is inside of an object
  // would normally look like "var imageOne = document.createElement('img');"

  getRandomIndex: function() { // this function returns a random number to be used as an index for an array
    return Math.floor(Math.random() * allProducts.length); // takes in allProducts.length so that it doesn't return a number higher than the number of variables inside of allProducts
  },

  displayImages: function() { // displays images on the web page
    var idOne = this.getRandomIndex(); // creates three variables using the function getRandomIndex
    var idTwo = this.getRandomIndex(); // this function returns a number and we store them as idOne, idTwo, idThree
    var idThree = this.getRandomIndex();

    if (idOne === idTwo || idOne === idThree || idTwo === idThree) { // this makes sure your pictures don't repeat
      this.displayImages(); // this calls itself. it says if any of these numbers match, try again. call yourself. do the same function.
      return; // makes this part stop running so we start over
    }

    this.imageOne.src = allProducts[idOne].path; // retrieves the file path for the image,  then assigns it to the src of the image element
    this.imageTwo.src = allProducts[idTwo].path; // we created in the HTML file
    this.imageThree.src = allProducts[idThree].path; // <img src = "assets/example.jpg">

    this.imageOne.id = allProducts[idOne].name; // now it's assigning an ID to the images
    this.imageTwo.id = allProducts[idTwo].name; // <img src="assets/example.jpg" id="example">
    this.imageThree.id = allProducts[idThree].name;

    this.imageOne.className = 'product-images'; // now we assign a class so we can edit the CSS
    this.imageTwo.className = 'product-images'; // <img src="assets/example.jpg" id="example" class="product-images">
    this.imageThree.className = 'product-images';

    this.imagesEl.appendChild(this.imageOne); // attaches our image files to the HTML element with ID "image"
    this.imagesEl.appendChild(this.imageTwo);
    this.imagesEl.appendChild(this.imageThree);
  },

  onClick: function(event) { // this function is going to happen only if one if the pictures is clicked
    console.log(event.target.id); // console log's the click, tells you what the ID is of the thing that was clicked

    if(event.target.id === 'images') { // if they don't click the actual photos, just the image CONTAINER, this runs
      console.log('didnt click an image'); // console logs
      return; // returns so that this doesn't happen
    } else { // otherwise
      tracker.clickCount++; // increase the click tracker by one

      for(var i in allProducts) { // for every item in allProducts
        if(event.target.id === allProducts[i].name) { // if the ID we created earlier matches a name in the array
          allProducts[i].votes++; // increase the votes on the object in the array by one
          console.log(allProducts[i].name, allProducts[i].votes);
        }
      }
      if(tracker.clickCount < 15) { // if the clicks are less than 15,
        tracker.displayImages(); // keep displaying images
      } else if (tracker.clickCount === 15) { // what happens when 15 clicks
        tracker.removeEventListener();
        tracker.clickerResults(); // calls function that prints out results
        tracker.resetButton(); // function resets the webpage
      }
    }
  },

  removeEventListener: function() { // gets rid of event listener when 15 clicks happens
    tracker.imagesEl.removeEventListener('click', tracker.onClick); // finds the image element and removes the listener when clicked
  },

  clickerResults: function () {
    for (var i = 0; i < allProducts.length; i++) {
      var name = allProducts[i].name; // grabs the names from each object in the array
      var votes = allProducts[i].votes; // grabs the votes from each object in the array
      var results = document.getElementById('results'); // finds the results element in the HTML document
      var listItems = document.createElement('li');
      listItems.textContent = votes + ' votes for the ' + name;
      results.appendChild(listItems);
    }
  },

  resetButton: function () {
    var button = document.createElement('button'); // created a button element in the HTML
    button.textContent = 'TRY AGAIN'; // putthe visible text inside of it as 'try again'

    document.getElementById('reset').appendChild(button);
    // var roadMapToHTML = document.getElementById('reset');
    // roadMapToHTML.appendChild(button);
    // THIS IS THE SAME AS THE LINE ABOVE, JUST LONGER
    // STORE THINGS AS VARIABLES WHEN YOU WANT TO USE THEM MORE THAN ONCE
    button.addEventListener('click', function() {
      location.reload();
    });
  }
};

tracker.imagesEl.addEventListener('click', tracker.onClick); // go inside the tracker object, find the images element with ID imagesEl, then WAIT for the element to be clicked. once it's clicked, trigger tracker.onClick
tracker.displayImages(); // this starts the WHOLE program running! up until this point, the only thing that has happened is that the allProducts array was filled with the objects that were constructed.

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255,99,132,1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero:true
//         }
//       }]
//     }
//   }
// });



// 'use strict';
//
// var allProducts = []
// var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'logo', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'sweepers', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
//
// function Product(name) {
//   this.name = name;
//   this.path = 'assets/' + this.name + '.jpg';
//   this.votes = 0;
//   // this.timesShown = 0;
//   allProducts.push(this);
// }
//
// (function() {
//   for(var i in productNames) {
//     new Product(productNames[i]);
//   }
// })();
//
//
// var tracker = {
//   imagesEl: document.getElementById('images'),
//   resultsEl: document.getElementById('results'),
//   clickCount: 0,
//
//   imageOne: document.createElement('img'), // same as imageOne: new Image();
//   imageTwo: document.createElement('img'),
//   // imageThree: document.createElement('img'),
//   imageThree: new Image(),
//
//   getRandomIndex: function() {
//   return Math.floor(Math.random() * allProducts.length);
// },
//
// displayImages: function() {
//   var idOne = this.getRandomIndex();
//   var idTwo = this.getRandomIndex();
//   var idThree = this.getRandomIndex();
//
//   if(idOne === idTwo || idOne === idThree || idTwo === idThree) {
//     this.displayImages();
//     return;
//   }
//   // }(this.imageOne.src === this.imageTwo.src || this.imageOne.src === this.imageThree.src || this.imageTwo.src === this.imageThree.src) {
//   //   this.displayImages();
//
//   this.imgOne.src = allProducts[idOne].path //this.getRandomIndex()].path;
//   this.imgTwo.src = allProducts[idTwo].path //this.getRandomIndex()].path;
//   this.imgThree.src = allProducts[idThree].path //this.getRandomIndex()].path;
//
//
//   this.imagesEl.appendChild(this.imageOne);
//   this.imagesEl.appendChild(this.imageTwo);
//   this.imagesEl.appendChild(this.imageThree);
//   },
//
//   onClick: function(event) {
//     // event.preventDefault();  don't need in this case
//      console.log(event.target);
//     // this.displayImages();
//     if(event.target.id === 'images') {
//       console.log('didnt click an image')
//       return;
//     } else {
//       tracker.clickCount++;
// ````
//       for(var i in allProducts) {
//         if(event.target.id === allProducts[i])
//         // if(event.target.src === )
//
//
//       tracker.displayImages();
//     }
//   }
//
// tracket.imagesEl.addEventListener('click', tracker.onClick);
// tracker.displayImages();


// var  = ['boots', 'chair', 'scissors']; // TODO: see the pattern here, and what you need to fill in?
//
// function Product(name, path) {
//   // TODO: Build your constructor and necessary properties.
// }
//
// // TODO: Don't forget to build your objects. How can you do this withough having to write 14 lines of `new Product(., ., .)`?
//
// var productRank = {
//   // TODO: All the properties of the object! What do you think you need? Try to write one piece at a time and make sure it does what you want before writing a little more.
//   // NOTE: A-C-P reminder... Make very intentional and iterative changes to your code, and then A-C-P.
//
//   getRandomIndex: function() {
//     // TODO: Hmm... what's going to happen here?
//   },
//
//   displayImages: function() {
//     // TODO: Hmm... what's going to happen here?
//   },
//
//   tallyClicks: function(elementId) {
//     // TODO: Hmm... what's going to happen here?
//   },
//
//   displayResults: function() {
//     // TODO: Hmm... what's going to happen here?
//   },
//
//   showButton: function() {
//     // TODO: Hmm... what's going to happen here?
//   },
//
//   onClick: function() {
//     // TODO: Hmm... what's going to happen here?
// }
//
// productRank.imageEls.addEventListener('click', productRank.onClick);
// productRank.displayImages();
