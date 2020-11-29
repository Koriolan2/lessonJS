const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let appData = {
    income: {},
    addInCome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay:0,
    budgetMonth:0,
    expensesMonth:0,
    budget: function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
        return money;
    },
    asking: function() {
        // Расходы
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            addExpenses = addExpenses.toLowerCase().split(',');
            appData.addExpenses;
            appData.deposit = confirm('Есть ли у вас депозит в банке?');


            for (let i = 0; i<2; i++) {

                let q = prompt('Введите обязательную статью расходов'),
                    s;

                do {
                    s = +prompt('Во сколько это обойдется?'); 
                } while (!isNumber(s)) ;

                appData.expenses[q] = s;
            }

            appData.getExpensesMonth();
    },
    getExpensesMonth: function() {
        // Определение суммы обязательных расходов
        let sum = 0;
        for (let key in appData.expenses) {
           appData.expensesMonth += appData.expenses[key];
        }
        
    },
    getBudget: function() {
        // Накопления за месяц
       appData.budgetMonth = appData.budget();
       appData.budgetDay = (appData.budgetMonth - appData.expensesMonth) / 30;
        
    } ,
    getTargetMonth: function() {
        // Период достижения цели
        return appData.mission / appData.getAccomulatedMonth();
    },
    getStatusIncome: function() {
        // Отчет об уровне дохода
        if (appData.budgetDay <= 0) {
            return 'Что-то пошло не так';
        } else if (appData.budgetDay <= 300) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay <= 800) {
           return 'У вас средний уровень дохода';
        } else {
           return 'У вас высокий уровень дохода';
        }
    },
    getAccomulatedMonth: function() {
        // Ежемесячное накопление
        return appData.budgetMonth - appData.expensesMonth;
    }


}
appData.getBudget();
appData.asking();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');

console.log(appData.getStatusIncome());


   