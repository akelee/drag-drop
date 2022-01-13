const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'

];

//Store listItems

const listItems = [];//represents listItems as we sort it

//Need a way to keep track of index of each listItem so initialise a var called dragStartIndex

let dragStartIndex; //use let as it will be changed later

createList();

//Insert list items into DOM

function createList(){
    [...richestPeople] //...spread operator copies array above as is and loop thru it with .forEach. person reps string info, index reps position of item in array
    
    .map(a => ({value: a, sort: Math.random()})) //change array into object w a vlue and a sort. takes array and return new array. for each one 'a', we want to return a list of objects. Math.random returns random decimal
    .sort((a, b) => a.sort - b.sort) //sorted via random value
    .map(a => a.value) //chnged obj back into array of strings
    .forEach((person, index) => {
        const listItem = document.createElement('li');//create new html list item element to insert in DOM

      
        listItem.setAttribute('data-index', index); //add an attribute to the listItem, which needs an index to keep track of each item, set to index. Custom attribute in html5 needs 'data'-__

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

        //to display the number. don't want 0 to be displayed but 1, so +1. to make it actually draggable, we need to add draggable = true

        listItems.push(listItem); //push listItem onto listItems array initialised above
        draggable_list.appendChild(listItem); //add it to DOM. Append LI into UL
    });

    addEventListeners();
};

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index'); //.closest method gets the nearest li. data-index tells us what item is in which position. + symbol makes it a number
}

function dragEnter() {
  this.classList.add('over'); //'over' gives it darker bg property. this. pertains to element itself
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {//pass in event parameter and call e.preventDefault
  e.preventDefault();

}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

//Swap list items that are drag and drop

function swapItems(fromIndex, toIndex) { //where we pick up, where we drop it
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

}

//Check the order of list items
function checkOrder(){
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim() //listItem = the single item we loop thru on each iteration. .trim = trims excess white space

    if(personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
  } else {
    listItem.classList.remove('wrong');
    listItem.classList.add('right');
  }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');



//loop through using .forEach
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', dragStart);//listen for 'dragstart' event, call a fn dragStart when 'dragstart' occurs
});

dragListItems.forEach(item => {
  item.addEventListener('dragover', dragOver);//'event', funCtion
  item.addEventListener('drop', dragDrop);
  item.addEventListener('dragenter', dragEnter);
  item.addEventListener('dragleave', dragLeave);
});

}

check.addEventListener('click', checkOrder);