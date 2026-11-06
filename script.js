// script.js - Frontend E-Voting OSIS

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("votingForm"); // Pastikan id form di HTML Anda sesuai

if (form) {
    form.addEventListener("submit", function (e) {
    e.preventDefault();

      // Ambil nilai dari input HTML
    const namaInput = document.getElementById("nama").value.trim();
    const kelasInput = document.getElementById("kelas").value.trim();
    
      // Ambil nilai dari pilihan radio button Paslon
    const selectedPaslon = document.querySelector('input[name="paslon"]:checked');

      // Validasi jika ada form yang kosong
    if (!namaInput || !kelasInput || !selectedPaslon) {
        alert("Mohon lengkapi Nama, Kelas, dan pilih salah satu Paslon!");
        return;
    }

      // Susun data (payload) yang akan dikirim ke Google Apps Script
    const payload = {
        nama: namaInput,
        kelas: kelasInput,
        paslon: selectedPaslon.value // Nilai harus berupa "Paslon 1" atau "Paslon 2"
    };

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";

      // Efek tombol saat memproses pengiriman
      const submitBtn = document.getElementById("submitBtn"); // Pastikan id tombol submit sesuai
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Mengirim Suara...";
    }

      // Kirim data menggunakan Fetch API (metode POST)
    fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Mencegah blokir CORS pada Google Apps Script
        headers: {
        "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        alert("Suara Anda berhasil dikirim! Terima kasih.");
        
        // Reset form dan muat ulang halaman
        form.reset();
        location.reload();
    })
    .catch(error => {
        console.error("Terjadi kesalahan:", error);
        alert("Gagal mengirim suara. Periksa koneksi internet Anda.");
        
        if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim Suara";
        }
    });
    });
}
});