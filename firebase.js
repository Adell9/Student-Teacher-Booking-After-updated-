// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaBskduD4sQjxzqRewOhjkf0lEQ0K4uqY",
    authDomain: "teacher-booking-appointm-10076.firebaseapp.com",
    projectId: "teacher-booking-appointm-10076",
    storageBucket: "teacher-booking-appointm-10076.appspot.com", // ✅ تم تصحيحه
    messagingSenderId: "603251192257",
    appId: "1:603251192257:web:78aea4071579ac99ecff40",
    measurementId: "G-ES9XNZMQGZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ تسجيل مستخدم جديد
export async function registerUser(name, email, password, department, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            role,
            department,
            approved: role === "student" ? false : true
        });
        alert("تم التسجيل بنجاح");

    } catch (error) {
        alert("خطأ في التسجيل: " + error.message);
    }
}

// ✅ تسجيل الدخول
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role === "admin") window.location.href = "/admin/admin.html";
            else if (userData.role === "teacher") window.location.href = "/teacher/teacher.html";
            window.location.href = "/student/student.js";
        }
    } catch (error) {
        alert("خطأ في تسجيل الدخول: " + error.message);
    }
}

// ✅ تسجيل الخروج
export function logoutUser() {
    signOut(auth).then(() => {
        alert("تم تسجيل الخروج بنجاح.");
        //window.location.href = "index.html";
    });
}
