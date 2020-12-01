'use strict'
let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 50000);
        }
        while (isNaN(money) || money ==='' || money === null)
    };

start();


let appData = {
    budget:money,
    budgetDay:0,
    budgetMonth:0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth:0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Такусую');
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            appData.income[itemIncome] = cashIncome;
        } 
        let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let itemExpenses = prompt('Введите обязательную статью расходов', 'детский сад');
            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?', 2500);
            }
            while (isNaN(cashExpenses) || cashExpenses === '' || cashExpenses === null) ;
            
            appData.expenses[itemExpenses] = cashExpenses;

        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return appData.mission / appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return ('Высокий уровень дохода');
        } else if (appData.budgetDay > 300) {
            return ('Средний уровень дохода');
        } else if (appData.budgetMonth >0) {
            return ('Низкий уровень дохода');
        } else {
            return ('Что-то пошло не так!')
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            appData.moneyDeposit = prompt('Какая сумма заложена',10000);

        }
    },
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() > 0) {
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log ('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

for (let key in appData) {
    console.log('наша программа включает данные: ' + key + ' - ' + appData[key]);
}


const capitalize = function(str) {
    return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
}
console.log(capitalize(appData.addExpenses.join(', ')));

const d = document;
const startButton = d.getElementById('start'),
      buttonPlus1 = d.getElementsByTagName('button')[0],
      buttonPlus2 = d.getElementsByTagName('button')[1], 
      depositCheckmark = d.querySelector('#deposit-check'),
      additionalIncomeItem = d.querySelectorAll('.additional_income-item'),
      values = d.getElementsByClassName('result-total'),
      salaryAmount = d.querySelector('.salary-amount'),
      incomeTitle = d.querySelector('.income-title'),
      incomeAmount = d.querySelector('.income-amount'),
      expensesTitle = d.querySelector('.expenses-title'),
      expensesAmount = d.querySelector('.expenses-amount'),
      targetAmount = d.querySelector('.expenses-amount'),
      periodSelect = d.querySelector('.period-select');
     
