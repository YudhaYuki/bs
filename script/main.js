
/*
var osomMovie = {};

osomMovie.init = function() {
    osomMovie.filterSlider()
}

osomMovie.filterSlider = function() {

    $('.filter.open').on('click', function() {
        $('.filter_container').slideToggle(300, function() {

            var btn = $(this).prev();

            if(btn.hasClass('active')) {
                $('.filter.open').find('.btn_title').text('Filter by');
                btn.removeClass('active');
            } else {
                $('.filter.open').find('.btn_title').text('Close');
                btn.addClass('active');
            }
        });
    });

};

osomMovie.init();
*/






/*
var accInfoAccount = document.querySelector('.account-information__account');
var accInfoCurrency = document.querySelector('.account-information__currency');
var accInfoDebitCredit = document.querySelector('.account-information__debits-and-credits');

var requestURL = 'apiserver/result.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);


request.responseType = 'json';
request.send();

request.onload = function() {
    var balanceSheet = request.response;
    // infoAccount(balanceSheet);
    infoCurrency(balanceSheet);
    // infoDebCred(balanceSheet);
}

function infoCurrency(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['currency'];
    accInfoCurrency.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);

}
*/

/*

var header = document.querySelector('header');
var section = document.querySelector('section');

var requestURL = 'apiserver/result.json';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
    var superHeroes = request.response;
    populateHeader(superHeroes);
    showHeroes(superHeroes);
  }

function populateHeader(jsonObj) {
    var myH1 = document.createElement('h1');
    myH1.textContent = jsonObj['squadName'];
    header.appendChild(myH1);

    var myPara = document.createElement('p');
    myPara.textContent = 'Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed'];
    header.appendChild(myPara);
}


function showHeroes(jsonObj) {
    var heroes = jsonObj['members'];
        
    for (var i = 0; i < heroes.length; i++) {
      var myArticle = document.createElement('article');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
      var myPara2 = document.createElement('p');
      var myPara3 = document.createElement('p');
      var myList = document.createElement('ul');
  
      myH2.textContent = heroes[i].name;
      myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
      myPara2.textContent = 'Age: ' + heroes[i].age;
      myPara3.textContent = 'Superpowers:';
          
      var superPowers = heroes[i].powers;
      for (var j = 0; j < superPowers.length; j++) {
        var listItem = document.createElement('li');
        listItem.textContent = superPowers[j];
        myList.appendChild(listItem);
      }
  
      myArticle.appendChild(myH2);
      myArticle.appendChild(myPara1);
      myArticle.appendChild(myPara2);
      myArticle.appendChild(myPara3);
      myArticle.appendChild(myList);
  
      section.appendChild(myArticle);
    }
  }

*/




/*
created = () => {

    fetch('apiserver/result.json')
    .then(result => {
        console.log(result);
        return result.json();
    })
    .then(data => {
        // console.log(data);
        const acountDetails = data.account;
        console.log(`This account is belong to ${acountDetails.name}`)
    })
    .catch(error => 
        console.log(error)
    )
}

created();
*/





/*
const debitsAndCredits = [
    {
        "from": "Wendy",
        "description": "Diner",
        "amount": 10.50,
        "date": "2016-01-10T09:20:00.000Z"
    },
    {
        "from": "Danny",
        "description": "Diner",
        "amount": 10.50,
        "date": "2016-01-10T09:14:00.000Z"
    },
    {
        "to": "Joe's Pizza",
        "description": "134678943.88",
        "amount": 31.50,
        "date": "2016-01-09T22:23:00.000Z"
    },
    {
        "from": "Northwind Industries",
        "description": "Salary January",
        "amount": 2310.70,
        "date": "2016-01-09T16:00:00.000Z"
    },
    {
        "to": "Coffee and Cakes",
        "description": "468832.99",
        "amount": 2.50,
        "date": "2016-01-08T08:14:00.000Z"
    },
    {
        "to": "Albert Heijn",
        "description": "489923982.45",
        "amount": 76.65,
        "date": "2016-01-07T19:30:00.000Z"
    },
    {
        "to": "Shoes and Jackets",
        "description": "567222.67",
        "amount": 89.00,
        "date": "2016-01-07T18:29:00.000Z"
    },
    {
        "to": "NS Railways",
        "description": "89357483.76",
        "amount": 12.20,
        "date": "2016-01-07T10:45:00.000Z"
    }
]

*/

const debitsAndCredits = 'apiserver/server.js';


function balanceSheetTemplate(showBalanceSheet) {

    function transactionType() {
        let type;
        if (type = showBalanceSheet.from) {
            return 'From'
        } else if (type = showBalanceSheet.to) {
            return 'To'
        }
    }



    return `
    <table class="debitsAndCredits">
        <tr>
            <th>FROM/TO</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
            <th>DATE</th>

        </tr>
        <tr>
            <td class="transactionType">${transactionType()}</td>
            <td class="transactionDescription">${showBalanceSheet.description}</td>
            <td class="transactionAmount">${showBalanceSheet.amount}</td>
            <td class="transactionDate">${showBalanceSheet.date}</td>
        </tr>
    </table>
`
}

document.getElementById("app").innerHTML = `
    <h1 class="app-title"> Balance Sheet ${debitsAndCredits.length}</h1>
    ${debitsAndCredits.map(balanceSheetTemplate).join('')}`;

