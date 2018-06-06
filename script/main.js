
// var bankAccountContainer = document.getElementById('animal-info');


let aBankAccount = new XMLHttpRequest();
aBankAccount.open('GET', 'apiserver/result.json');
aBankAccount.onload = function() {
    var dataABankAccount = JSON.parse(aBankAccount.responseText);
    console.log(dataABankAccount.currency)
    document.querySelector('.account-name').textContent = `Account Holder: ${dataABankAccount.account.name}`;
    document.querySelector('.account-iban').textContent = `IBAN: ${dataABankAccount.account.iban}`;
    document.querySelector('.account-balance').textContent = `Balance: ${dataABankAccount.account.balance}`;
    document.querySelector('.account-currency').textContent = `Currency: ${dataABankAccount.currency}`;

    document.querySelector('.debits-and-credits__type').textContent = dataABankAccount.debitsAndCredits[1].from;
    document.querySelector('.debits-and-credits__description').textContent = dataABankAccount.debitsAndCredits[1].description;
    document.querySelector('.debits-and-credits__amount').textContent = dataABankAccount.debitsAndCredits[1].amount;
    document.querySelector('.debits-and-credits__date').textContent = dataABankAccount.debitsAndCredits[1].date;
    
    
    
    
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






