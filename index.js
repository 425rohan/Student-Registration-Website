// create a reference for each html document below to operate on

let studentName = document.querySelector('#studentName');
let studentId = document.querySelector('#studentId');
let studentEmail = document.querySelector('#studentEmailId');
let studentContactNo = document.querySelector('#studentContactNo');
let addStudent = document.querySelector('#addStudent');
let tableBody =document.querySelector('tbody');
let studentData = document.querySelector('.student-details');


// attaching event listener when we click add button
addStudent.addEventListener('click',addStudentData);

//defining a function regarding what to do when add button is clicked
function addStudentData(){

    // to check whether email includes @, we have checked it using includes method to validate only emails are added

    if(studentName.value !== '' && studentId.value !== '' && studentEmail.value !== '' && studentContactNo.value !== '' && addStudent.value === 'Add' && studentEmail.value.includes('@')){
        let createRow = document.createElement('tr');
        let name = document.createElement('td');
        let id = document.createElement('td');
        let email = document.createElement('td');
        let contactNo = document.createElement('td');
        let action = document.createElement('td');
        let resetBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        resetBtn.innerText = 'Reset';
        deleteBtn.innerText = 'Delete';
        resetBtn.id = 'resetBtn';
        deleteBtn.id = 'deleteBtn';

        name.innerText = studentName.value;
        id.innerText = studentId.value;
        email.innerText = studentEmail.value;
        contactNo.innerText = studentContactNo.value;

        tableBody.appendChild(createRow);
        createRow.appendChild(name);
        createRow.appendChild(id);
        createRow.appendChild(email);
        createRow.appendChild(contactNo);
        createRow.appendChild(action);
        action.appendChild(resetBtn);
        action.appendChild(deleteBtn);

        checkAddScrollbar();

        studentName.value = '';
        studentId.value ='';
        studentEmail.value ='';
        studentContactNo.value = ''

    }

        
}

// To add vertical scrollbar dynamically when a certain height is scrossed

function checkAddScrollbar(){
    if(studentData.scrollHeight > studentData.clientHeight){
         studentData.style.overflowY = 'auto';
     }
     else{
         studentData.style.overflowY = 'hidden'
     }
}

// To delete a row, adding event listener to delete button and then defining a function regarding what to do when clicked 
studentData.addEventListener('click',deleteData);

function deleteData(e){

    if(e.target.id === 'deleteBtn'){
        e.target.parentElement.parentElement.remove();    }

    checkAddScrollbar();
}

// To edit a row, adding an event listener to reset data of a row and defining function regarding its functionality when clicked 
studentData.addEventListener('click',resetData);


function resetData(e){
    if(e.target.id === 'resetBtn'){
        console.log(e.target.parentElement.parentElement);
        let editableRow = e.target.parentElement.parentElement;

        studentName.value = editableRow.querySelectorAll('td')[0].innerText;
        studentId.value = editableRow.querySelectorAll('td')[1].innerText;
        studentEmail.value = editableRow.querySelectorAll('td')[2].innerText;
        studentContactNo.value = editableRow.querySelectorAll('td')[3].innerText;

        addStudent.value = 'Save Data';

        // here, to remove the interference of add button event listener while editing data, as we dont want to add extra row while editing, we remove event listener attached to add button and add it back on end of our reset operation. 
        // also, defining saveStudentData function to succesfully edit row data and display it
        addStudent.removeEventListener('click',addStudentData);
        addStudent.addEventListener('click',saveStudentData);

        function saveStudentData(){
           
            if(studentName.value !== '' && studentId.value !== '' && studentEmail.value !== '' && studentContactNo.value !== '' && addStudent.value === 'Save Data' && studentEmail.value.includes('@')){
                editableRow.querySelectorAll('td')[0].innerText = studentName.value;
                editableRow.querySelectorAll('td')[1].innerText = studentId.value;
                editableRow.querySelectorAll('td')[2].innerText = studentEmail.value;
                editableRow.querySelectorAll('td')[3].innerText = studentContactNo.value;

                addStudent.value = 'Add';
                studentName.value = '';
                studentId.value = '';
                studentEmail.value = '';
                studentContactNo.value = '';

                addStudent.removeEventListener('click',saveStudentData);
        addStudent.addEventListener('click',addStudentData);
            }       
        }
        // also, for local storage, i was not getting the desired output which i wanted, so have skipped the part of adding it for now, defiitely will add that functionallity in the near future
        
    }
}
