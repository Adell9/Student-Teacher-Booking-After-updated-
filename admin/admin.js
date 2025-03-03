// مكان لإضافة كود Firebase الخاص بك
// قم بتضمين إعدادات Firebase هنا

let teachers = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', () => {
        alert('Logged out successfully.');
        window.location.href = 'index.html';
    });
});

// إضافة مدرس جديد
document.getElementById('addTeacherForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('teacherName').value;
    const email = document.getElementById('teacherEmail').value;
    const department = document.getElementById('teacherDepartment').value;
    const subjects = document.getElementById('teacherSubjects').value.split(',').map(s => s.trim());
    
    // إضافة المدرس إلى المصفوفة
    teachers.push({ name, email, department, subjects });
    
    // تحديث قائمة المدرسين بعد الإضافة
    updateTeachersList();
    
    alert('Teacher added successfully.');
    document.getElementById('addTeacherForm').reset();
});

// تحديث قائمة المدرسين
function updateTeachersList() {
    const teachersList = document.getElementById('teachersList');
    teachersList.innerHTML = '';
    teachers.forEach((teacher, index) => {
        teachersList.innerHTML += `<div class="item">${teacher.name} - ${teacher.department} <button onclick="removeTeacher(${index})">Remove</button></div>`;
    });
}

// إزالة مدرس من القائمة
function removeTeacher(index) {
    teachers.splice(index, 1);
    updateTeachersList();
}

// مكان لإضافة كود تحميل الطلاب المعلقين من قاعدة البيانات

function loadPendingStudents() {
    const pendingStudents = document.getElementById('pendingStudents');
    pendingStudents.innerHTML = '<div class="item">Jane Smith - jane@example.com <button onclick="approveStudent()">Approve</button></div>';
}

function approveStudent() {
    alert('Student approved successfully.');
    loadPendingStudents();
}

loadPendingStudents();
