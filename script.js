document.addEventListener("DOMContentLoaded", function () {
    // Elemen DOM
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const stepIndicator1 = document.getElementById("stepIndicator1");
    const stepIndicator2 = document.getElementById("stepIndicator2");
    
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const greetingNama = document.getElementById("greetingNama");
    const greetingKelas = document.getElementById("greetingKelas");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // URL Apps Script Backend Anda
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";

    // --- 1. SINKRONISASI DARK MODE ---
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        if (document.documentElement.getAttribute("data-theme") === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            darkModeToggle.textContent = "🌙 Dark Mode";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️ Light Mode";
        }
    });

    // --- 2. NAVIGASI LANGKAH 1 -> LANGKAH 2 ---
    let namaGlobal = "";
    let kelasGlobal = "";

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

        // Berpindah tampilan
        step1.style.display = "none";
        step2.style.display = "block";

        // Update indikator stepper
        stepIndicator1.classList.remove("active");
        stepIndicator2.classList.add("active");
    });

    backBtn.addEventListener("click", function () {
        step2.style.display = "none";
        step1.style.display = "block";

        stepIndicator2.classList.remove("active");
        stepIndicator1.classList.add("active");
    });

    // --- 3. EKSEKUSI VOTING KE APPS SCRIPT ---
    const voteButtons = document.querySelectorAll(".voteBtn");

    voteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPaslon = this.getAttribute("data-paslon");

            if (!confirm(`Konfirmasi Pilihan:\nApakah Anda yakin ingin memilih ${selectedPaslon}?`)) {
                return;
            }

            // Nonaktifkan tombol saat mengirim data
            voteButtons.forEach(btn => btn.disabled = true);
            this.textContent = "Mengirim Suara...";

            const payload = {
                nama: namaGlobal,
                kelas: kelasGlobal,
                paslon: selectedPaslon
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
                alert("Terima kasih! Suara Anda telah berhasil dicatat.");
                location.reload();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Gagal mengirim suara. Periksa koneksi internet Anda.");
                voteButtons.forEach(btn => btn.disabled = false);
                this.textContent = `Pilih ${selectedPaslon}`;
            });
        });
    });
});