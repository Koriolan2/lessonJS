let money = 12300;
let income = 20000; 
let addExpenses = 'Интернет, Такси, Коммунальные'; 
let deposit = false;
let mission = 1000000; 
let period = 10;

console.log('money: ', money);
console.log('income: ', income);
console.log('deposit: ', deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' евро');

let newAddExpenses = addExpenses.toLowerCase();

console.log(newAddExpenses.split(', '));


