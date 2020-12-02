'use strict'
const d = document;

let books = d.querySelectorAll('.book');

// books[1].before(books[0]);

books[0].before(books[1]);
books[0].after(books[4]);
books[5].after(books[2]);
d.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

books[4].querySelector('h2>a').textContent = 'Книга 3. this и Прототипы Объектов';

d.querySelector('.adv').remove();

let book2element = books[0].querySelectorAll('li');
book2element[3].after(book2element[6]);
book2element[6].after(book2element[8]);
book2element[9].after(book2element[2]);

let book5element = books[5].querySelectorAll('li');
book5element[1].after(book5element[9]);
book5element[4].after(book5element[2]);
book5element[7].after(book5element[5]);

let g = d.createElement('li');
g.textContent = 'Глава 8: За пределами ES6';
let book6element = books[2].querySelectorAll('li');
book6element[8].after(g);

// function dataAttr(b) {
//     for (let key in Array.from(b)) {
//         b[key].setAttribute('data-number', key);
//     }
// }