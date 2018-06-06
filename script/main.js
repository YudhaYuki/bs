
// var bankAccountContainer = document.getElementById('animal-info');


let aBankAccount = new XMLHttpRequest();
aBankAccount.open('GET', 'http://localhost:8080/api/balance');
aBankAccount.onload = function() {
    var i;
    var dataABankAccount = JSON.parse(aBankAccount.responseText);
    console.log(dataABankAccount.currency)
    document.querySelector('.account-name').textContent = `Account Holder: ${dataABankAccount.account.name}`;
    document.querySelector('.account-iban').textContent = `IBAN: ${dataABankAccount.account.iban}`;
    document.querySelector('.account-balance').textContent = `Balance: ${dataABankAccount.account.balance}`;
    document.querySelector('.account-currency').textContent = `Currency: ${dataABankAccount.currency}`;

    /*
    for (i = 0; i < dataABankAccount.debitsAndCredits.length; i++) {
        // document.querySelector('.debits-and-credits__type').textContent = dataABankAccount.debitsAndCredits[i].from;
        document.querySelector('.debits-and-credits__description').textContent = dataABankAccount.debitsAndCredits[i].description;
        document.querySelector('.debits-and-credits__amount').textContent = dataABankAccount.debitsAndCredits[i].amount;
        document.querySelector('.debits-and-credits__date').textContent = dataABankAccount.debitsAndCredits[i].date;
    }
    */

    document.write(`<table>`);
    document.write(`
        <tr>
            <th>TO/FROM</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>DATE</th>
        </tr>
    `);

    for (i = 0; i < dataABankAccount.debitsAndCredits.length; i++) {
        document.write(`
        <tr>
            <td class="debits-and-credits__description">${dataABankAccount.debitsAndCredits[i].from}</td>        
            <td class="debits-and-credits__description">${dataABankAccount.debitsAndCredits[i].description}</td>
            <td class="debits-and-credits__amount">${dataABankAccount.debitsAndCredits[i].amount}</td>
            <td class="debits-and-credits__date">${dataABankAccount.debitsAndCredits[i].date}</td>
        </tr>     
        `);
    }
    document.write(`</table>`);
    
    
    
    
    
    // renderHTML(dataABankAccount)
    
};

aBankAccount.send();




/*
function renderHTML(data) {
    var htmlString = '';

    for (i=0; i< data.length; i++) {
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + ".</p>";
    }

    bankAccountContainer.insertAdjacentHTML('beforeend', htmlString);
};
*/




// function renderHTML(data) {
//     var htmlString = "";

//     for (i=0; i< data.length; i++) {
//         htmlString += "<p>" + data[i].name + " is a " + data[i].species + ".</p>";
//     }

//     bankAccountContainer.insertAdjacentHTML('beforeend', htmlString);
// };






