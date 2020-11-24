let money = Number(prompt('Ваш месячный доход?'));
let income = 20000; 
let addExpenses = Number(prompt('Перечислите возможные расходы за рассчитываемый период через запятую')); 
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000; 
let period = 10;
let expenses1 = Number(prompt('Введите обязательную статью расходов?'));
let amount1 = Number(prompt('Во сколько это обойдется?'));
let expenses2 = Number(prompt('Введите еще одну обязательную статью расходов?'));
let amount2 = Number(prompt('Во сколько это обойдется?'));


// console.log('money: ', money);
// console.log('income: ', income);
// console.log('deposit: ', deposit);

// console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' евро');

// let newAddExpenses = addExpenses.toLowerCase();

// console.log(newAddExpenses.split(', '));

let budgetMonth = money - amount1 - amount2;
console.log('Месячный бюджет: ', budgetMonth);

let missionEnd = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за '+ missionEnd + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день ' + budgetDay);

let conclusion = '';

if (budgetDay <= 0) {
    conclusion = 'Что-то пошло не так';
} else if (budgetDay <= 600) {
    conclusion = 'К сожалению у вас уровень дохода ниже среднего';
} else if (budgetDay <= 1200) {
    conclusion = 'У вас средний уровень дохода';
} else {
    conclusion = 'У вас высокий уровень дохода';
}

console.log(conclusion);


