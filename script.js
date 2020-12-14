'use strict'

const d = document;
let   start = d.getElementById('start'),
      cancel = d.getElementById('cancel'),
      btnIncAdd = d.getElementsByTagName('button')[0],
      btnExpAdd = d.getElementsByTagName('button')[1],
      checkBox = d.querySelector('#deposit-check'),
      addIncItem = d.querySelectorAll('.additional_income-item'),
      budgetDayValue = d.querySelector('.result-budget_day input'),  
      expensesMonthValue = d.querySelector('.result-expenses_month input'),
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
      incomeItems = d.querySelectorAll('.income-items'),
      depositCheck = d.getElementById('deposit-check'),
      depositBank = d.querySelector('.deposit-bank'),
      depositAmount = d.querySelector('.deposit-amount'),
      depositPercent = d.querySelector('.deposit-percent');  

class AppData {      
    constructor () {
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
    }

    check = function () {
        if(salaryAmount.value === '') {
            start.removeAttribute('disabled');
        }
    };

    start = function () {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        const allInput = d.querySelectorAll('.data input[type = text]');
        allInput.forEach((item) => {
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
        this.getInfoDeposit();
        this.getBudget();
        this.getInfoDeposit();
        this.getStatusIncome();
        this.showResult();
    };

    showResult = function () {
        // const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incPeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('change', () => {
                incPeriodValue.value = this.calcPeriod();
        });
    };

    addExpensesBlock = function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpAdd);
        expensesItems = d.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnExpAdd.style.display = 'none';
        }
    };

    reset = function () {
        let inputTextData = d.querySelectorAll('.data input[type = text]'),
            resultInputAll = d.querySelectorAll('.result input[type = text]');

        inputTextData.forEach((elem) => {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach((elem) =>{
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

    calcPeriod = function () {
        return this.budgetMonth * periodSelect.value;
    };

    getStatusIncome = function () {
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

    getInfoDeposit = function () {
       if (this.deposit) {
           this.percentDeposit = depositPercent.value;
           this.moneyDeposit = depositAmount.value;
       }
    };

    getExpensesMonth = function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };

    getBudget = function () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

    getTargetMonth = function () {
        return targetAmount.value / this.budgetMonth;
    };

    getAddIncome = function () {
        // const _this = this;
        addIncItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
            this.addIncome.push(itemValue);
            }
            
        });
    };

    getAddExpenses = function () {
        // const _this = this;
        let addExpenses = addExpItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
            
        })
    };

    getIncome = function () {
        // const _this = this;
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome != '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    addIncomeBlock = function () {
        let cloneIncomeItem =  incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncAdd);
        incomeItems = d.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            btnIncAdd.style.display = 'none';
        }
    };

    getExpenses = function () {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };
    
    percentValidate = function () {
        if (depositPercent < 0 || depositPercent > 100) {
            alert('Введите правильное значение процента депозита');
        }
    };

    changePercent = function () {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';

            depositPercent.addEventListener('input', this.percentValidate);
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect; 
            depositPercent.removeEventListener('input', this.percentValidate);
        }


    };

    depositHandler = function () {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    };

    eventsListeners = function () {
        start.addEventListener('click', this.start.bind(this));
        btnExpAdd.addEventListener('click', this.addExpensesBlock);
        btnIncAdd.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('keyup', this.check);
        cancel.addEventListener('click', this.reset.bind(this));

        periodSelect.addEventListener('change',() => {
            periodAmount.innerHTML = periodSelect.value;
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        let addExp = [];
        for (let i = 0; i< this.addExpenses.length; i++) {
            let element = this.addExpenses[i].trim();
            element = element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
            addExpr.push(element);
        }
    }
}

const appData = new AppData();

appData.eventsListeners();

console.log (appData);

