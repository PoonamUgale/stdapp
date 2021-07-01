// window.onload()
window.onload = (event) => {
    var addStudent = document.getElementById("add-student");
    addStudent.addEventListener("click", onAddStudent);

    var getStudent = document.getElementById("get-student");
    getStudent.addEventListener("click", onGetStudent);

    var deleteStudent = document.getElementById("delete-student");
    deleteStudent.addEventListener("click",onDeleteStudent);
};

function onAddStudent(event) {
    event.preventDefault();
    
    var studentName = document.getElementById("student-name").value;
    if (studentName == "") {
        document.getElementById("name-error").innerHTML="**Enter Your Name**";
    } else {
        document.getElementById("name-error").innerHTML="";
    }

    var nameValidation = /^[A-Za-z]+$/;
    let isValidName = studentName.match(nameValidation);
    if (!isValidName){
        document.getElementById("name-error").innerHTML="**only alphabets are allowed**";
    } else {
        document.getElementById("name-error").innerHTML="";
    }

    var studentClass = document.getElementById("student-class").value;
    if(studentClass  == "") {
        document.getElementById("class-error").innerHTML="**Please enter your class name**";
    }else {
        document.getElementById("class-error").innerHTML="";    
    }
    
    var studentRollno = document.getElementById("student-rollno").value;
    if (studentRollno  == "") {
        document.getElementById("rollno-error").innerHTML="**Please enter your rollno**";
    } else {
        document.getElementById("rollno-error").innerHTML="";
    }
    
    var rollnoValidation = /^[0-9]/;
    var isValidRollno = studentRollno.match(rollnoValidation);
    if(!isValidRollno) {
        document.getElementById("rollno-error").innerHTML="**Invalid roll no**";
    } else{
        document.getElementById("rollno-error").innerHTML="";
    }
    
    var studentMobile = document.getElementById("student-mobile").value;
    if(studentMobile  == "") {
        document.getElementById("mobile-error").innerHTML="**Please enter your mobile no**";
    } else {
        document.getElementById("mobile-error").innerHTML="";    
    }

    let studentData = {
        name: studentName,
        class: studentClass,
        rollno: studentRollno,
        mobile: studentMobile
    };
    addStudentToServer(studentData);    
}

function addStudentToServer(studentData) {
    let url = "http://localhost:4000/student/add";
    fetch(url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData) // body data type must match "Content-Type" header
    })
    .then(resp => resp.json())
    .then(jsonData => {
        console.log(jsonData);
    })
    .catch(error => {
        console.log(error);
    })
}

function onGetStudent(event){
    event.preventDefault();

    var studentClassGet = document.getElementById("class-get").value;
    if(studentClassGet == "") {
        document.getElementById("class-invalid").innerHTML="**Please enter your class name**";
    } else {
        document.getElementById("class-invalid").innerHTML="";
    }

    var studentRollnoGet = document.getElementById("rollno-get").value;
    if (studentRollnoGet  == ""){
        document.getElementById("rollno-invalid").innerHTML="**Please enter your rollno**";
    } else {
        document.getElementById("rollno-invalid").innerHTML="";
    }
    
    var rollnoValid = /^[0-9]/;
    var isValidRollnoGet = studentRollnoGet.match(rollnoValid);
    if(!isValidRollnoGet) {
        document.getElementById("rollno-error").innerHTML="**Invalid roll no**";
    } else{
        document.getElementById("rollno-error").innerHTML="";
    }

    let studentDataGet = {
        class: studentClassGet,
        rollno: studentRollnoGet
    };
    getStudentFromServer(studentDataGet);
}
function getStudentFromServer(studentData) {
    let url = "http://localhost:4000/student/get?";
    url = url + "class=" + studentData.class;
    url = url + "&rollno=" + studentData.rollno;
    fetch(url)
    .then(resp => resp.json())
    .then(jsonData => {
        console.log(jsonData);
    })
    .catch(error => {
        console.log(error);
    })
}
    
function onDeleteStudent(event) {
    event.preventDefault();

    var deleteStudent = document.getElementById("delete-student");
    var studentClassDelete = document.getElementById("class-delete").value;
    if(studentClassDelete  == "") {
        document.getElementById("classError").innerHTML="**Please enter your class name**";
    }
    else {
        document.getElementById("classError").innerHTML="";    
    }

    var rollno = /^[0-9]/;
    var studentRollno = document.getElementById("student-rollno").value;

    if (studentRollno  == ""){
        document.getElementById("rollnoError").innerHTML="**Please enter your rollno**";
    } else {
        document.getElementById("rollnoError").innerHTML="";
    }
    
    if(studentRollno.match(rollno)){
        document.getElementById("rollnoError").innerHTML="**only alphabets are allowed**";
    } else{
        document.getElementById("rollnoError").innerHTML="";
    }   
}