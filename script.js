let money = Number(prompt('Ваш месячный доход?')) ,
    income = 20000,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 10,
    expenses1 = Number(prompt('Введите обязательную статью расходов?')),
    amount1 = Number(prompt('Во сколько это обойдется?')),
    expenses2 = Number(prompt('Введите еще одну обязательную статью расходов?')),
    amount2 = Number(prompt('Во сколько это обойдется?')),
    arr = addExpenses.split(',');

// Сумма расходов   
const getExpensesMonth = function(am1, am2) {
    if (!am1) {
        am1 = 0;
    }
    if (!am2) {
        am2 = 0;
    }   

    return amount1 - amount2;
}

// Накопления за месяц
const getAccumulatedMonth = function(inc, dop, expence) {
    return rezult = inc + dop - expence;
}

let accumulatedMonth = getAccumulatedMonth(money, income, getExpensesMonth(amount1, amount2));


const getTargetMonth = function(accomulated, miss) {
    return rezultMission = Math.ceil(miss / accomulated);
}

let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data) {
    console.log(typeof data);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(arr);
showTypeOf(deposit);

console.log('Обязательные расходы за месяц', getExpensesMonth(amount1, amount2));
console.log(arr);
console.log('Цель будет достигнута за '+ getTargetMonth(accumulatedMonth, mission) + ' месяцев');
console.log('Бюджет на день ' + budgetDay);


const getStatusIncome = function(bDay) {
    if (bDay <= 0) {
        return 'Что-то пошло не так';
    } else if (bDay <= 600) {
        return  'К сожалению у вас уровень дохода ниже среднего';
    } else if (bDay <= 1200) {
        return  'У вас средний уровень дохода';
    } else {
        return  'У вас высокий уровень дохода';
    }
}

console.log(getStatusIncome(budgetDay));


