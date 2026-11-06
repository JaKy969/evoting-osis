document.addEventListener("DOMContentLoaded", function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const stepIndicator1 = document.getElementById("stepIndicator1");
    const stepIndicator2 = document.getElementById("stepIndicator2");
    
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const greetingNama = document.getElementById("greetingNama");
    const greetingKelas = document.getElementById("greetingKelas");

    const toggleSwitch = document.getElementById("checkbox");
    const themeLabel = document.getElementById("theme-label");

    // Modal Konfirmasi & Modal Sukses
    const confirmModal = document.getElementById("confirmModal");
    const successModal = document.getElementById("successModal");
    const selectedPaslonText = document.getElementById("selectedPaslonText");
    const cancelModalBtn = document.getElementById("cancelModalBtn");
    const confirmVoteBtn = document.getElementById("confirmVoteBtn");

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";
    let namaGlobal = "";
    let kelasGlobal = "";
    let paslonTerpilih = "";

    // --- 1. DARK MODE TOGGLE SWITCH ---
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        toggleSwitch.checked = true;
        themeLabel.textContent = "☀️";
    }

    toggleSwitch.addEventListener("change", function () {
        if (this.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeLabel.textContent = "☀️";
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            themeLabel.textContent = "🌙";
        }
    });

    // --- 2. NAVIGASI STEP 1 -> STEP 2 ---
    nextBtn.addEventListener("click", function () {
        const namaInput = document.getElementById("nama").value.trim();
        const kelasInput = document.getElementById("kelas").value.trim();

        if (!namaInput || !kelasInput) {
            alert("Mohon lengkapi Nama dan Kelas terlebih dahulu!");
            return;
        }

        namaGlobal = namaInput;
        kelasGlobal = kelasInput;

        greetingNama.textContent = namaGlobal;
        greetingKelas.textContent = kelasGlobal;

        step1.style.display = "none";
        step2.style.display = "block";

        stepIndicator1.classList.remove("active");
        stepIndicator2.classList.add("active");
    });

    backBtn.addEventListener("click", function () {
        step2.style.display = "none";
        step1.style.display = "block";

        stepIndicator2.classList.remove("active");
        stepIndicator1.classList.add("active");
    });

    // --- 3. POP-UP MODAL KONFIRMASI ---
    const openModalBtns = document.querySelectorAll(".openModalBtn");

    openModalBtns.forEach(button => {
        button.addEventListener("click", function () {
            paslonTerpilih = this.getAttribute("data-paslon");
            selectedPaslonText.textContent = paslonTerpilih;
            confirmModal.style.display = "flex";
        });
    });

    cancelModalBtn.addEventListener("click", function () {
        confirmModal.style.display = "none";
    });

    // --- 4. KIRIM DATA KE GOOGLE APPS SCRIPT & MUNCULKAN POP-UP TERIMA KASIH ---
    confirmVoteBtn.addEventListener("click", function () {
        confirmVoteBtn.disabled = true;
        cancelModalBtn.disabled = true;
        confirmVoteBtn.textContent = "Mengirim...";

        const payload = {
            nama: namaGlobal,
            kelas: kelasGlobal,
            paslon: paslonTerpilih
        };

        fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            // Sembunyikan modal konfirmasi, tampilkan modal sukses (terima kasih)
            confirmModal.style.display = "none";
            successModal.style.display = "flex";

            // Tunggu 2 detik, lalu refresh halaman otomatis
            setTimeout(() => {
                location.reload();
            }, 2000);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Gagal mengirim suara. Periksa koneksi internet Anda.");
            confirmVoteBtn.disabled = false;
            cancelModalBtn.disabled = false;
            confirmVoteBtn.textContent = "Ya, Kirim Suara";
            confirmModal.style.display = "none";
        });
    });
});