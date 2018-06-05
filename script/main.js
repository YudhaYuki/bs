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