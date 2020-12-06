'use strict'

const d = document;
let start = d.getElementById('start'),
      btnPlus = d.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      buttonPlus1 = d.getElementsByTagName('button')[0],
      buttonPlus2 = d.getElementsByTagName('button')[1], 
      budgetMonthValue = d.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = d.getElementsByClassName('expenses_month-value')[0],
      additionalExpensesValue = d.getElementsByClassName('additional_expenses-value')[0],
      budgetDayValue = d.getElementsByClassName('budget_day-value')[0],
      depositCheckmark = d.querySelector('#deposit-check'),
      additionalIncomeItem = d.querySelectorAll('.additional_income-item'),
      values = d.getElementsByClassName('result-total'),
      salaryAmount = d.querySelector('.salary-amount'),
      incomeTitle = d.querySelector('.income-title'),
      incomeAmount = d.querySelector('.income-amount'),
      expensesTitle = d.querySelector('.expenses-title'),
      expensesItems = d.querySelectorAll('.expenses-items'),
      periodSelect = d.querySelector('.period-select'),
      periodAmount = d.querySelector('.period-amount'),
      additionalExpensesItem = d.querySelector('.additional_expenses-item'),
      additionalIncomeValue = d.querySelector('.additional_income-value'),
      targetAmount = d.querySelector('.target-amount'),
      targetMonthValue = d.querySelector('.target_month-value'),
      incomePeriodValue = d.querySelector('.income_period-value'),
      incomeItem = d.querySelectorAll('.income-items');

let appData = {
    budget:0,
    budgetDay:0,
    budgetMonth:0,
    income: {},
    incomeMonth: 0, 
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesMonth:0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            appData.moneyDeposit = prompt('Какая сумма заложена',10000);

        }
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    start:function () {
        if (salaryAmount.value === ''){
            alert ('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBudget();
        appData.showResult();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = d.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem =  incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = d.querySelectorAll('.income-items');
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome != '') {
                appData.income[itemIncome] = +cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();

        
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');

        console.log(addExpenses);
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
            console.log(appData.addExpenses);
        })
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue != '') {
                appData.addIncome.push(itemValue);
            }
        });
    }
};

const capitalize = function(str) {
    return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
}
     
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input',function () {
    periodAmount.textContent = periodSelect.value;
})

