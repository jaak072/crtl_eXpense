

if(localStorage.getItem("name") === null){
    window.location.href="login.html";
}

let user_id = localStorage.getItem('userId');

let ref = firebase.database().ref('/users/' + user_id);

//Showing Previous Expenses on Table
ref.on("value", function (snapshot){

    let data = snapshot.val();

    document.querySelector('#creditTable').innerHTML = '';
    document.querySelector('#expenseTable').innerHTML = '';
    let CredSl = 1;
    let ExpSl = 1;

    for(let key in data) {

        if (data[key].type === 'credit'){
            document.querySelector('#creditTable').innerHTML += `
                <tr>
                    <th scope="row">${CredSl}</th>
                    <td>${data[key].name}</td>
                    <td>${data[key].amount}</td>
                    <td>${data[key].category}</td>
                    <td>${data[key].date}</td>
                    <td>${data[key].time}</td>
                    <td data-id="${key}" data-name="${data[key].name}" data-amount="${data[key].amount}" data-category="${data[key].category} data-date="${data[key].date} data-time="${data[key].time}" data-type="debit">
                        <button style="border: none; background-color: transparent" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-pencil-alt fa-lg text-success edit_btn">
                            </i>
                        </button>
                    </td>
                    <td data-id="${key}"><button style="border: none; background-color: transparent"><i class="fas fa-trash-alt fa-lg text-danger del_btn"></i></button></td>
                </tr>`;
            CredSl++;
        }
        else{
            document.querySelector('#expenseTable').innerHTML += `
               <tr>
                    <th scope="row">${ExpSl}</th>
                    <td>${data[key].name}</td>
                    <td>${data[key].amount}</td>
                    <td>${data[key].category}</td>
                    <td>${data[key].date}</td>
                    <td>${data[key].time}</td>
                    <td data-id="${key}" data-name="${data[key].name}" data-amount="${data[key].amount}" data-category="${data[key].category}" data-date="${data[key].date}" data-time="${data[key].time}" data-type="debit">
                        <button style="border: none; background-color: transparent" data-toggle="modal" data-target="#exampleModal">
                            <i class="fas fa-pencil-alt fa-lg text-success edit_btn">
                            </i>
                        </button>
                    </td>
                    <td data-id="${key}"><button style="border: none; background-color: transparent"><i class="fas fa-trash-alt fa-lg text-danger del_btn"></i></button></td>
                </tr>`;
            ExpSl++;
        }
    }

})




//Adding Expense in Firebase

document.querySelector('#add_expense').addEventListener('click', function () {

    let expenseName = document.querySelector('#expense_name').value;
    let expenseType = document.querySelector('#expense_type').value;
    let expenseAmount = document.querySelector('#expense_amount').value;
    let expenseDate = document.querySelector('#expense_date').value;
    let expenseTime = document.querySelector('#expense_time').value;
    let expenseCategory = document.querySelector('#expense_category').value;

    if (expenseName !== '' && expenseType !== '' && expenseAmount !== '' && expenseTime !== '' && expenseCategory !== '' && expenseDate !=='') {

        let response = insertData(expenseName, expenseType, expenseAmount, expenseDate, expenseTime, expenseCategory);

        if (response === 1){

            document.querySelector('#expense_name').value = '';
            document.querySelector('#expense_type').value = '';
            document.querySelector('#expense_amount').value = '';
            document.querySelector('#expense_date').value = '';
            document.querySelector('#expense_time').value = '';
            document.querySelector('#expense_category').value = '';

        } else {

            console.log("Hello")

        }
    } else {
        alert("Please fill out all the fields");
    }

})
//function to add data in firebase
function insertData(expenseName, expenseType, expenseAmount, expenseDate, expenseTime, expenseCategory) {

    ref.push({
        name: expenseName,
        amount: expenseAmount,
        type: expenseType,
        category: expenseCategory,
        date: expenseDate,
        time: expenseTime,
    }, function (error) {

        return 0;

    });

    return 1;
}

//////////////////////////////////////////////////Delete////////////////////////////////////////////////////////////

$('body').on('click','.del_btn',function () {
    let expenseId = $(this).parents('td').attr('data-id');
    firebase.database().ref('/users/' + user_id +'/'+ expenseId).remove();
})



//////////////////////////////////////////////////Edit////////////////////////////////////////////////////////////






$('body').on('click','.edit_btn',function () {
    let expenseId = $(this).parents('td').attr('data-id');
    let expenseName = $(this).parents('td').attr('data-name');
    let expenseAmount = $(this).parents('td').attr('data-amount');
    let expenseCategory = $(this).parents('td').attr('data-category');
    let expenseDate = $(this).parents('td').attr('data-date');
    let expenseTime = $(this).parents('td').attr('data-time');
    let expenseType = $(this).parents('td').attr('data-type');


    console.log(expenseId, expenseName, expenseAmount, expenseCategory, expenseDate, expenseTime, expenseType)

    document.querySelector('#update_name').value=expenseName;
    document.querySelector('#update_type').value=expenseType;
    document.querySelector('#update_amount').value=expenseAmount;
    document.querySelector('#update_date').value=expenseDate;
    document.querySelector('#update_time').value=expenseTime;
    document.querySelector('#update_category').value=expenseCategory;

    document.querySelector('#update_expense').addEventListener('click',function (){


            let amount= document.querySelector('#update_amount').value
            let category= document.querySelector('#update_category').value
            let date=document.querySelector('#update_date').value
            let name=document.querySelector('#update_name').value
            let time= document.querySelector('#update_time').value
            let type= document.querySelector('#update_type').value
            let response = 0;

        if (name === '' && type === '' && amount === '' && time === '' && category === '' && date === '') {

            console.log("Please fill al fields")

        } else {

            firebase.database().ref('/users/' + user_id +'/'+ expenseId).update({
                name: name,
                type: type,
                amount: amount,
                date: date,
                time: time,
                category: category
            },function (error) {

                response = -1;

            });

            if (response !== -1){

                $('#exampleModal').modal('hide');


                document.querySelector('#update_name').value = '';
                document.querySelector('#update_type').value = '';
                document.querySelector('#update_amount').value = '';
                document.querySelector('#update_date').value = '';
                document.querySelector('#update_time').value = '';
                document.querySelector('#update_category').value = '';

            } else {


            }
        }

    })
})







