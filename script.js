document.addEventListener("DOMContentLoaded", function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const stepIndicator1 = document.getElementById("stepIndicator1");
    const stepIndicator2 = document.getElementById("stepIndicator2");
    
    const nextBtn = document.getElementById("nextBtn");
    const greetingNama = document.getElementById("greetingNama");
    const greetingKelas = document.getElementById("greetingKelas");

    const toggleSwitch = document.getElementById("checkbox");
    const themeLabel = document.getElementById("theme-label");

    // Carousel Elemen
    const carouselTrack = document.getElementById("carouselTrack");
    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");
    const carouselIndicators = document.getElementById("carouselIndicators");

    // Modal Elemen
    const infoModal = document.getElementById("infoModal");
    const closeInfoModal = document.getElementById("closeInfoModal");
    const modalPaslonImg = document.getElementById("modalPaslonImg");
    const modalPaslonNama = document.getElementById("modalPaslonNama");
    const modalPaslonSlogan = document.getElementById("modalPaslonSlogan");
    const modalVisi = document.getElementById("modalVisi");
    const modalMisi = document.getElementById("modalMisi");

    const confirmModal = document.getElementById("confirmModal");
    const successModal = document.getElementById("successModal");
    const selectedPaslonText = document.getElementById("selectedPaslonText");
    const cancelModalBtn = document.getElementById("cancelModalBtn");
    const confirmVoteBtn = document.getElementById("confirmVoteBtn");
    const countdownTimer = document.getElementById("countdownTimer");

    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyJDAWvXCG9_J8LMlJZEkHHusS1Y10NE_AUIIIEUzq14gpBNZ2wYIJdx5AJoDPDQHAK/exec";

    const paslonData = [
        {
            id: "Paslon 1",
            nomor: "01",
            nama: "Susilo Bambang Yudhoyono & Prabowo Subianto",
            slogan: "Mewujudkan OSIS yang Kreatif, Inovatif, dan Berkarakter",
            img: "paslon1.jpg",
            visi: "Menjadikan OSIS sebagai wadah aspirasi siswa yang progresif dan berakhlak mulia demi terciptanya lingkungan belajar yang kondusif.",
            misi: "1. Mengoptimalkan program kerja ekstrakurikuler sekolah secara berkala.\n2. Meningkatkan kedisiplinan dan solidaritas antar siswa dari setiap angkatan.\n3. Mengadakan event seni, olahraga, dan sains tahunan berskala regional."
        },
        {
            id: "Paslon 2",
            nomor: "02",
            nama: "Anies Baswedan & Ganjar Pranowo",
            slogan: "Bersama Membangun Sekolah Unggul, Disiplin, dan Berprestasi",
            img: "paslon2.jpg",
            visi: "Mewujudkan sekolah ramah anak, berprestasi tinggi di bidang akademik maupun non-akademik di tingkat nasional.",
            misi: "1. Membuka transparansi dana kegiatan siswa secara akuntabel.\n2. Menyediakan fasilitas penunjang bakat digital dan kreativitas siswa.\n3. Menggalakkan gerakan peduli lingkungan dan kebersihan sekolah."
        },
        {
            id: "Paslon 3",
            nomor: "03",
            nama: "Bacharuddin Jusuf & Sri Mulyani",
            slogan: "Inovasi Teknologi dan Manajemen Keuangan Siswa yang Mandiri",
            img: "paslon3.jpg",
            visi: "Menciptakan ekosistem sekolah berbasis teknologi modern dan kemandirian finansial organisasi siswa.",
            misi: "1. Digitalisasi seluruh administrasi, informasi, dan absensi OSIS.\n2. Pelatihan kewirausahaan digital dan manajemen keuangan untuk siswa.\n3. Optimalisasi koperasi siswa berbasis sistem pembayaran digital."
        },
        {
            id: "Paslon 4",
            nomor: "04",
            nama: "Ki Hadjar Dewantara & Raden Ajeng",
            slogan: "Melestarikan Budaya Bangsa dengan Semangat Kekeluargaan",
            img: "paslon4.jpg",
            visi: "Membangun karakter siswa yang menjunjung tinggi nilai-nilai budaya nusantara dan prinsip gotong royong.",
            misi: "1. Mengadakan pekan budaya nusantara dan festival seni tiap semester.\n2. Program pendampingan akademik sebaya untuk siswa yang membutuhkan.\n3. Peningkatan sarana dan prasarana literasi perpustakaan sekolah."
        },
        {
            id: "Paslon 5",
            nomor: "05",
            nama: "Soekarno & Mohammad Hatta",
            slogan: "Menjalin Persatuan dan Kedaulatan Siswa Berlandaskan Pancasila",
            img: "paslon5.jpg",
            visi: "Menjaga keutuhan, keaktifan, serta keharmonisan seluruh perwakilan kelas di bawah kepemimpinan OSIS.",
            misi: "1. Musyawarah perwakilan kelas rutin tiap bulan untuk menampung ide siswa.\n2. Mengadakan Porseni antar kelas secara sportif dan kompetitif.\n3. Penguatan pelatihan kepemimpinan dan jiwa nasionalisme siswa."
        }
    ];

    let namaGlobal = "";
    let kelasGlobal = "";
    let paslonTerpilih = "";
    let currentSlide = 0;
    let countdownInterval = null;

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(" ")
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    function renderCarousel() {
        carouselTrack.innerHTML = "";
        carouselIndicators.innerHTML = "";

        paslonData.forEach((paslon, index) => {
            const card = document.createElement("div");
            card.className = "paslon-card";
            card.innerHTML = `
                <div class="paslon-badge">${paslon.nomor}</div>
                <div class="paslon-img-container">
                    <img src="${paslon.img}" alt="${paslon.id}" class="paslon-img" onerror="this.src='https://via.placeholder.com/300x160?text=${paslon.id}'">
                </div>
                <h3>${paslon.nama}</h3>
                <button type="button" class="btn btn-info openInfoBtn" data-index="${index}">Lihat Info & Visi Misi</button>
                <button type="button" class="btn btn-vote openModalBtn" data-paslon="${paslon.id}">Pilih ${paslon.id}</button>
            `;
            carouselTrack.appendChild(card);

            const dot = document.createElement("div");
            dot.className = `indicator-dot ${index === 0 ? "active" : ""}`;
            dot.addEventListener("click", () => goToSlide(index));
            carouselIndicators.appendChild(dot);
        });

        updateSlidePosition();
        attachPaslonEventListeners();
    }

    function updateSlidePosition() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        const dots = document.querySelectorAll(".indicator-dot");
        dots.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlidePosition();
    }

    prevSlideBtn.addEventListener("click", () => {
        currentSlide = (currentSlide === 0) ? paslonData.length - 1 : currentSlide - 1;
        updateSlidePosition();
    });

    nextSlideBtn.addEventListener("click", () => {
        currentSlide = (currentSlide === paslonData.length - 1) ? 0 : currentSlide + 1;
        updateSlidePosition();
    });

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

    nextBtn.addEventListener("click", function () {
        const rawNama = document.getElementById("nama").value.trim();
        const kelasInput = document.getElementById("kelas").value;

        if (!rawNama || !kelasInput) {
            alert("Mohon lengkapi Nama Lengkap dan pilih Status!");
            return;
        }

        const formattedNama = toTitleCase(rawNama);
        document.getElementById("nama").value = formattedNama;

        const inputNamaField = document.getElementById("nama");
        const inputKelasField = document.getElementById("kelas");
        inputNamaField.classList.add("skeleton-box");
        inputKelasField.classList.add("skeleton-box");

        nextBtn.disabled = true;
        nextBtn.textContent = "Memeriksa Database...";

        const checkUrl = `${WEB_APP_URL}?action=checkName&nama=${encodeURIComponent(formattedNama)}`;

        fetch(checkUrl)
            .then(response => response.json())
            .then(data => {
                inputNamaField.classList.remove("skeleton-box");
                inputKelasField.classList.remove("skeleton-box");
                nextBtn.disabled = false;
                nextBtn.textContent = "Lanjut ke Pemilihan →";

                if (data.status === "blocked") {
                    alert(`Maaf, nama "${formattedNama}" sudah terdaftar di database dan telah melakukan voting!`);
                    return;
                }

                const lastVotedName = localStorage.getItem("votedName");
                if (lastVotedName && lastVotedName.toLowerCase() === formattedNama.toLowerCase()) {
                    localStorage.removeItem("votedName");
                    localStorage.removeItem("hasVoted");
                }

                namaGlobal = formattedNama;
                kelasGlobal = kelasInput;

                greetingNama.textContent = namaGlobal;
                greetingKelas.textContent = kelasGlobal;

                step1.style.display = "none";
                step2.style.display = "block";

                stepIndicator1.classList.remove("active");
                stepIndicator2.classList.add("active");

                renderCarousel();
            })
            .catch(error => {
                console.error("Error checking name:", error);
                inputNamaField.classList.remove("skeleton-box");
                inputKelasField.classList.remove("skeleton-box");
                nextBtn.disabled = false;
                nextBtn.textContent = "Lanjut ke Pemilihan →";

                namaGlobal = formattedNama;
                kelasGlobal = kelasInput;

                greetingNama.textContent = namaGlobal;
                greetingKelas.textContent = kelasGlobal;

                step1.style.display = "none";
                step2.style.display = "block";

                stepIndicator1.classList.remove("active");
                stepIndicator2.classList.add("active");

                renderCarousel();
            });
    });

    function attachPaslonEventListeners() {
        document.querySelectorAll(".openInfoBtn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const paslon = paslonData[index];

                modalPaslonImg.src = paslon.img;
                modalPaslonNama.textContent = paslon.nama;
                modalPaslonSlogan.textContent = `"${paslon.slogan}"`;
                modalVisi.textContent = paslon.visi;
                modalMisi.innerHTML = paslon.misi.replace(/\n/g, "<br>");

                infoModal.style.display = "flex";
            });
        });

        document.querySelectorAll(".openModalBtn").forEach(btn => {
            btn.addEventListener("click", function () {
                paslonTerpilih = this.getAttribute("data-paslon");
                selectedPaslonText.textContent = paslonTerpilih;
                
                confirmModal.style.display = "flex";

                // PERBAIKAN TIMER 5 DETIK YANG STABIL
                if (countdownInterval) clearInterval(countdownInterval);

                let timeLeft = 5;
                confirmVoteBtn.disabled = true;
                confirmVoteBtn.innerHTML = `Tunggu (<span id="countdownTimer">${timeLeft}s</span>)`;

                countdownInterval = setInterval(() => {
                    timeLeft--;
                    const timerSpan = document.getElementById("countdownTimer");
                    if (timerSpan) {
                        timerSpan.textContent = `${timeLeft}s`;
                    }

                    if (timeLeft <= 0) {
                        clearInterval(countdownInterval);
                        confirmVoteBtn.disabled = false;
                        confirmVoteBtn.textContent = "Ya, Kirim Suara";
                    }
                }, 1000);
            });
        });
    }

    closeInfoModal.addEventListener("click", () => infoModal.style.display = "none");
    
    cancelModalBtn.addEventListener("click", () => {
        if (countdownInterval) clearInterval(countdownInterval);
        confirmModal.style.display = "none";
    });

    // --- KIRIM SUARA KE GOOGLE SHEETS DENGAN BOUNCING DOTS YANG BENAR ---
    confirmVoteBtn.addEventListener("click", function () {
        if (this.disabled) return;

        confirmVoteBtn.disabled = true;
        cancelModalBtn.disabled = true;
        
        // Memastikan struktur HTML bouncing dots dirender sempurna
        confirmVoteBtn.innerHTML = `Mengirim <span class="bouncing-dots"><span></span><span></span><span></span></span>`;

        const payload = {
            nama: namaGlobal,
            kelas: kelasGlobal,
            paslon: paslonTerpilih
        };

        fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
        })
        .then(() => {
            localStorage.setItem("hasVoted", "true");
            localStorage.setItem("votedName", namaGlobal);

            confirmModal.style.display = "none";
            successModal.style.display = "flex";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Gagal mengirim suara. Periksa koneksi internet.");
            confirmVoteBtn.disabled = false;
            cancelModalBtn.disabled = false;
            confirmVoteBtn.textContent = "Ya, Kirim Suara";
            confirmModal.style.display = "none";
        });
    });
});