let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'Фриланс',
    addExcpenses = prompt('Перечислите возможные расходы через запятую?'),
    deposit = confirm('Есть ли у вас депозит в банке'),
    mission = 50000,
    period = 3;

let start = function() {
    money = prompt('Ваш месячный доход?');

    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?');
    }
};

start();

let showTypeof = function(item) {
    console.log(typeof item);
};

showTypeof(money);
showTypeof(income);
showTypeof(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

let getExcpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i<4; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        sum += +prompt('Во сколько это обойдется?');
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExcpensesMonth();

console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumelatedMonth();
