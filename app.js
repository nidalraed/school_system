// Student constructor
function Student(fullName, dob, gender, major, imageUrl, phoneNumber) {
    this.fullName = fullName;
    this.dob = dob;
    this.gender = gender;
    this.major = major;
    this.imageUrl = imageUrl;
    this.phoneNumber = phoneNumber;
}

document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const studentContainer = document.getElementById("student-container");
    const deleteDataButton = document.getElementById("delete-data-button");
    const studentList = document.getElementById("student-list");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function renderStudentCard(student, index) {
        const card = document.createElement("div");
        card.classList.add("student-card");
        card.innerHTML = `
            <div class="icon-container">
                <span class="delete-icon" data-index="${index}">&#10006;</span>
            </div>
            <img src="${student.imageUrl}" alt="${student.fullName}">
            <h3>${student.fullName}</h3>
            <p><strong>Date of Birth:</strong> ${student.dob}</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Major:</strong> ${student.major}</p>
            <p><strong>Phone Number:</strong> ${student.phoneNumber}</p>
            <p><strong>Grade:</strong> ${student.grade}</p>
        `;
        studentContainer.appendChild(card);

        const deleteIcon = card.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", function () {
            studentContainer.removeChild(card);
            students.splice(index, 1);
            saveStudentsToLocalStorage();
        });

        
    }

    function saveStudentsToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    students.forEach(renderStudentCard);

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("full-name").value;
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const major = document.querySelector('input[name="major"]:checked').value;
        const imageUrl = document.getElementById("image-url").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const grade = document.getElementById("grade").value;

        const student = {
            fullName,
            dob,
            gender,
            major,
            imageUrl,
            phoneNumber,
            grade,
        };

        students.push(student);
        renderStudentCard(student, students.length - 1);
        saveStudentsToLocalStorage();
        studentForm.reset();
    });

    deleteDataButton.addEventListener("click", function () {
        localStorage.removeItem("students");
        studentContainer.innerHTML = "";
        students = [];
    });

});
