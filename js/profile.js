let user_id = localStorage.getItem('userId');

let ref = firebase.database().ref('/users/' + user_id);

document.querySelector('#user_dp').setAttribute('src', localStorage.getItem('picture'));
document.querySelector('#user_name').textContent = localStorage.getItem('name');

ref.on("value", function (snapshot) {

    let data = snapshot.val();
    let income=0;
    let expense=0
    let d = new Date();
    let n = d.getMonth();
    let expMonth=0;
    let credMonth=0;

    for(let id in data) {

        let parts =data[id].date.split('-');
        let expenseDate = new Date(parts[0], parts[1] - 1, parts[2]);
        let expenseMonth=expenseDate.getMonth()

        if (data[id].type === 'credit') {
            income += Number(data[id].amount);
            if (n===expenseMonth){
                credMonth += Number(data[id].amount);
            }
        } else {
            expense += Number(data[id].amount);
            if (n===expenseMonth){
                expMonth += Number(data[id].amount);
            }

        }
    }

    let savings = income - expense;
    let savingsMonth = credMonth - expMonth;
    document.querySelector('#expense').textContent = `Rs ${expense}`;
    document.querySelector('#income').textContent = `Rs ${income}`;
    document.querySelector('#saving').textContent = `Rs ${savings}`;
    document.querySelector('#expMonth').textContent = `Rs ${expMonth}`;
    document.querySelector('#credMonth').textContent = `Rs ${credMonth}`;
    document.querySelector('#savingsMonth').textContent = `Rs ${savingsMonth}`;

})
