if ("serviceWorker" in navigator) {
    // Mengecek apakah browser mendukung Service Worker
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js").then(
            function (registration) {
                console.log("Registrasi sw berhasil: ", registration.scope); // Jika berhasil, log pesan sukses
            },
            function (err) {
                console.log("Registrasi sw gagal: ", err); // Jika gagal, log pesan error
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Saat DOM selesai dimuat, halaman awal tidak menampilkan film apapun
});

function showAddMovieDropdown() {
    document.getElementById('add-movie-dropdown').style.display = 'block'; // Menampilkan dropdown untuk menambah film
}

function addSelectedMovie() {
    const movieSelect = document.getElementById('movie-select');
    const selectedOption = movieSelect.value;
    const [title, price, description] = selectedOption.split(' - '); // Memisahkan judul, harga, dan deskripsi dari opsi yang dipilih

    const movie = { title, price, description };
    addMovieCard(movie); // Menambahkan kartu film baru

    document.getElementById('add-movie-dropdown').style.display = 'none'; // Menyembunyikan dropdown setelah film ditambahkan
}

function addMovieCard(movie) {
    const moviesList = document.getElementById('movies-list');
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-6', 'mb-4'); // Menambahkan kelas CSS untuk tata letak

    let imageName = "";

    switch(movie.title) {
        case "Despicable Me 4":
            imageName = "despicable-me-4.jpg";
            break;
        case "MaXXXine":
            imageName = "maxxxine.jpg";
            break;
        case "Fly Me to The Moon":
            imageName = "fly-me-to-the-moon.jpg";
            break;
        case "Twisters":
            imageName = "twisters.jpg";
            break;
        case "Agak Laen":
            imageName = "agak-laen.jpg";
            break;
        case "Deadpool and Wolverine":
            imageName = "deadpool-and-wolverine.jpg";
            break;
        default:
            imageName = "placeholder.jpg";
    }

    const imagePath = `images/${imageName}`; // Path gambar untuk film

    movieCard.innerHTML = `
        <div class="card">
            <img src="${imagePath}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <p class="card-text"><strong>Price: ${movie.price}</strong></p>
                <button class="btn btn-danger" onclick="removeMovieCard(this)">Hapus Film</button>
            </div>
        </div>
    `; // Menyusun struktur HTML untuk kartu film

    moviesList.appendChild(movieCard); // Menambahkan kartu film ke dalam daftar film
}

function removeMovieCard(button) {
    const cardToRemove = button.closest('.col-md-6'); // Menemukan elemen kartu yang terdekat
    cardToRemove.remove(); // Menghapus kartu film dari DOM
}
