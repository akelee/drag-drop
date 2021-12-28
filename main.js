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
    
    .map(a => ({value: a, sort: Math.random()})) //takes array and return new array. for each one 'a', we want to return a list of objects. Math.random returns random decimal
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
    })
};
