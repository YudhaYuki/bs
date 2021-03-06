// BUDGET CONTROLLER
var balanceSheetController = (function() {
    
    var Expense = function(id, description, value, date) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.date = date;        
    };
    
    
    var Income = function(id, description, value, date) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.date = date;        
    };
    
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        balance: 0,
    };
    
    
    return {
        addItem: function(type, des, val, dat) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val, dat);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val, dat);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        
        
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        
        calculateBalanceSheet: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.balanceSheet = data.totals.inc - data.totals.exp;
        },
        
        
        getBalanceSheet: function() {
            return {
                balanceSheet: data.balanceSheet,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            };
        },
        
        testing: function() {
            console.log(data);
        }
    };
    
})();




// UI CONTROLLER
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputDate: '.add__date',        
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        container: '.container',
        dateLabel: '.budget__title--month',
        accountNameHolder: '.account-details__name',
        accountIban: '.account-details__iban',
        accountBalance: '.account-details__balance',
        accountCurrency: '.account-details__currency'        
    };
    
    
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands
            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
    
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
                date: document.querySelector(DOMstrings.inputDate).value
                
            };
        },
        
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item item-left clearfix" id="inc-%id%"> <div class="item__date">%date%</div> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item item-left clearfix" id="exp-%id%"> <div class="item__date">%date%</div> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"> </i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            newHtml = newHtml.replace('%date%', obj.date);
            
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        
        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        
        displayBalanceSheet: function(obj) {
            var type;
            obj.balanceSheet > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.balanceSheet, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            
        },
        
        
        displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue + ',' +
                DOMstrings.inputDate);
            
            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();



// GLOBAL APP CONTROLLER
var controller = (function(balanceSheetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();
    
    var setupEventListeners = function() {
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);        
    };
    
    
    var updateBalanceSheet = function() {
        
        // 1. Calculate the budget
        balanceSheetCtrl.calculateBalanceSheet();
        
        // 2. Return the budget
        var balanceSheet = balanceSheetCtrl.getBalanceSheet();
        
        // 3. Display the budget on the UI
        UICtrl.displayBalanceSheet(balanceSheet);
    };
    
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();        
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = balanceSheetCtrl.addItem(input.type, input.description, input.value, input.date);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBalanceSheet();
            
        }
    };
    
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            balanceSheetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBalanceSheet();
            
        }
    };
    
    
    return {
        init: function() {
            let accountJackTorrance = new XMLHttpRequest();
            accountJackTorrance.open('GET', 'http://localhost:8080/api/balance');
            accountJackTorrance.onload = function() {
                
                var dataAccountJackTorrance = JSON.parse(accountJackTorrance.responseText);
                
                document.querySelector(DOM.accountNameHolder).textContent = `Account Holder: ${dataAccountJackTorrance.account.name}`;
                document.querySelector(DOM.accountIban).textContent = `IBAN: ${dataAccountJackTorrance.account.iban}`;
                document.querySelector(DOM.accountBalance).textContent = `Balance: ${dataAccountJackTorrance.account.balance}`;
                document.querySelector(DOM.accountCurrency).textContent = `Currency: ${dataAccountJackTorrance.currency}`;    
                
                

                UICtrl.displayMonth();
                UICtrl.displayBalanceSheet({
                    balanceSheet: parseInt(dataAccountJackTorrance.account.balance),
                    totalInc: 0,
                    totalExp: 0,
                });
                setupEventListeners();



            };
            accountJackTorrance.send();


            console.log('Application has started.');            

            // UICtrl.displayMonth();
            // UICtrl.displayBudget({
            //     budget: 0,
            //     totalInc: 0,
            //     totalExp: 0,
            // });
            // setupEventListeners();
        }
    };
    
})(balanceSheetController, UIController);


controller.init();