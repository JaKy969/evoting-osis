document.addEventListener("DOMContentLoaded", function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const greetingUser = document.getElementById("greetingUser");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // --- FITUR DARK MODE ---
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

    // --- NAVIGASI STEP 1 KE STEP 2 ---
    let namaGlobal = "";
    let kelasGlobal = "";

    nextBtn.addEventListener("click", function () {
        const namaInput = document.getElementById("nama").value.trim();
        const kelasInput = document.getElementById("kelas").value.trim();

        if (!namaInput || !kelasInput) {
            alert("Mohon isi Nama Lengkap dan Kelas terlebih dahulu!");
            return;
        }

        namaGlobal = namaInput;
        kelasGlobal = kelasInput;

        // Tampilkan sapaan & pindah ke halaman paslon
        greetingUser.textContent = `Halo, ${namaGlobal} (${kelasGlobal}). Silakan pilih kandidat jagoan Anda:`;
        step1.style.display = "none";
        step2.style.display = "block";
    });

    backBtn.addEventListener("click", function () {
        step2.style.display = "none";
        step1.style.display = "block";
    });

    // --- KIRIM VOTE KE GOOGLE APPS SCRIPT ---
    const voteButtons = document.querySelectorAll(".voteBtn");
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";

    voteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedPaslon = this.getAttribute("data-paslon");

            if (!confirm(`Apakah Anda yakin ingin memilih ${selectedPaslon}? Pilihan tidak dapat diubah.`)) {
                return;
            }

            const payload = {
                nama: namaGlobal,
                kelas: kelasGlobal,
                paslon: selectedPaslon
            };

            button.disabled = true;
            button.textContent = "Mengirim...";

            fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(payload)
            })
            .then(() => {
                alert("Terima kasih! Suara Anda berhasil dikirim.");
                location.reload();
            })
            .catch(error => {
                console.error("Terjadi kesalahan:", error);
                alert("Gagal mengirim suara. Periksa koneksi internet.");
                button.disabled = false;
                button.textContent = `Vote ${selectedPaslon}`;
            });
        });
    });
});