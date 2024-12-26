const students = [];

function getCategory(grades) {
    if (grades.every(grade => grade === 5)) return "Відмінник";
    if (grades.includes(2)) return "Неуспішний";
    if (grades.every(grade => grade >= 3)) return "Хорошист";
    return null;
}

function addStudent() {
    const surname = document.getElementById("surname").value.trim();
    const grades = [
        parseInt(document.getElementById("grade2").value),
        parseInt(document.getElementById("grade3").value),
        parseInt(document.getElementById("grade4").value),
        parseInt(document.getElementById("grade5").value)
    ];

    if (grades.some(function(grade) {
        if (isNaN(grade)) {
            return true;
        }
        if (grade < 2) {
            return true;
        }
        if (grade > 5) {
            return true;
        }
        return false;
    })) {
        alert("оцінки повинні бути числами від 2 до 5");
        return;
    }

    const category = getCategory(grades);
    if (category) {
        students.push({ surname, grades, category });
        document.getElementById("studentForm").reset();
        displaySummary();
    } else {
        alert("студент не попадає в категорію.");
    }
}

function displaySummary() {
    const summary = { "Відмінник": 0, "Хорошист": 0, "Неуспішний": 0 };
    const unsuccessfulStudents = [];

    students.forEach(student => {
        summary[student.category]++;
        if (student.category === "Неуспішний") {
            unsuccessfulStudents.push(student.surname);
        }
    });

    document.getElementById("summary").innerHTML = `
        <p>Відмінник: ${summary["Відмінник"]} студентів</p>
        <p>Хорошист: ${summary["Хорошист"]} студентів</p>
        <p>Неуспішний: ${summary["Неуспішний"]} студентів</p>
    `;

    document.getElementById("unsuccessfulList").innerHTML = `
        <strong>Прізвища неуспішних:</strong> 
        ${unsuccessfulStudents.length ? unsuccessfulStudents.join(", ") : "немає неуспішних студентів."}
    `;
}

document.getElementById("addButton").addEventListener("click", addStudent);
