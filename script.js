const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 3;


const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));

}

start();

const showTypeof = function(item) {
    console.log(typeof item);
}

showTypeof(money);
showTypeof(income);
showTypeof(deposit);


let expenses = [];
// let expenses1 = prompt('Введите обязательную статью расходов?'), 
//     expenses1Amount = prompt('Во сколько это обойдется?'),
//     expenses2 = prompt('Введите еще одну обязательную статью расходов?'),
//     expenses2Amount = prompt('Во сколько это обойдется?');

console.log(addExpenses.toLowerCase().split(','));

/*Опредление суммы расходов*/
const getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i<2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов');

        let s;

        do {
               s = +prompt('Во сколько это обойдется?'); 
        } while (!isNumber(s)) ;

        sum += s;
    }
    console.log(expenses);
    return sum;
}

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

const getAccomulatedMonth = function() {
    return money - expensesAmount;
} 

let accomulatedMonth = getAccomulatedMonth();

let getTargetMonth = function() {
    return mission / accomulatedMonth;
};

let budgetDay = accomulatedMonth / 30;

console.log('Цель будет достигнута за ' + Math.ceil(getTargetMonth()) + ' месяца');

const getStatusIncome = function() {
    if (budgetDay <= 0) {
        return 'Что-то пошло не так';
    } else if (budgetDay <= 300) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay <= 800) {
       return 'У вас средний уровень дохода';
    } else {
       return 'У вас высокий уровень дохода';
    }
}

 console.log(getStatusIncome());