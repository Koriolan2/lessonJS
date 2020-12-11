'use strict'

const d = document;
let start = d.getElementById('start'),
      cancel = d.getElementById('cancel'),
      btnIncAdd = d.getElementsByTagName('button')[0],
      btnExpAdd = d.getElementsByTagName('button')[1],
      checkBox = d.querySelector('#deposit-check'),
      addIncItem = d.querySelectorAll('.additional_income-item'),
      budgetDayValue = d.querySelector('.result-budget_day input'),  
      expensesMonthValue = d.querySelector('.rezult-expenses_month input'),
      addIncomeValue = d.querySelector('.result-additional_income input'),  
      addExpValue = d.querySelector('.result-additional_expenses input'),
      incPeriodValue = d.querySelector('.result-income_period input'),
      targetMonthValue = d.querySelector('.result-target_month input'),
      salaryAmount = d.querySelector('.salary-amount'),
      expensesItems = d.querySelectorAll('.expenses-items'),
      addExpItem = d.querySelector('.additional_expenses-item'),
      targetAmount = d.querySelector('.target-amount'),
      periodSelect = d. querySelector('.period-select'),
      periodAmount = d.querySelector('.period-amount'),
      budgetMonthValue = d.querySelector('.result-budget_month input'),
      incomeItems = d.querySelectorAll('.income-items');  

const AppData = function () {
    this.budget =0;
    this.budgetDay =0;
    this.budgetMonth =0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth =0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function () {
    if(salaryAmount.value === '') {
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {
    if (salaryAmount.value === '') {
        start.setAttribute('disabled', 'true');
        return;
    }
    let allInput = d.querySelectorAll('.data input[type = text]');
    allInput.forEach(function (item) {
        item.setAttribute('disabled', 'true')
    });
    btnExpAdd.setAttribute('disabled', 'true');
    btnIncAdd.setAttribute('disabled','true');
    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();

    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();
    this.showResult();
};

AppData.prototype.showResult = function () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        addExpValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incPeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', function () {
                incPeriodValue.value = _this.calcPeriod();
        });
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
    expensesItems = d.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        btnExpAdd.style.display = 'none';
    }
};

AppData.prototype.reset = function () {
    let inputTextData = d.querySelectorAll('.data input[type = text]'),
        resultInputAll = d.querySelectorAll('.result input[type = text]');

    inputTextData.forEach(function (elem) {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    resultInputAll.forEach(function (elem){
        elem.value = '';
    });

    for (let i = 1; i<incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        btnIncAdd.style.display = 'block';
    };
    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        btnExpAdd.style.display = 'block';
    }; 

    this.budget =0;
    this.budgetDay =0;
    this.budgetMonth =0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesMonth =0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnExpAdd.removeAttribute('disabled');
    checkBox.checked = false;
};

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay >= 800) {
        return ('Высокий уровень дохода');
    } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
        return ('Средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
        return ('Низкий уровень дохода');
    } else if (this.budgetDay < 0){
        return ('Что-то пошло не так!')
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        } while (isNaN(this.percentDeposit) || this.percentDeposit ==='');
        do {
            this.moneyDeposit = prompt('Какая сумма заложена',10000);
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === ' ' ||
        this.moneyDeposit === null)
        }
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    addIncItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
        
    });
};

AppData.prototype.getAddExpenses = function () {
    const _this = this;
    let addExpenses = addExpItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
        
    })
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome != '') {
            _this.income[itemIncome] = +cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem =  incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
    incomeItems = d.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        btnIncAdd.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.eventsListeners = function () {
    start.addEventListener('click', this.start.bind(this));
    btnExpAdd.addEventListener('click', this.addExpensesBlock);
    btnIncAdd.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('keyup', this.check);
    cancel.addEventListener('click', this.reset.bind(this));

    periodSelect.addEventListener('change',function () {
        periodAmount.innerHTML = periodSelect.value;
    });

    let addExp = [];
    for (let i = 0; i< this.addExpenses.length; i++) {
        let element = this.addExpenses[i].trim();
        element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
        addExpr.push(element);
    }
}


const appData = new AppData();

appData.eventsListeners();

console.log (appData);

