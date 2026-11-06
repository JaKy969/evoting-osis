// GANTI DENGAN URL WEB APP GOOGLE APPS SCRIPT ANDA!
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";

let currentUser = "";
let currentClass = "";
let selectedPaslon = "";

// 1. INSIALISASI SAAT HALAMAN DIMUAT
document.addEventListener("DOMContentLoaded", () => {
    // Cek apakah perangkat ini sudah pernah voting
    if (localStorage.getItem("osis_has_voted")) {
        showSection("success-section");
        return;
    }

    // Inisialisasi Tema
    const savedTheme = localStorage.getItem("osis_theme");
    const themeCheckbox = document.getElementById("checkbox-theme");
    const themeIcon = document.getElementById("theme-icon");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeCheckbox) themeCheckbox.checked = true;
        if (themeIcon) themeIcon.innerText = "☀️";
    } else {
        if (themeIcon) themeIcon.innerText = "🌙";
    }

    // Event Listener Form Login
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const namaInput = document.getElementById("nama").value.trim();
            const kelasInput = document.getElementById("kelas").value.trim();

            if (!namaInput || !kelasInput) {
                document.getElementById("login-message").innerText = "Harap isi nama dan kelas!";
                return;
            }

            currentUser = namaInput;
            currentClass = kelasInput;

            document.getElementById("user-display").innerText = currentUser;
            document.getElementById("class-display").innerText = currentClass;

            showSection("voting-section");
        });
    }
});

// 2. FUNGSI NAVIGASI TAMPILAN
function showSection(sectionId) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("voting-section").classList.add("hidden");
    document.getElementById("success-section").classList.add("hidden");

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove("hidden");
    }
}

// 3. FUNGSI MODAL KONFIRMASI
function openConfirmModal(paslonName) {
    selectedPaslon = paslonName;
    document.getElementById("selected-paslon-text").innerText = paslonName;
    document.getElementById("confirm-modal").classList.remove("hidden");
}

function closeConfirmModal() {
    document.getElementById("confirm-modal").classList.add("hidden");
}

// 4. FUNGSI KIRIM SUARA KE GOOGLE SHEETS
function submitVote() {
    closeConfirmModal();
    
    // Tampilkan status loading sederhana di tombol
    const primaryBtns = document.querySelectorAll(".btn-primary");
    primaryBtns.forEach(btn => btn.innerText = "Mengirim Suara...");

    const payload = {
        nama: currentUser,
        kelas: currentClass,
        paslon: selectedPaslon
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        // Tandai di browser bahwa akun/HP ini sudah vote
        localStorage.setItem("osis_has_voted", "true");
        showSection("success-section");
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Gagal mengirim suara. Periksa koneksi internet Anda.");
    });
}

// 5. FUNGSI TOGGLE DARK/LIGHT MODE (SWITCH)
function toggleTheme() {
    const themeCheckbox = document.getElementById("checkbox-theme");
    const themeIcon = document.getElementById("theme-icon");

    if (themeCheckbox.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("osis_theme", "dark");
        if (themeIcon) themeIcon.innerText = "☀️";
    } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("osis_theme", "light");
        if (themeIcon) themeIcon.innerText = "🌙";
    }
}