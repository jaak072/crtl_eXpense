let user_id = localStorage.getItem('userId');

let ref = firebase.database().ref('/users/' + user_id);





ref.on('value', function(snapshot) {

    let data = snapshot.val();

    let credCategoryList = [];
    let credAmount = [];
    let expCategoryList = [];
    let expAmount = [];


    for (let id in data) {


        if (data[id].type === 'credit') {

            if (credCategoryList.includes(data[id].category)) {

                let index = credCategoryList.indexOf(data[id].category);
                credAmount[index] += Number(data[id].amount);

            } else {
                credCategoryList.push(data[id].category);
                credAmount.push(Number(data[id].amount));
            }
        }

        else {
            if (expCategoryList.includes(data[id].category)) {

                let index = expCategoryList.indexOf(data[id].category);
                expAmount[index] += Number(data[id].amount);

            } else {
                expCategoryList.push(data[id].category);
                expAmount.push(Number(data[id].amount));
            }
        }

    }

    let credPieChart = document.querySelector('#credPieChart').getContext('2d');

    let credPieChart_graph = new Chart(credPieChart, {
        type: 'pie',
        data: {
            labels: credCategoryList,
            datasets: [{
                label: 'Credit Summary',
                data: credAmount,
                backgroundColor: ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c','#95a5a6','#0097e6','#353b48','#fbc531','#273c75','#EA2027','#1B1464','#ED4C67']
            }]
        }
    })

    let expPieChart = document.querySelector('#expPieChart').getContext('2d');

    let pieChart_graph = new Chart(expPieChart, {
        type: 'pie',
        data: {
            labels: expCategoryList,
            datasets: [{
                label: 'Credit Summary',
                data: expAmount,
                backgroundColor: ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#f1c40f','#e67e22','#e74c3c','#95a5a6','#0097e6','#353b48','#fbc531','#273c75','#EA2027','#1B1464','#ED4C67']
            }]
        }
    })
})

ref.on('value', function(snapshot){

    let data = snapshot.val();

    let day=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let expAmount=[0,0,0,0,0,0,0]
    let credAmount=[0,0,0,0,0,0,0]
    let savingAmount=[]

    for (let id in data){

        let parts =data[id].date.split('-');
        let expenseDate = new Date(parts[0], parts[1] - 1, parts[2]);
        let expenseDay=expenseDate.getDay()
        console.log(expenseDay);

        if (data[id].type === 'credit'){

            let index = expenseDay;
            credAmount[index] += Number(data[id].amount);
        }
        else{
            let index =expenseDay;
            expAmount[index] +=Number(data[id].amount)
        }
    }

    for (i=0;i<7;i++){
        savingAmount[i]=credAmount[i]-expAmount[i];
    }

    let barChart = document.querySelector('#barChart').getContext('2d');

    let bar_Chart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: day,
            datasets: [{
                label: 'Day wise Expense',
                data: expAmount,
                backgroundColor: '#1abc9c'
            },{
                label: 'Day wise Income',
                data: credAmount,
                backgroundColor: '#3498db'
            },{

                label: 'Day wise Saving',
                data: savingAmount,
                backgroundColor: '#9b59b6'

            }]
        }
    })

})

ref.on('value', function(snapshot){

    let data = snapshot.val();

    let month=['January','February','March','April','May','June','July','August','September','October','November','December']
    let expAmount=[0,0,0,0,0,0,0,0,0,0,0,0]
    let credAmount=[0,0,0,0,0,0,0,0,0,0,0,0]
    let savingAmount=[]

    for (let id in data){

        let parts =data[id].date.split('-');
        let expenseDate = new Date(parts[0], parts[1] - 1, parts[2]);
        let expenseMonth=expenseDate.getMonth()

        if (data[id].type === 'credit'){

            let index = expenseMonth-1;
            credAmount[index] += Number(data[id].amount);
        }
        else{
            let index =expenseMonth-1;
            expAmount[index] +=Number(data[id].amount)
        }
    }

    for (i=0;i<12;i++){
        savingAmount[i]=credAmount[i]-expAmount[i];
    }
    console.log(savingAmount)

    let lineChart = document.querySelector('#lineChart').getContext('2d');

    let line_Chart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: month,
            datasets: [{
                label: 'Month wise Expense',
                data: expAmount,
                backgroundColor: '#e67e22'
            },{
                label: 'Month wise Income',
                data: credAmount,
                backgroundColor: '#0097e6'
            },{

                label: 'Month wise Saving',
                data: savingAmount,
                backgroundColor: '#9b59b6'

            }]
        }
    })

})
