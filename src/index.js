const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const birthdayInput = document.getElementById("birthday");
const genderInput = document.getElementById("gender");
const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");
const message = document.getElementById("message");

let nextId = 3;

let students = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    birthday: "2005-01-15",
    gender: "Nam",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    birthday: "2005-06-20",
    gender: "Nữ",
  },
];

// Hiển thị danh sách sinh viên
const renderStudents = () => {
  studentList.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = student.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const birthdayCell = document.createElement("td");
    birthdayCell.textContent = student.birthday;

    const genderCell = document.createElement("td");
    genderCell.textContent = student.gender;

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Xóa";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", () => {
      deleteStudent(student.id);
    });

    actionCell.appendChild(deleteButton);

    row.append(idCell, nameCell, birthdayCell, genderCell, actionCell);

    studentList.appendChild(row);
  });

  studentCount.textContent = `Danh sách sinh viên (${students.length})`;
};

// Thêm sinh viên mới
studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const birthday = birthdayInput.value;
  const gender = genderInput.value;

  if (!name || !birthday || !gender) {
    message.textContent = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  if (birthday > new Date().toISOString().slice(0, 10)) {
    message.textContent = "Ngày sinh không được ở tương lai.";
    return;
  }

  const newStudent = {
    id: nextId,
    name: name,
    birthday: birthday,
    gender: gender,
  };

  students.push(newStudent);
  nextId += 1;

  renderStudents();
  studentForm.reset();

  message.textContent = "Thêm sinh viên thành công.";
});

// Xóa sinh viên
const deleteStudent = (id) => {
  const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?");

  if (!confirmed) {
    return;
  }

  students = students.filter((student) => student.id !== id);

  renderStudents();
  message.textContent = "Đã xóa sinh viên.";
};

// Hiển thị dữ liệu khi mở trang
renderStudents();
